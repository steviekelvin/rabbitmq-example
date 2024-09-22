import "reflect-metadata";
import app from "./app";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.APP_PORT || 3000;
const startServer = async () => {
  try {
    await createConnection(); // Conexão TypeORM
    app.listen(port, () => {
      console.log(`Servidor rodando na porta: ${port}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
  }
};

startServer();
