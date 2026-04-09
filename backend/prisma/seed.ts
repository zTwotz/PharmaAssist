import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { createClient, User as SupabaseUser } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString =
  process.env.DIRECT_URL || process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    'Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing from environment.',
  );
  process.exit(1);
}

// Initialize Supabase Admin client
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  console.log('Starting seed process...');

  // 1. Seed Roles
  console.log('Seeding roles...');
  const adminRole = await prisma.role.upsert({
    where: { code: 'ADMIN' },
    update: {},
    create: {
      id: 1,
      code: 'ADMIN',
      name: 'ADMIN',
      description: 'System Administrator with full access',
    },
  });

  const staffRole = await prisma.role.upsert({
    where: { code: 'STAFF' },
    update: {},
    create: {
      id: 2,
      code: 'STAFF',
      name: 'STAFF',
      description: 'Pharmacy Staff with sales access',
    },
  });

  const warehouseRole = await prisma.role.upsert({
    where: { code: 'WAREHOUSE' },
    update: {},
    create: {
      id: 3,
      code: 'WAREHOUSE',
      name: 'WAREHOUSE',
      description: 'Warehouse Manager with inventory access',
    },
  });

  const customerRole = await prisma.role.upsert({
    where: { code: 'CUSTOMER' },
    update: {},
    create: {
      id: 4,
      code: 'CUSTOMER',
      name: 'CUSTOMER',
      description: 'Regular Customer of the pharmacy',
    },
  });

  console.log(
    `Roles seeded: ${adminRole.name}, ${staffRole.name}, ${warehouseRole.name}, ${customerRole.name}`,
  );

  // 1.5. Seed MVP Permissions & Mapping
  console.log('Seeding permissions...');
  const permissionsData = [
    { code: 'VIEW_DASHBOARD', name: 'View Dashboard', module: 'DASHBOARD', description: 'Can view dashboard' },
    { code: 'VIEW_SALES', name: 'View Sales', module: 'SALES', description: 'Can view sales POS' },
    { code: 'CREATE_ORDER', name: 'Create Order', module: 'SALES', description: 'Can create orders' },
    { code: 'VIEW_MEDICINES', name: 'View Medicines', module: 'CATALOG', description: 'Can view medicines' },
    { code: 'MANAGE_MEDICINES', name: 'Manage Medicines', module: 'CATALOG', description: 'Can manage medicines' },
    { code: 'VIEW_INVENTORY', name: 'View Inventory', module: 'INVENTORY', description: 'Can view inventory' },
    { code: 'MANAGE_INVENTORY', name: 'Manage Inventory', module: 'INVENTORY', description: 'Can manage inventory' },
    { code: 'VIEW_USERS', name: 'View Users', module: 'USER', description: 'Can view users' },
    { code: 'MANAGE_USERS', name: 'Manage Users', module: 'USER', description: 'Can manage users' },
  ];

  const permissionMap: Record<string, number> = {};
  for (const p of permissionsData) {
    const perm = await prisma.permission.upsert({
      where: { code: p.code },
      update: {},
      create: p,
    });
    permissionMap[p.code] = perm.id;
  }
  console.log('Permissions seeded.');

  console.log('Seeding role_permissions mapping...');
  const rolePermissionMapping = [
    // ADMIN has all permissions
    ...permissionsData.map((p) => ({ roleId: adminRole.id, permissionCode: p.code })),
    // STAFF
    { roleId: staffRole.id, permissionCode: 'VIEW_DASHBOARD' },
    { roleId: staffRole.id, permissionCode: 'VIEW_SALES' },
    { roleId: staffRole.id, permissionCode: 'CREATE_ORDER' },
    { roleId: staffRole.id, permissionCode: 'VIEW_MEDICINES' },
    { roleId: staffRole.id, permissionCode: 'VIEW_INVENTORY' },
    // WAREHOUSE
    { roleId: warehouseRole.id, permissionCode: 'VIEW_DASHBOARD' },
    { roleId: warehouseRole.id, permissionCode: 'VIEW_MEDICINES' },
    { roleId: warehouseRole.id, permissionCode: 'MANAGE_MEDICINES' },
    { roleId: warehouseRole.id, permissionCode: 'VIEW_INVENTORY' },
    { roleId: warehouseRole.id, permissionCode: 'MANAGE_INVENTORY' },
  ];

  for (const mapping of rolePermissionMapping) {
    const permId = permissionMap[mapping.permissionCode];
    if (!permId) continue;
    
    // Using findFirst to check existence since role_permissions might not have unique constraints other than id
    const existingRp = await prisma.rolePermission.findFirst({
      where: { roleId: mapping.roleId, permissionId: permId },
    });

    if (!existingRp) {
      await prisma.rolePermission.create({
        data: { roleId: mapping.roleId, permissionId: permId },
      });
    }
  }
  console.log('Role permissions seeded.');

  // 2. Prepare Demo Users
  const demoUsers = [
    {
      email: 'admin@pharmaassist.com',
      password: 'admin123',
      fullName: 'PharmaAdmin System',
      roleId: 1,
    },
    {
      email: 'staff@pharmaassist.com',
      password: 'staff123',
      fullName: 'PharmaStaff Cashier',
      roleId: 2,
    },
    {
      email: 'warehouse@pharmaassist.com',
      password: 'warehouse123',
      fullName: 'PharmaWarehouse Manager',
      roleId: 3,
    },
    {
      email: 'user@pharmaassist.com',
      password: 'user123',
      fullName: 'PharmaCustomer User',
      roleId: 4,
    },
  ];

  for (const u of demoUsers) {
    console.log(`Checking/Creating user in Supabase Auth: ${u.email}...`);

    const listRes = await supabaseAdmin.auth.admin.listUsers();
    const users: SupabaseUser[] = listRes.data.users || [];
    const listError = listRes.error;

    if (listError) {
      console.error(`Error listing users:`, listError);
      continue;
    }

    let authUser: SupabaseUser | undefined = users.find(
      (user) => user.email === u.email,
    );

    if (!authUser) {
      // Create user in Supabase Auth
      const {
        data: { user },
        error: createError,
      } = await supabaseAdmin.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: {
          full_name: u.fullName,
        },
      });

      if (createError) {
        console.error(
          `Failed to create auth user for ${u.email}:`,
          createError.message,
        );
        continue;
      }

      if (user) {
        authUser = user;
      }
      console.log(
        `Created auth user in Supabase for ${u.email} (ID: ${user?.id})`,
      );
    } else {
      console.log(
        `Auth user already exists in Supabase for ${u.email} (ID: ${authUser.id})`,
      );
    }

    if (authUser) {
      // 3. Ensure user exists in our public.users table (should be synced by DB trigger, but upsert to be safe)
      const userProfile = await prisma.user.upsert({
        where: { id: authUser.id },
        update: {
          email: u.email,
          fullName: u.fullName,
        },
        create: {
          id: authUser.id,
          email: u.email,
          username: u.email.split('@')[0],
          fullName: u.fullName,
          status: 'ACTIVE',
        },
      });

      // 4. Map User to Role
      const existingUserRole = await prisma.userRole.findFirst({
        where: {
          userId: userProfile.id,
          roleId: u.roleId,
        },
      });

      if (!existingUserRole) {
        await prisma.userRole.create({
          data: {
            userId: userProfile.id,
            roleId: u.roleId,
          },
        });
        console.log(`Assigned role ${u.roleId} to user ${u.email}`);
      } else {
        console.log(`Role mapping already exists for user ${u.email}`);
      }
    }
  }

  // 5. Seed Prompt Templates
  console.log('Seeding Prompt Templates...');
  const promptTemplates = [
    {
      code: 'interaction_explanation',
      version: 'v1.0',
      content: 'You are a clinical pharmacist. Explain the potential drug interaction between the following medications in simple terms: {{medications}}. Also provide recommendations. Respond in JSON format.',
      status: 'ACTIVE'
    },
    {
      code: 'consultation_note',
      version: 'v1.0',
      content: 'Draft a brief consultation note for a patient taking the following medications: {{medications}}. Include key counseling points.',
      status: 'ACTIVE'
    },
    {
      code: 'follow_up_questions',
      version: 'v1.0',
      content: 'Suggest 3 safe follow-up questions a pharmacist should ask a patient based on this context: {{shortContext}}. Keep the questions friendly and professional. Respond in JSON format with a "questions" array and a "disclaimer".',
      status: 'ACTIVE'
    }
  ];

  for (const template of promptTemplates) {
    await prisma.promptTemplate.upsert({
      where: {
        code_version: {
          code: template.code,
          version: template.version
        }
      },
      update: {
        content: template.content,
        status: template.status
      },
      create: template
    });
  }
  console.log('Prompt templates seeded.');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
