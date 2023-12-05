import dayjs from "dayjs";
import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

const createExpenseSchema = z.object({
  amount: z.number(),
  due_date: z.string(),
  budget_id: z.string(),
  name: z.string(),
  user_id: z.string(),
  duration: z.number(),
  note: z.string().transform((value) => (value === "" ? "" : value)),
  payment_mode: z.enum(["ALL", "PARCEL"]),
  type: z.enum(["INCOME", "EXPENSE"]),
  periodicity_mode: z.enum(["ONCE", "MONTHLY", "FIXED"]),
  period_dates: z.array(z.string()),
});

async function createExpenseController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { period_dates, ...bodyParsed } = createExpenseSchema.parse(
    request.body
  );

  const formattedPeriodDates = period_dates.map((date) => {
    return dayjs(date, "MM/YYYY").startOf("month").format("MM/YYYY");
  });

  if (bodyParsed.user_id === undefined) {
    return reply.code(400).send({
      message: "Missing user id",
      code: "MISSING_USER_ID",
    });
  }

  if (bodyParsed.budget_id === undefined) {
    return reply.code(400).send({
      message: "Missing budget id",
      code: "MISSING_BUDGET_ID",
    });
  }

  try {
    const findBudget = await prisma.budgets.findUnique({
      where: {
        id: bodyParsed.budget_id,
      },
    });

    if (!findBudget) {
      return reply.code(404).send({
        message: "Budget not found",
      });
    }

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

    await prisma.expenses.create({
      data: {
        ...bodyParsed,
        period_dates: formattedPeriodDates,
      },
    });

    reply.code(201).send({
      message: "Expense created",
      expense: {
        ...bodyParsed,
        period_dates: formattedPeriodDates,
      },
    });
  } catch (err) {
    console.log(err);

    throw err;
  }
}

export default createExpenseController;
