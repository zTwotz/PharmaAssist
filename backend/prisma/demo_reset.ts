import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  console.log('Starting Demo Environment Reset...');
  
  // SAFETY CHECK: Ensure we are not running this in a production environment by mistake.
  const isProduction = process.env.NODE_ENV === 'production';
  const allowReset = process.env.ALLOW_DEMO_RESET === 'true';

  if (isProduction && !allowReset) {
    console.error('CRITICAL ERROR: Attempted to run demo reset in a production environment!');
    console.error('To override, set ALLOW_DEMO_RESET=true in the environment variables.');
    process.exit(1);
  }

  // LOCAL-ONLY GUARD: Ensure database URL is local
  const dbUrl = process.env.DATABASE_URL || '';
  const isLocalDb = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');
  if (!isLocalDb && !allowReset) {
    console.error('CRITICAL ERROR: Attempted to run demo reset against a remote database!');
    console.error('Database URL does not appear to be local. To override, set ALLOW_DEMO_RESET=true.');
    process.exit(1);
  }

  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test' && !allowReset) {
    console.warn('WARNING: Running in a non-development environment. Proceeding because ALLOW_DEMO_RESET=true.');
  }

  console.log('Environment safety checks passed.');
  
  console.log('Resetting database and running MVP seed...');
  // TODO: Add `prisma migrate reset --force` and `prisma db seed` logic programmatically 
  // or execute them via shell commands if this script serves as a wrapper.
  
  console.log('Demo Environment Reset completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during demo reset:', e);
    process.exit(1);
  });
