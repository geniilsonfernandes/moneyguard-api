import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import prisma from "../../../lib/prisma";

const createSchema = z.object({
  email: z.string(),
  name: z.string(),
  clerk_id: z.string(),
});

async function userCreateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodyParsed = createSchema.parse(request.body);

  try {
    const findUser = await prisma.users.findUnique({
      where: {
        clerk_id: bodyParsed.clerk_id,
      },
    });

    if (findUser) {
      return reply.code(404).send({
        message: "User already exists",
        user: findUser,
      });
    }

    const user = await prisma.users.create({
      data: {
        email: bodyParsed.email,
        name: bodyParsed.name,
        clerk_id: bodyParsed.clerk_id,
      },
    });

    if (!user) {
      return reply.code(404).send({
        message: "User not created",
      });
    }

    reply.code(200).send({
      message: "User created",
      user: user,
    });
  } catch (err) {
    throw err;
  }
}

export default userCreateController;
