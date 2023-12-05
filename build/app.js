// src/server.ts
var import_fastify = require("fastify");
function buildServer() {
  const server2 = (0, import_fastify.fastify)();
  server2.get("/", async (request, reply) => {
    return { hello: "world" };
  });
  return server2;
}
var server_default = buildServer;

// src/app.ts
var server = server_default();
async function main() {
  try {
    await server.listen({
      port: 4e3,
      host: "0.0.0.0"
    });
    console.log(`Server ready at http://localhost:4000`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
main();
