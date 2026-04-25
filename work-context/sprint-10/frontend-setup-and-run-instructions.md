# Frontend Setup and Run Instructions

This guide provides detailed instructions for setting up and running the PharmaAssist frontend locally.

## Prerequisites
- **Node.js**: v20.0+ (LTS recommended)
- **npm**: v10.0+
- **Backend Server**: The backend should ideally be running locally on `http://localhost:3001` before you start the frontend.

## 1. Installation

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

## 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Open `.env.local` and review the required variables. Key variables include:

- `NEXT_PUBLIC_API_URL`: URL of the backend API (default: `http://localhost:3001`).
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous public key.

*For a detailed explanation of all environment variables, refer to `frontend-environment-variables-guide.md`.*

## 3. Running the Application

### Development Mode
To start the Next.js server with hot-reload enabled:
```bash
npm run dev
```
The frontend application will start at `http://localhost:3000`.

### Production Build
To build and run the production-optimized version:
```bash
npm run build
npm run start
```
*Note: A production build requires the backend to be accessible at the URL defined in your environment variables.*

## 4. Linting and Testing

The frontend includes various scripts to ensure code quality:

- **Linting**: `npm run lint` (Checks for ESLint and Prettier errors)
- **Type Checking**: `npm run typecheck` (Runs TypeScript compiler check)
- **Unit/Component Tests**: `npm run test` (Runs Vitest)
- **E2E Tests**: `npm run e2e` (Runs Playwright smoke tests, requires backend running)

## 5. Troubleshooting

- **CORS Errors**: If you see CORS errors in the browser console, ensure your backend's CORS configuration allows requests from `http://localhost:3000`.
- **API Connection Refused**: Verify that your backend is running and `NEXT_PUBLIC_API_URL` is set correctly.
- **Node Version Mismatch**: Next.js 14+ requires newer Node.js versions. If the build fails with syntax errors related to core Node features, ensure you are running Node 20+.
