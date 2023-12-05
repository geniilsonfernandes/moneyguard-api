import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

async function updateExpensesController(
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
    const expense = await prisma.expenses.findUnique({
      where: {
        id: expense_id,
      },
    });

    if (!expense) {
      return reply.code(404).send({
        message: "Expense not found",
      });
    }

    const expenseDeleted = await prisma.expenses.delete({
      where: {
        id: expense_id,
      },
    });

    reply.code(200).send({
      expense: expenseDeleted,
      message: "Expense deleted",
    });
  } catch (err) {
    throw err;
  }
}

export default updateExpensesController;
