import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../lib/prisma";

const getSchema = z.object({
  user_id: z.string(),
});

async function getUserController(request: FastifyRequest, reply: FastifyReply) {
  const bodyParsed = getSchema.parse(request.params);

  try {
    const user = await prisma.users.findFirst({
      where: {
        id: bodyParsed.user_id,
      },
    });

    reply.code(200).send({
      user,
    });
  } catch (err) {
    throw err;
  }
}

export default getUserController;
