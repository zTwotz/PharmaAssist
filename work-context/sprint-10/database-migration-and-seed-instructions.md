# Database Migration and Seed Instructions

This guide outlines how to manage the database schema (migrations) and initialize demo data (seeding) using Prisma for the PharmaAssist application.

## Prerequisites
- **PostgreSQL Database**: Running and accessible (local or Supabase).
- **Environment Variable**: `DATABASE_URL` correctly configured in `backend/.env`.

## Managing the Schema (Migrations)

Prisma uses migrations to keep your database schema in sync with your Prisma schema file (`backend/prisma/schema.prisma`).

### Development Environment

When making changes to `schema.prisma` during development, you can either create a migration or push directly:

**Option A: Push directly (Faster, no migration history)**
Recommended for rapid prototyping or if you are the only developer working on a feature branch.
```bash
cd backend
npx prisma db push
```
*Note: This might result in data loss if your schema changes are incompatible with existing data.*

**Option B: Create a migration (Safer, creates history)**
Recommended when you are ready to finalize your changes or working in a team environment.
```bash
cd backend
npx prisma migrate dev --name your_migration_name
```
This command generates a new SQL migration file in `prisma/migrations` and applies it to your database.

### Production Environment

In production or staging environments, **never** use `db push`. Always deploy using migrations:

```bash
cd backend
npx prisma migrate deploy
```
This applies pending migrations to the database without resetting data.

## Seeding Demo Data

The project includes an MVP seed script (`demo_reset.ts`) to populate the database with initial data required for testing and demonstration (roles, permissions, sample users, sample medicines).

### Running the Seed Script

To reset the database and run the seed script:

```bash
cd backend
npm run demo:reset
```

### Safety Guards

The `demo:reset` script includes safety guards to prevent accidental deletion of production data:

1. **Local-Only Guard**: By default, the script will **only** run if the `DATABASE_URL` points to a local address (`localhost` or `127.0.0.1`).
2. **Production Guard**: The script will refuse to run if `NODE_ENV=production`.

**Overriding Safety Guards (Use with Extreme Caution):**
If you intentionally want to reset a remote development or staging database, you must explicitly bypass the guards by setting `ALLOW_DEMO_RESET=true` in your `backend/.env` file:

```env
ALLOW_DEMO_RESET=true
DATABASE_URL="postgresql://user:password@remote-host:5432/dbname"
```
*Warning: This will irreversibly wipe all existing data in the target database.*
