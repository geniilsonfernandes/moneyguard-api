import { FastifyReply, FastifyRequest } from "fastify";
import jsonwebtoken from "jsonwebtoken";
import { z } from "zod";
import { env } from "../../../env";
import prisma from "../../../lib/prisma";
import { generateJWT } from "../../../utils/authHelpers";
import { TokenInvalidError, UserNotFound } from "../../../utils/errors";

const createSchema = z.object({
  refresh_token: z.string(),
});

async function refreshController(request: FastifyRequest, reply: FastifyReply) {
  const bodyParsed = createSchema.parse(request.body);

  try {
    const { refresh_token } = bodyParsed;

    jsonwebtoken.verify(refresh_token, env.JWT_SECRET, (err, _) => {
      if (err) {
        throw new TokenInvalidError();
      }
    });

    const decoded = jsonwebtoken.decode(refresh_token) as {
      id: string;
      name: string;
      email: string;
    };

    const user = await prisma.users.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw new UserNotFound();
    }

    const { refreshToken, token } = await generateJWT(reply, user);

    reply.code(200).send({
      message: "Token refreshed",
      user: user,
      token,
      refreshToken,
    });
  } catch (err) {
    if (err instanceof TokenInvalidError || err instanceof UserNotFound) {
      return reply.code(err.code).send({
        error: err.name,
        message: err.message,
      });
    }
    throw err;
  }
}

export default refreshController;
