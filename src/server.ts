import { fastify } from "fastify";
import {
  authRoutes,
  budgetRoutes,
  expenseRoutes,
  usersRoutes,
} from "./http/routes";
import { ZodError } from "zod";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

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
  server.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  // routes
  server.register(expenseRoutes);
  server.register(budgetRoutes);
  server.register(usersRoutes);
  server.register(authRoutes, {
    prefix: "/auth",
  });

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
