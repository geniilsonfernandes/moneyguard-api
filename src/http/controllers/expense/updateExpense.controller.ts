import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

const updateSchema = z.object({
  amount: z.number(),
  due_date: z.string(),
  name: z.string(),
  user_id: z.string(),
  duration: z.number(),
  note: z.string().transform((value) => (value === "" ? "" : value)),
  payment_mode: z.enum(["ALL", "PARCEL"]),
  type: z.enum(["INCOME", "EXPENSE"]),
  periodicity_mode: z.enum(["ONCE", "MONTHLY", "FIXED"]),
  period_dates: z.array(z.string()),
});

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
  const bodyParsed = updateSchema.parse(request.body);

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

    const expenseUpdated = await prisma.expenses.update({
      where: {
        id: expense_id,
      },
      data: {
        ...bodyParsed,
      },
    });

    reply.code(200).send({
      expense: expenseUpdated,
      message: "Expense updated",
    });
  } catch (err) {
    throw err;
  }
}

export default updateExpensesController;
