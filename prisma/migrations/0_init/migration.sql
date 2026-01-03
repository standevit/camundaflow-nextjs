-- CreateTable
CREATE TABLE "ProjectRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectName" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "deadline" TEXT,
    "estimatedPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userName" TEXT,
    "userEmail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "ProjectRequest_status_idx" ON "ProjectRequest"("status");

-- CreateIndex
CREATE INDEX "ProjectRequest_createdAt_idx" ON "ProjectRequest"("createdAt");

-- CreateIndex
CREATE INDEX "ProjectRequest_userEmail_idx" ON "ProjectRequest"("userEmail");
