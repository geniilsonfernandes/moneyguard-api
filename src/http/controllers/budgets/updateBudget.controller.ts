import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

const updateSchema = z.object({
  amount: z.number(),
  name: z.string(),
  note: z.string().transform((value) => (value === "" ? "" : value)),
  user_id: z.string(),
});

async function updateBudgetController(
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
  const bodyParsed = updateSchema.parse(request.body);

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

    const budgetsUpdated = await prisma.budgets.update({
      where: {
        id: budget_id,
      },
      data: {
        amount: bodyParsed.amount,
        name: bodyParsed.name,
        note: bodyParsed.note,
      },
    });

    reply.code(200).send({
      budget: budgetsUpdated,
      message: "Budget updated",
    });
  } catch (err) {
    throw err;
  }
}

export default updateBudgetController;
