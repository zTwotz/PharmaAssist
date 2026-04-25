import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

export default (): void => {
  // Load standard env
  dotenv.config();

  // If no DATABASE_URL exists, we cannot push the test DB
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ No DATABASE_URL found. Skipping test DB push.');
    return;
  }

  // SAFETY CHECK: Prevent running tests against remote/demo database
  if (process.env.DATABASE_URL?.includes('supabase.co') && process.env.ALLOW_DEMO_RESET !== 'true') {
    console.error('CRITICAL ERROR: Attempted to run e2e tests against a remote Supabase database!');
    console.error('Tests should run against a local database to prevent destructive actions.');
    console.error('To override, set ALLOW_DEMO_RESET=true.');
    process.exit(1);
  }

  // Override to test schema
  let testDbUrl = process.env.DATABASE_URL;
  if (testDbUrl.includes('?')) {
    if (testDbUrl.includes('schema=')) {
      testDbUrl = testDbUrl.replace(/schema=[^&]+/, 'schema=test_integration');
    } else {
      testDbUrl += '&schema=test_integration';
    }
  } else {
    testDbUrl += '?schema=test_integration';
  }

  console.log('\\n📦 Pushing Prisma schema to test_integration schema...');
  try {
    // Run prisma db push using the test_integration schema
    execSync(`npx prisma db push --accept-data-loss`, {
      env: {
        ...process.env,
        DATABASE_URL: testDbUrl,
      },
      stdio: 'inherit',
    });
    console.log('✅ Test database ready.');
  } catch (error) {
    console.error('❌ Failed to push test database:', error.message);
  }
};
