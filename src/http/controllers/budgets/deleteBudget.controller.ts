import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

async function deleteBudgetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const {
    params: { id: budget_id },
  } = request as {
    params: {
      id: string;
    };
  };

  if (budget_id === undefined) {
    return reply.code(400).send({
      message: "Missing budget id",
      code: "MISSING_BUDGET_ID",
    });
  }

  try {
    const budget = await prisma.budgets.findUnique({
      where: {
        id: budget_id,
      },
    });

    if (!budget) {
      return reply.code(404).send({
        message: "budget not found",
      });
    }

    const budgetDeleted = await prisma.budgets.delete({
      where: {
        id: budget_id,
      },
    });

    reply.code(200).send({
      budget: budgetDeleted,
      message: "Budget deleted",
    });
  } catch (err) {
    throw err;
  }
}

export default deleteBudgetController;
