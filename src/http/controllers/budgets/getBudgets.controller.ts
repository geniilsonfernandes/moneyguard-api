import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

const getSchema = z.object({
  user_id: z.string(),
});

async function getBudgetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodyParsed = getSchema.parse(request.query);

  try {
    const budgets = await prisma.budgets.findMany({
      where: {
        user_id: bodyParsed.user_id,
      },
    });

    if (budgets.length === 0) {
      return reply.code(404).send({
        message: "No budgets found",
      });
    }

    reply.code(200).send({
      budgets: budgets,
      count: budgets.length,
    });
  } catch (err) {
    throw err;
  }
}

export default getBudgetController;
