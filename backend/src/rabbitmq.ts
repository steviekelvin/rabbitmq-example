import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

const hostname = process.env.RABBITMQ_HOST          || "localhost";
const port     = process.env.RABBITMQ_PORT          || "5672";
const username = process.env.RABBITMQ_USER          || "guest";
const password = process.env.RABBITMQ_PASSWORD      || "guest";
const vhost    = "/";

const rabbitmqUrl = {
    protocol: 'amqp',
    hostname,
    port: Number(port),
    username,
    password,
    vhost,
  };
  

interface callback {
  (msg: amqp.ConsumeMessage): void;
}

export const sendToQueue = async (
  queueName: string,
  message: string,
  log: boolean = false,
  timeout: number = 500
) => {
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(message));
  if (log) {
    console.log(`Mensagem eviada para fila ${queueName}, mensagem: ${message}`);
  }
  setTimeout(() => connection.close(), timeout);
};

export const receiveFromQueue = async (
  queueName: string,
  log: boolean = false,
  callback?: callback
) => {
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  console.log(`\n\n\n\nEsperando por mensagem em ${queueName}\n\n\n\n`);
  channel.consume(queueName, (msg:any) => {
    if (msg !== null) {
      if (log) {
        console.log(`Mensagem recebida: ${msg?.content?.toString()}`);
      }
      channel.ack(msg);
      callback?(msg):null;
    }
  });
};
