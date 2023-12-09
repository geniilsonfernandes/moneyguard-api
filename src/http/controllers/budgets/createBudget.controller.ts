import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import prisma from "../../../lib/prisma";

const createSchema = z.object({
  amount: z.number(),
  name: z.string(),
  note: z
    .string()
    .optional()
    .transform((value) => (value === "" ? "" : value)),
  user_id: z.string(),
});

async function createBudgetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodyParsed = createSchema.parse(request.body);

  if (bodyParsed.user_id === undefined) {
    return reply.code(400).send({
      message: "Missing user id",
      code: "MISSING_USER_ID",
    });
  }

  try {
    const findUser = await prisma.users.findUnique({
      where: {
        id: bodyParsed.user_id,
      },
    });

    if (!findUser) {
      return reply.code(404).send({
        message: "User not found",
      });
    }

    await prisma.budgets.create({
      data: {
        amount: bodyParsed.amount,
        name: bodyParsed.name,
        note: bodyParsed.note || "",
        user_id: bodyParsed.user_id,
      },
    });

    const allBudgets = await prisma.budgets.findMany({
      where: {
        user_id: bodyParsed.user_id,
      },
    });

    reply.code(200).send({
      message: "Budget created",
      budgets: allBudgets,
    });
  } catch (err) {
    throw err;
  }
}

export default createBudgetController;
