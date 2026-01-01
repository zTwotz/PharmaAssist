#!/bin/bash
read -s -p "Enter source password: " PGPASSWORD
export PGPASSWORD
echo ""
echo "Testing pooler 5432..."
psql -h aws-0-ap-northeast-1.pooler.supabase.com -U postgres.opzhotrjpxlldflcnzzq -p 5432 -d postgres -c "SELECT 1;" || echo "Failed pooler 5432"

echo "Testing pooler 6543..."
psql -h aws-0-ap-northeast-1.pooler.supabase.com -U postgres.opzhotrjpxlldflcnzzq -p 6543 -d postgres -c "SELECT 1;" || echo "Failed pooler 6543"

echo "Testing direct IPv6..."
psql -h db.opzhotrjpxlldflcnzzq.supabase.co -U postgres -p 5432 -d postgres -c "SELECT 1;" || echo "Failed direct"
