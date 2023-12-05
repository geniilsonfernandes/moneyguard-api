import { FastifyInstance } from "fastify";
import createExpenseController from "./controllers/expense/createExpenseController";
import getExpensesController from "./controllers/expense/getExpensesControllers";

async function expenseRoutes(app: FastifyInstance) {
  app.post("/expenses", createExpenseController);
  app.get("/expenses", getExpensesController);
}

export { expenseRoutes };
