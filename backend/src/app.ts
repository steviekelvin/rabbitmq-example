import express, { Request, Response, NextFunction } from "express";
import { receiveFromQueue, sendToQueue } from "./rabbitmq"; // Importar função para envio ao RabbitMQ

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Projeto Express + RabbitMQ + PG + Typeorm + Vitest + Docker!");
});

// Rota POST para enviar mensagem ao RabbitMQ
app.post("/send", async (req: Request, res: Response, next: NextFunction) => {
  const { fila, mensagem, log } = req.body;

  if (!fila || !mensagem) {
    return res.status(400).json({
      error: "Parâmetros inválidos: fila e mensagem são obrigatórios.",
    });
  }

  try {
    await sendToQueue(fila, mensagem, log || false); // Envia a mensagem para a fila
    res
      .status(200)
      .json({
        success: `Mensagem enviada para a fila ${fila}`,
        mensagem: mensagem,
      });
  } catch (error) {
    next(error); // Passa o erro para o middleware de erro
  }
});


// ------------------------------------- EXEMPLO DE USO DE SERVIDOR QUE ESCUTA A FILA -------------------------------------


// Iniciar a escuta da fila
const queueName = process.env.RABBITMQ_HOST || 'teste'; // Nome da fila
receiveFromQueue(
  queueName,
  true 
  // aqui pode ser implementado um callback por exemplo de confirmação de recebimento da mensagem
).catch(console.error); // Captura possíveis erros durante a escuta da fila


// ------------------------------------- FIM -------------------------------------



// Middleware para tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Ocorreu um erro no servidor!");
});

export default app;
