import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

const createExpenseSchema = z.object({
  user_id: z.string(),
});

async function getExpensesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodyParsed = createExpenseSchema.parse(request.query);

  try {
    const expenses = await prisma.expenses.findMany({
      where: {
        user_id: bodyParsed.user_id,
      },
    });

    if (expenses.length === 0) {
      return reply.code(404).send({
        message: "No expenses found",
      });
    }

    reply.code(200).send({
      expenses: expenses,
    });
  } catch (err) {
    throw err;
  }
}

export default getExpensesController;