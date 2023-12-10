import { FastifyReply } from "fastify";
export const TOKENS_EXPIRES = {
  ACCESS: 60 * 60 * 2,
  REFRESH: 20, // 20 seconds
};

export async function generateJWT(
  reply: FastifyReply,
  user: {
    id: string;
    name: string;
    email: string;
  }
) {
  const token = await reply.jwtSign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    {
      expiresIn: TOKENS_EXPIRES.ACCESS,
    }
  );

  const refreshToken = await reply.jwtSign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    {
      expiresIn: TOKENS_EXPIRES.REFRESH,
    }
  );

  return {
    token,
    refresh_token: refreshToken,
  };
}

// const fastify = require('fastify')();
// const jwt = require('fastify-jwt');
// const bcrypt = require('bcrypt');
// const { v4: uuidv4 } = require('uuid');

// // Configure o segredo para assinar os tokens JWT
// fastify.register(jwt, {
//   secret: 'seuSegredoSuperSecreto',
//   sign: { expiresIn: '15m' }, // Token JWT expira em 15 minutos
// });

// // Mock para simular um banco de dados de usuários
// const usersDB = [
//   {
//     id: '1',
//     email: 'usuario@teste.com',
//     password: '$2b$10$r0juJtW6.Ym4jTTr1fC2RO6t5W2qKklh0N8uQe4Qp1XKSHsJGoiaG', // senha: teste123
//     refreshTokens: [],
//   },
// ];

// // Função para gerar um token JWT
// function generateJWT(user) {
//   return fastify.jwt.sign({ userId: user.id });
// }

// // Função para gerar um refresh token
// function generateRefreshToken() {
//   return uuidv4();
// }

// fastify.post('/login', async (request, reply) => {
//   const { email, password } = request.body;

//   const user = usersDB.find((u) => u.email === email);
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     reply.code(401).send({ message: 'Credenciais inválidas' });
//     return;
//   }

//   const token = generateJWT(user);
//   const refreshToken = generateRefreshToken();

//   user.refreshTokens.push(refreshToken);

//   reply.send({ token, refreshToken });
// });

// fastify.post('/refresh', async (request, reply) => {
//   const { refreshToken } = request.body;

//   const user = usersDB.find((u) => u.refreshTokens.includes(refreshToken));
//   if (!user) {
//     reply.code(401).send({ message: 'Refresh token inválido' });
//     return;
//   }

//   // Remove o token expirado da lista de refresh tokens
//   user.refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);

//   const token = generateJWT(user);
//   const newRefreshToken = generateRefreshToken();

//   user.refreshTokens.push(newRefreshToken);

//   reply.send({ token, refreshToken: newRefreshToken });
// });

// // Exemplo de rota protegida que requer token JWT válido
// fastify.get('/protected', { preHandler: fastify.authenticate }, async (request, reply) => {
//   reply.send({ message: 'Rota protegida, token válido' });
// });

// // Inicialize o servidor
// fastify.listen(3000, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Servidor rodando em ${address}`);
// });
