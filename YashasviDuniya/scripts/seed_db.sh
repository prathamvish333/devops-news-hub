#!/bin/bash
# Database Seeding Script for Yashasvi Duniya

set -e

echo "🌱 Seeding Yashasvi Duniya Database..."

# Wait for database to be ready
echo "Waiting for database to be ready..."
for i in {1..30}; do
    if pg_isready -h ${POSTGRES_HOST:-localhost} -p ${POSTGRES_PORT:-5432} -U ${POSTGRES_USER:-yashasvi_user}; then
        echo "Database is ready!"
        break
    fi
    echo "Waiting for database... ($i/30)"
    sleep 2
done

# Run the Python seed script
cd /app
python -m app.seed

echo "✅ Database seeding complete!"
echo "   - Admin user created (admin/admin)"
echo "   - 10 sample posts created"
