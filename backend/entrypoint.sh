#!/bin/bash

echo "Configurando o projeto..."

# Verifica se o arquivo .env já existe; se não, cria-o a partir de .env.example
if [ ! -f .env ]; then
  echo "Arquivo .env não encontrado, criando a partir de .env.example..."
  cp .env.example .env
else
  echo "Arquivo .env já existe, prosseguindo..."
fi

echo "Instalando dependências..."
npm install

# Faz o build do projeto
echo "Buildando o projeto..."
npm run build

# Executa quaisquer comandos passados ao script
exec "$@"
