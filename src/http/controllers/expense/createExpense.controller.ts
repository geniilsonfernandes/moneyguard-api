import dayjs from "dayjs";
import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

const createExpenseSchema = z.object({
  amount: z.number(),
  due_date: z.string(),
  name: z.string(),
  user_id: z.string(),
  duration: z.number(),
  note: z.string(),
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

  try {
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
