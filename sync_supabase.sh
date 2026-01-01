#!/bin/bash

# Dừng ngay nếu có lệnh lỗi
set -e

SOURCE_REF="opzhotrjpxlldflcnzzq"
SOURCE_HOST="db.${SOURCE_REF}.supabase.co"

DEST_REF="qzkfadxzqkqinreeivqt"
DEST_HOST="db.${DEST_REF}.supabase.co"
echo "========================================================================="
echo "   KỊCH BẢN ĐỒNG BỘ DỮ LIỆU TỪ PharmaAssist SANG PharmaAssist-SE         "
echo "========================================================================="
echo ""
echo "Chuẩn bị: Bạn cần mật khẩu Database của cả 2 dự án trên Supabase."
echo "Bạn có thể tìm trong phần Settings > Database."
echo ""

read -s -p "1. Nhập mật khẩu DB của PharmaAssist (Nguồn - opzhotrjpxlldflcnzzq): " SOURCE_PW
echo ""
read -s -p "2. Nhập mật khẩu DB của PharmaAssist-SE (Đích - qzkfadxzqkqinreeivqt): " DEST_PW
echo ""
echo ""

# Đảm bảo thư mục supabase tồn tại để lưu file tạm
mkdir -p supabase_migration_temp

echo "[1/4] Đang export Roles từ PharmaAssist..."
# Mã hóa mật khẩu phòng trường hợp có ký tự đặc biệt
ENCODED_PW=$(python3 -c "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1]))" "$SOURCE_PW")
SOURCE_DB_URL="postgresql://postgres:${ENCODED_PW}@${SOURCE_HOST}:5432/postgres"

supabase db dump --db-url "$SOURCE_DB_URL" -f supabase_migration_temp/roles.sql --role-only

echo "[2/4] Đang export Schema (Cấu trúc) từ PharmaAssist..."
supabase db dump --db-url "$SOURCE_DB_URL" -f supabase_migration_temp/schema.sql

echo "[3/4] Đang export Data (Dữ liệu) từ PharmaAssist..."
supabase db dump --db-url "$SOURCE_DB_URL" -f supabase_migration_temp/data.sql --data-only
echo "[4/4] Đang import dữ liệu vào PharmaAssist-SE..."
export PGPASSWORD=$DEST_PW

echo "   -> Import Roles..."
psql -h $DEST_HOST -U "postgres" -p 5432 -d postgres -f supabase_migration_temp/roles.sql

echo "   -> Import Schema..."
psql -h $DEST_HOST -U "postgres" -p 5432 -d postgres -f supabase_migration_temp/schema.sql

echo "   -> Import Data..."
psql -h $DEST_HOST -U "postgres" -p 5432 -d postgres -f supabase_migration_temp/data.sql

echo "[5/5] Dọn dẹp file tạm..."
rm -rf supabase_migration_temp

echo ""
echo "========================================================================="
echo "   ĐỒNG BỘ HOÀN TẤT! Vui lòng kiểm tra lại dữ liệu trên giao diện.       "
echo "========================================================================="
