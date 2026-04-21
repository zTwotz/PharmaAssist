-- CreateTable
CREATE TABLE "ai_provider_configs" (
    "id" UUID NOT NULL,
    "provider_key" TEXT NOT NULL,
    "model_name" TEXT,
    "priority" INTEGER NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "timeout_ms" INTEGER,
    "config_json" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by_id" UUID,

    CONSTRAINT "ai_provider_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_provider_configs_provider_key_key" ON "ai_provider_configs"("provider_key");

-- CreateIndex
CREATE INDEX "ai_provider_configs_is_enabled_idx" ON "ai_provider_configs"("is_enabled");

-- CreateIndex
CREATE INDEX "ai_provider_configs_priority_idx" ON "ai_provider_configs"("priority");

-- AddForeignKey
ALTER TABLE "ai_provider_configs" ADD CONSTRAINT "ai_provider_configs_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
