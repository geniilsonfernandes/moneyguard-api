import { fastify } from "fastify";
import { budgetRoutes, expenseRoutes, usersRoutes } from "./http/routes";
import { ZodError } from "zod";
import cors from "@fastify/cors";

// add usecases
function buildServer() {
  // quero saber quais configuraçoes o fastify tem
  const server = fastify();

  server.register(cors, {
    origin: "*", // Altere '*' para o domínio ou origens permitidos que você deseja.
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    preflightContinue: false, // Responder automaticamente às solicitações OPTIONS preflight
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
