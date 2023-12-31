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

// users controllers
import userCreateController from "./controllers/users/userCreate.controller";
import getUserController from "./controllers/users/getUser.controller";
import getExpenseController from "./controllers/expense/getExpense.controller";
import loginController from "./controllers/auth/login.controller";
import { verifyJwtMid } from "./middlewares/verifyJwtMid";
import refreshController from "./controllers/auth/refresh.controller";

async function expenseRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwtMid);
  // expenses
  app.post("/expenses", createExpenseController);
  app.post("/expenses/:id", updateExpensesController);
  app.delete("/expenses/:id", deleteExpenseController);
  app.get("/expenses", getExpensesController);
  app.get("/expense/:id", getExpenseController);
}

async function budgetRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwtMid);
  // budgets
  app.post("/budgets", createBudgetController);
  app.post("/budgets/:id", updateBudgetController);
  app.delete("/budgets/:id", deleteBudgetController);
  app.get("/budgets", getBudgetController);
}

async function usersRoutes(app: FastifyInstance) {
  app.post("/users", userCreateController);
  app.get("/users/:id", getUserController);
}

async function authRoutes(app: FastifyInstance) {
  app.post("/login", loginController);
  app.post("/refresh", refreshController);
}

export { expenseRoutes, budgetRoutes, usersRoutes, authRoutes };
