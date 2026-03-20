# 1. Delete the old lockfile and node_modules
rm -rf node_modules package-lock.json

# 2. Re-install everything from scratch (this generates a fresh, clean lockfile)
npm install --legacy-peer-deps

# 3. Verify that the build works locally with the new lockfile
npm run build