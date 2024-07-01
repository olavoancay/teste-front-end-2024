# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Instale as dependências do projeto
RUN npm install

# Copie o arquivo .env para o contêiner
COPY .env .

# Comando para iniciar o servidor
CMD ["node", "src/server.js"]

# Exponha a porta 3002
EXPOSE 3002
