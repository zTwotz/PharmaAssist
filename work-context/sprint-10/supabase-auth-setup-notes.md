# Supabase Auth Setup Notes

This document provides setup instructions and notes for configuring Supabase Authentication for the PharmaAssist project.

## Overview

PharmaAssist uses Supabase for user authentication (JWT) and PostgreSQL database hosting. 

## 1. Project Setup in Supabase

1. Log in to [Supabase](https://supabase.com/).
2. Create a new project or select an existing one.
3. Once the project is provisioned, go to **Project Settings** > **API**.
4. Retrieve the following credentials:
   - **Project URL**: Use this as `NEXT_PUBLIC_SUPABASE_URL` in your frontend `.env.local`.
   - **Project API Keys (anon, public)**: Use this as `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your frontend `.env.local`.
   - **JWT Secret**: Use this as `JWT_SECRET` in your backend `.env`.

## 2. Authentication Configuration

Go to **Authentication** > **Providers** in the Supabase dashboard.

1. **Email Provider**: Ensure the Email provider is enabled.
2. **Confirm Email**: For the MVP and local development, it is recommended to **disable** "Confirm email" to simplify the registration and login testing flow.
3. **Secure Passwords**: Configure minimum password requirements if desired (default is usually 6 characters).

## 3. Database Connection (Backend)

Go to **Project Settings** > **Database**.

1. Locate the **Connection string** (URI).
2. Set this as `DATABASE_URL` in your backend `.env`.
3. Ensure the schema is set to `public` (e.g., `?schema=public`).

*Note: For local development, you can use Supabase CLI to run a local instance, or a standard PostgreSQL instance, but connecting directly to a remote Supabase project is common for testing.*

## 4. Role-Based Access Control (RBAC) Notes

PharmaAssist implements RBAC within the application logic (NestJS Guards) rather than relying exclusively on Supabase Row Level Security (RLS). 

- **Supabase Auth** is used strictly to verify the user's identity and issue a JWT.
- **Application Auth**: The backend extracts the user's email from the Supabase JWT and queries the `User` table in the database to determine roles and permissions (`RolesGuard`, `PermissionsGuard`).

### Seed Data
The MVP seed script (`demo_reset.ts`) creates the following predefined users in the database, which you should manually register in Supabase Auth (or allow the seed script to create them if using the Supabase Admin API):

- `admin@pharmaassist.com`
- `staff@pharmaassist.com`
- `warehouse@pharmaassist.com`

*Ensure that the passwords you set during registration match the passwords expected by your testing scripts (default: `[role]123`).*
