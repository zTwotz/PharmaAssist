# Backend Setup and Run Instructions

This guide provides detailed instructions for setting up and running the PharmaAssist backend locally.

## Prerequisites
- **Node.js**: v20.0+ (LTS recommended)
- **npm**: v10.0+
- **Database**: PostgreSQL (Supabase or local instance)
- **Neo4j**: AuraDB or local instance (optional, for Knowledge Graph features)

## 1. Installation

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

## 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Open `.env` and fill in the required variables. Key variables include:

- `DATABASE_URL`: Connection string for your PostgreSQL database (e.g., `postgresql://postgres:password@localhost:5432/pharmaassist?schema=public`).
- `JWT_SECRET`: Secret key for JWT signing.
- `NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`: Credentials for Neo4j.
- `GOOGLE_GEMINI_API_KEY`: API key for Google Gemini (if using real AI, otherwise set `USE_MOCK_AI=true`).

*For a detailed explanation of all environment variables, refer to `backend-environment-variables-guide.md`.*

## 3. Database Setup (Prisma)

Ensure your database is running and accessible via the `DATABASE_URL`.

**Apply Schema:**
If you are developing locally and want to push the Prisma schema directly to your database without creating migration history:
```bash
npx prisma db push
```
Alternatively, to apply migrations:
```bash
npx prisma migrate dev
```

**Generate Prisma Client:**
```bash
npx prisma generate
```

**(Optional) Reset and Seed Demo Data:**
If you want to start with a fresh database populated with MVP data:
```bash
npm run demo:reset
```
*Note: This script has a safety guard. It will only run if `DATABASE_URL` is a local address (e.g., `localhost`) or if you explicitly set `ALLOW_DEMO_RESET=true` in your `.env`.*

## 4. Running the Application

### Development Mode
To start the NestJS server with hot-reload enabled:
```bash
npm run start:dev
```
The server will start at `http://localhost:3001` (or the port specified in `PORT`).

### Production Mode
To build and run the production-optimized version:
```bash
npm run build
npm run start:prod
```

## 5. Testing

The backend includes various test suites:

- **Unit Tests**: `npm run test`
- **E2E/Integration Tests**: `npm run test:e2e` (Requires a test database schema)
- **Test Coverage**: `npm run test:cov`

*Note: Integration tests are configured to use a separate schema (`test_integration`) and will not affect your main data. They are also guarded against running on remote production databases.*
