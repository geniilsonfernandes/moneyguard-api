import { PrismaClient } from "@prisma/client";
import { env } from "process";

const prisma = new PrismaClient({
  log: env.NODE_ENV === "production" ? [] : ["query", "info", "warn", "error"],
});

export default prisma;
