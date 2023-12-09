import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";
import dayjs from "dayjs";

const getSchema = z.object({
  user_id: z.string(),
  period: z.string(),
});

async function getExpensesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodyParsed = getSchema.parse(request.query);

  try {
    const expenses = await prisma.expenses.findMany({
      where: {
        user_id: bodyParsed.user_id,
        OR: [
          {
            period_dates: {
              has: bodyParsed.period,
            },
          },
          {
            AND: [
              {
                periodicity_mode: {
                  equals: "FIXED",
                },
              },
              {
                OR: [
                  {
                    due_date: {
                      lte: dayjs(`01/${bodyParsed.period}`).toISOString(),
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      include: {
        budget: true,
      },
    });

    reply.code(200).send({
      expenses: expenses,
      count: expenses.length,
    });
  } catch (err) {
    throw err;
  }
}

export default getExpensesController;
