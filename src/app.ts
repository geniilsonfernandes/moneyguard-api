import { env } from "./env";
import buildServer from "./server";

const server = buildServer();

async function main() {
  try {
    await server.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

    console.log(`Server ready at http://localhost:${env.PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
