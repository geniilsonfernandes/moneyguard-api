import { fastify } from "fastify";
import { budgetRoutes, expenseRoutes, usersRoutes } from "./http/routes";
import { ZodError } from "zod";

// add usecases
function buildServer() {
  const server = fastify();

  server.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  // routes
  server.register(expenseRoutes);
  server.register(budgetRoutes);
  server.register(usersRoutes);

  // error handler
  server.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      reply.status(400).send({
        message: "Invalid request body",
        errors: error.flatten().fieldErrors,
      });
    }

    if (error instanceof SyntaxError) {
      reply.status(400).send({
        message: "Invalid request body",
        errors: error,
      });
    }

    reply.status(500).send({
      message: "Internal server error: " + error,
      errors: error,
    });
  });

  return server;
}

export default buildServer;
