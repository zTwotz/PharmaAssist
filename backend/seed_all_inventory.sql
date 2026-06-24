DO $$ 
DECLARE 
    v_store_id INT;
    v_warehouse_id INT;
    v_supplier_id INT;
    v_stock_import_id INT;
    v_medicine RECORD;
    v_qty INT;
    v_price NUMERIC;
    v_batch_num TEXT;
    v_total_amount NUMERIC := 0;
BEGIN
    -- 1. Create or get Store
    SELECT id INTO v_store_id FROM stores LIMIT 1;
    IF v_store_id IS NULL THEN
        INSERT INTO stores (code, name, address, status, created_at)
        VALUES ('ST001', 'Cửa Hàng Chi Nhánh 1', '456 Đường XYZ, Quận 3, TP.HCM', 'ACTIVE', NOW())
        RETURNING id INTO v_store_id;
    END IF;

    -- 2. Create or get Warehouse
    SELECT id INTO v_warehouse_id FROM warehouses LIMIT 1;
    IF v_warehouse_id IS NULL THEN
        INSERT INTO warehouses (store_id, code, name, address, status, created_at)
        VALUES (v_store_id, 'WH001', 'Kho Trung Tâm', '123 Đường ABC, Quận 1, TP.HCM', 'ACTIVE', NOW())
        RETURNING id INTO v_warehouse_id;
    END IF;

    -- 3. Create or get Supplier
    SELECT id INTO v_supplier_id FROM suppliers LIMIT 1;
    IF v_supplier_id IS NULL THEN
        INSERT INTO suppliers (code, name, tax_code, address, status, created_at)
        VALUES ('SUP001', 'Nhà Cung Cấp Dược Phẩm Việt', '0101234567', '789 Đường LMN, Hà Nội', 'ACTIVE', NOW())
        RETURNING id INTO v_supplier_id;
    END IF;

    -- 4. Create Stock Import
    INSERT INTO stock_imports (code, supplier_id, warehouse_id, import_date, total_amount, status, confirmed_at, created_by, notes)
    VALUES ('IMP-ALL-' || floor(random() * 1000000)::int || extract(epoch from now())::int, v_supplier_id, v_warehouse_id, NOW(), 0, 'COMPLETED', NOW(), 'System Seed', 'Bulk stock import for ALL products')
    RETURNING id INTO v_stock_import_id;

    -- 5. Seed ALL medicines
    FOR v_medicine IN 
        SELECT m.id AS medicine_id, pv.id AS variant_id 
        FROM medicines m 
        JOIN products p ON m.product_id = p.id 
        JOIN product_variants pv ON p.id = pv.product_id
    LOOP
        v_qty := floor(random() * 50 + 10)::int;
        v_price := floor(random() * 50000 + 5000)::numeric;
        v_batch_num := 'BATCH-ALL-' || floor(random() * 10000)::int || '-' || v_medicine.medicine_id || '-' || v_medicine.variant_id;
        v_total_amount := LEAST(v_total_amount + (v_qty * v_price), 9999999999.99);

        -- Stock Import Detail
        INSERT INTO stock_import_details (stock_import_id, medicine_id, batch_number, quantity, import_price, expiry_date, line_total)
        VALUES (v_stock_import_id, v_medicine.medicine_id, v_batch_num, v_qty, v_price, NOW() + INTERVAL '2 years', v_qty * v_price);

        -- Medicine Batch
        INSERT INTO medicine_batches (medicine_id, warehouse_id, batch_number, quantity, expiry_date, import_price, created_at, updated_at)
        VALUES (v_medicine.medicine_id, v_warehouse_id, v_batch_num, v_qty, NOW() + INTERVAL '2 years', v_price, NOW(), NOW())
        ON CONFLICT (medicine_id, batch_number, expiry_date) DO NOTHING;

        -- Stock Batch
        INSERT INTO stock_batches (product_variant_id, warehouse_id, batch_number, quantity, manufacturing_date, expiry_date, import_price, status)
        VALUES (v_medicine.variant_id, v_warehouse_id, v_batch_num, v_qty, NOW() - INTERVAL '1 month', NOW() + INTERVAL '2 years', v_price, 'ACTIVE');

        -- Inventory
        IF EXISTS (SELECT 1 FROM inventories WHERE product_variant_id = v_medicine.variant_id AND warehouse_id = v_warehouse_id AND store_id = v_store_id) THEN
            UPDATE inventories 
            SET quantity = quantity + v_qty, updated_at = NOW()
            WHERE product_variant_id = v_medicine.variant_id AND warehouse_id = v_warehouse_id AND store_id = v_store_id;
        ELSE
            INSERT INTO inventories (warehouse_id, store_id, product_variant_id, quantity, reserved_quantity, min_quantity, updated_at)
            VALUES (v_warehouse_id, v_store_id, v_medicine.variant_id, v_qty, 0, 10, NOW());
        END IF;

    END LOOP;

    -- Update total amount for Stock Import
    UPDATE stock_imports SET total_amount = v_total_amount WHERE id = v_stock_import_id;

END $$;
