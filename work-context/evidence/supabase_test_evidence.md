# Supabase Business-Data Test Evidence - Sprint 5

## 1. DrugInteraction Rule Schema
```sql
-- Kiểm tra bảng DrugInteraction
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'DrugInteraction';
```
Result: `id`, `activeIngredientId1`, `activeIngredientId2`, `severity`, `description`, `createdAt`, `updatedAt` - **PASS**

## 2. InteractionAlert Schema
```sql
-- Kiểm tra bảng InteractionAlert
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'InteractionAlert';
```
Result: `id`, `orderId`, `interactionId`, `severity`, `isAcknowledged`, `consultationNote`, `createdAt` - **PASS**

## 3. Business Data Verification
1. Đã tạo `ActiveIngredient` mẫu.
2. Đã thêm các `DrugInteraction` rules (Low, Medium, High).
3. Đã tạo thử Order có chứa 2 thuốc tương tác.
4. Supabase Trigger / NestJS Service đã catch được và tạo `InteractionAlert` hợp lệ.

**Conclusion**: PASS
