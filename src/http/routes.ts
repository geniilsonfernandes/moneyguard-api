import { FastifyInstance } from "fastify";
import createExpenseController from "./controllers/expense/createExpense.controller";
import getExpensesController from "./controllers/expense/getExpenses.controller";
import updateExpensesController from "./controllers/expense/updateExpense.controller";

async function expenseRoutes(app: FastifyInstance) {
  app.post("/expenses", createExpenseController);
  app.post("/expenses/:id", updateExpensesController);
  app.get("/expenses", getExpensesController);
}

export { expenseRoutes };
