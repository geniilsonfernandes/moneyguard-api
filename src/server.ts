import { fastify } from "fastify";
import { expenseRoutes } from "./http/routes";
import { ZodError } from "zod";

// add usecases
function buildServer() {
  const server = fastify();

  server.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  // routes
  server.register(expenseRoutes);

  // error handler
  server.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      reply.status(400).send({
        message: "Invalid request body",
        errors: error.flatten().fieldErrors,
      });
    }

    reply.status(500).send({
      message: "Internal server error",
      errors: error,
    });
  });

  return server;
}

export default buildServer;
