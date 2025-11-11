const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['warn', 'error'] // avoid query logging in prod unless needed
});

module.exports = prisma;
