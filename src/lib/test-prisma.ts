import { prisma } from "@/lib/prisma";

async function testConnection() {
  const users = await prisma.user.findMany();
  console.log(users);
}

testConnection();
