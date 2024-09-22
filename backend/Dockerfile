FROM node:20

RUN apt-get update && apt-get install -y \
    curl \
    vim \
    nano \
    postgresql-client

WORKDIR /app

COPY package*.json .
COPY . .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["bash", "./entrypoint.sh"]

EXPOSE 3000
CMD ["npm", "start"]