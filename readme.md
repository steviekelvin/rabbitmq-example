# Projeto RabbitMQ exemplo em Node.js com Express

## Dependências para uso

    - Docker

## Instalações

- Clone o projeto
- Abra a pasta `rabbitmq-example`
- Copie o arquivo .env.example para .env na raiz do projeto
- Dentro da pasta backend também copie o arquivo .env.example para .env
- Levante os containers docker com o comando na raiz do projeto `docker compose up`
- O projeto vai estar disponível na url: `http://localhost:3000/`
- O terminal ficará rodando apresentando mensagens de envio e de recebimento na fila padrão 'teste'
- Caso precise mudar a fila de escuta padrão altere no .env do projeto backend

## Requisição

Faça uma requisição para a rota `http://localhost:3000/send` passando o parametro:

```json
{
  "mensagem": "mensagem teste",
  "fila": "teste",
  "log": true
}
```

No primeiro parametro passamos a mensagem,
na fila é onde definimos para qual fila iremos enviar,
o log é um booleano para mostrar ou não os logs no console

## Teste

Para teste esta sendo usado o Vitest, que pode ser executado dentro do projeto backend com o comando `npm run test` 