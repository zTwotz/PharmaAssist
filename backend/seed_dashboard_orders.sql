DO $$ 
DECLARE 
    v_store_id INT;
    v_order_id INT;
    v_variant RECORD;
    v_qty INT;
    v_price NUMERIC;
    v_total_amount NUMERIC;
    v_num_items INT;
    v_user_id UUID;
    v_random_seconds INT;
BEGIN
    -- Get first store
    SELECT id INTO v_store_id FROM stores LIMIT 1;
    -- Get a user ID for staffUserId
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;

    -- Generate 25 orders for today
    FOR i IN 1..25 LOOP
        v_total_amount := 0;
        
        -- Pick a random time from today (between midnight and now)
        v_random_seconds := floor(random() * (EXTRACT(EPOCH FROM (NOW() - CURRENT_DATE::timestamp))))::int;

        -- Create Order
        INSERT INTO orders (
            code, 
            store_id, 
            staff_user_id,
            order_type, 
            status, 
            subtotal, 
            total_amount, 
            created_at
        )
        VALUES (
            'ORD-' || to_char(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD(i::text, 4, '0'), 
            v_store_id, 
            v_user_id,
            'IN_STORE', 
            'COMPLETED', 
            0, 
            0, 
            CURRENT_DATE + (v_random_seconds * INTERVAL '1 second')
        )
        RETURNING id INTO v_order_id;

        -- Generate 1 to 4 items per order
        v_num_items := floor(random() * 4 + 1)::int;
        FOR j IN 1..v_num_items LOOP
            SELECT pv.id AS variant_id
            INTO v_variant
            FROM product_variants pv
            ORDER BY random() LIMIT 1;

            v_qty := floor(random() * 5 + 1)::int;
            -- Random price between 10k and 300k
            v_price := floor(random() * 290000 + 10000)::numeric;
            v_total_amount := v_total_amount + (v_qty * v_price);

            INSERT INTO order_details (order_id, product_variant_id, quantity, unit_price, line_total)
            VALUES (v_order_id, v_variant.variant_id, v_qty, v_price, v_qty * v_price);
        END LOOP;

        -- Update Order total
        UPDATE orders 
        SET subtotal = v_total_amount, total_amount = v_total_amount 
        WHERE id = v_order_id;

    END LOOP;
END $$;
