-- AlterTable
ALTER TABLE "active_ingredients" ADD COLUMN     "normalized_name" TEXT;

-- Update existing rows to populate normalized_name
UPDATE "active_ingredients" SET "normalized_name" = LOWER(TRIM(REGEXP_REPLACE("name", '\s+', ' ', 'g')));

-- Delete duplicate active ingredient by ID (propolis extract with double spaces, no mappings)
DELETE FROM "active_ingredients" WHERE "id" = 10281;

-- Make normalized_name NOT NULL
ALTER TABLE "active_ingredients" ALTER COLUMN "normalized_name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "active_ingredients_normalized_name_key" ON "active_ingredients"("normalized_name");
