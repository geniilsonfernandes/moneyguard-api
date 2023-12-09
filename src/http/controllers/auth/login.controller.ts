import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import prisma from "../../../lib/prisma";
import { generateJWT } from "../../../utils/authHelpers";
import checkPassword from "../../../utils/checkPassword";
import {
  InvalidEmailOrPasswordError,
  UserNotFound,
} from "../../../utils/errors";

const createSchema = z.object({
  email: z.string(),
  password: z.string(),
});

async function loginController(request: FastifyRequest, reply: FastifyReply) {
  const bodyParsed = createSchema.parse(request.body);

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: bodyParsed.email,
      },
    });

    if (!user) {
      throw new UserNotFound();
    }

    const isPasswordCorrect = await checkPassword(
      bodyParsed.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new InvalidEmailOrPasswordError();
    }

    const { refreshToken, token } = await generateJWT(reply, user);

    reply.code(200).send({
      user,
      message: "User logged in",
      token,
      refreshToken,
    });
  } catch (err) {
    if (
      err instanceof UserNotFound ||
      err instanceof InvalidEmailOrPasswordError
    ) {
      return reply.code(err.code).send({
        message: err.message,
        error: err,
      });
    }

    throw err;
  }
}

export default loginController;
