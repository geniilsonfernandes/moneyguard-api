import { FastifyReply, FastifyRequest } from "fastify";

async function verifyJwtMid(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: err, error: err });
  }
}

export { verifyJwtMid };
