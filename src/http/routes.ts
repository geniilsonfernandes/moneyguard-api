import { FastifyInstance } from "fastify";
// expenses controllers
import createExpenseController from "./controllers/expense/createExpense.controller";
import getExpensesController from "./controllers/expense/getExpenses.controller";
import updateExpensesController from "./controllers/expense/updateExpense.controller";
import deleteExpenseController from "./controllers/expense/deleteExpense.controller";

// budgets controllers
import updateBudgetController from "./controllers/budgets/deleteBudget.controller";
import getBudgetController from "./controllers/budgets/getBudgets.controller";
import createBudgetController from "./controllers/budgets/createBudget.controller";
import deleteBudgetController from "./controllers/budgets/deleteBudget.controller";

async function expenseRoutes(app: FastifyInstance) {
  // expenses
  app.post("/expenses", createExpenseController);
  app.post("/expenses/:id", updateExpensesController);
  app.delete("/expenses/:id", deleteExpenseController);
  app.get("/expenses", getExpensesController);
}

async function budgetRoutes(app: FastifyInstance) {
  // budgets
  app.post("/budgets", createBudgetController);
  app.post("/budgets/:id", updateBudgetController);
  app.delete("/budgets/:id", deleteBudgetController);
  app.get("/budgets", getBudgetController);
}

export { expenseRoutes, budgetRoutes };
