import { FastifyInstance } from "fastify";
// expenses controllers
import createExpenseController from "./controllers/expense/createExpense.controller";
import getExpensesController from "./controllers/expense/getExpenses.controller";
import updateExpensesController from "./controllers/expense/updateExpense.controller";
import deleteExpenseController from "./controllers/expense/deleteExpense.controller";

async function expenseRoutes(app: FastifyInstance) {
  app.post("/expenses", createExpenseController);
  app.post("/expenses/:id", updateExpensesController);
  app.delete("/expenses/:id", deleteExpenseController);
  app.get("/expenses", getExpensesController);
}

export { expenseRoutes };
