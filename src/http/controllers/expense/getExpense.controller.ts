import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

async function getExpenseController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const {
    params: { id: expense_id },
  } = request as {
    params: {
      id: string;
    };
  };

  if (expense_id === undefined) {
    return reply.code(400).send({
      message: "Missing expense id",
      code: "MISSING_EXPENSE_ID",
    });
  }

  try {
    const expense = await prisma.expenses.findFirst({
      where: {
        id: expense_id,
      },
      include: {
        budget: true,
      },
    });

    reply.code(200).send({
      expense: expense,
    });
  } catch (err) {
    throw err;
  }
}

export default getExpenseController;
