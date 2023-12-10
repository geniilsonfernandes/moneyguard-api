import { hash } from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import prisma from "../../../lib/prisma";
import { NotCreatedError, UserAlreadyExists } from "../../../utils/errors";
import { generateJWT } from "../../../utils/authHelpers";

const createSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  monthly_budget: z.number(),
});

async function userCreateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodyParsed = createSchema.parse(request.body);

  try {
    const userExists = await prisma.users.findFirst({
      where: {
        email: bodyParsed.email,
      },
    });

    if (userExists) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await hash(bodyParsed.password, 8);

    const user = await prisma.users.create({
      data: {
        email: bodyParsed.email,
        name: bodyParsed.name,
        password: hashedPassword,
        budget: {
          createMany: {
            data: [
              {
                name: "Alimentação",
                amount: 1000,
              },
              {
                name: "Entretenimento",
                amount: 1000,
              },
            ],
          },
        },
        settings: {
          create: {
            monthly_budget: 1000,
          },
        },
      },
      include: {
        budget: true,
        settings: true,
      },
    });

    if (!user) {
      throw new NotCreatedError("User not created");
    }

    const { refresh_token, token } = await generateJWT(reply, {
      email: user.email,
      id: user.id,
      name: user.name,
    });

    reply.code(200).send({
      message: "User created",
      user: {
        ...user,
        password: undefined,
      },
      auth: {
        token,
        refresh_token,
      },
    });
  } catch (err) {
    if (err instanceof UserAlreadyExists || err instanceof NotCreatedError) {
      return reply.code(err.code).send({
        error: err,
        message: err.message,
      });
    }

    throw err;
  }
}

export default userCreateController;
