import { PrismaService } from '../src/prisma/prisma.service';

/**
 * Cleans the test database by deleting all records from all tables.
 * This is safe because integration tests run on an isolated schema ('test_integration').
 */
export async function cleanDatabase(prisma: PrismaService) {
  // Ordered by dependencies to avoid foreign key constraint errors
  const tableNames = [
    'pharmacist_reviews',
    'prescription_uploads',
    'consultation_notes',
    'interaction_alerts',
    'drug_interactions',
    'medicine_group_members',
    'medicine_groups',
    'medicine_ingredients',
    'active_ingredients',
    'medicine_batches',
    'inventories',
    'stock_movements',
    'stock_adjustment_details',
    'stock_adjustments',
    'stock_transfer_details',
    'stock_transfers',
    'stock_batches',
    'stock_import_details',
    'stock_imports',
    'medicines',
    'dosage_forms',
    'medicine_units',
    'product_documents',
    'product_tag_relations',
    'product_tags',
    'product_attribute_values',
    'product_attributes',
    'product_images',
    'order_details',
    'orders',
    'pos_sessions',
    'customer_recent_views',
    'customer_wishlists',
    'loyalty_transactions',
    'loyalty_accounts',
    'customer_group_members',
    'customer_groups',
    'customer_notes',
    'customer_addresses',
    'customers',
    'product_variants',
    'products',
    'product_categories',
    'category_closures',
    'manufacturers',
    'countries',
    'brands',
    'store_staff',
    'warehouses',
    'stores',
    'login_logs',
    'user_roles',
    'role_permissions',
    'permissions',
    'roles',
    'user_profiles',
    'ai_audit_logs',
    'audit_logs',
    'users',
  ];

  for (const tableName of tableNames) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tableName}" CASCADE;`);
    } catch (error) {
      console.warn(`Failed to truncate ${tableName}:`, error);
    }
  }
}
