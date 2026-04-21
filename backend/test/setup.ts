import * as dotenv from 'dotenv';

// Load environment variables from .env file if available
dotenv.config();

// Ensure tests use an isolated schema and mock Supabase credentials
// If the user already provided a DATABASE_URL, append the test schema.
// Otherwise, mock it so Prisma can instantiate (though queries would fail).
if (process.env.DATABASE_URL) {
  // Check if it already has parameters
  if (process.env.DATABASE_URL.includes('?')) {
    // If it already has schema, replace it, otherwise append
    if (process.env.DATABASE_URL.includes('schema=')) {
      process.env.DATABASE_URL = process.env.DATABASE_URL.replace(
        /schema=[^&]+/,
        'schema=test_integration',
      );
    } else {
      process.env.DATABASE_URL += '&schema=test_integration';
    }
  } else {
    process.env.DATABASE_URL += '?schema=test_integration';
  }
}

// Provide mock Supabase keys to bypass UsersService initialization errors
if (!process.env.SUPABASE_URL) {
  process.env.SUPABASE_URL = 'http://localhost:8000';
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'mock-service-role-key';
}
if (!process.env.SUPABASE_ANON_KEY) {
  process.env.SUPABASE_ANON_KEY = 'mock-anon-key';
}
