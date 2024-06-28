# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY . .

# Instale as dependências do projeto
RUN npm install

# Comando para iniciar a aplicação
CMD ["npm", "start"]

# Exponha a porta 3001
EXPOSE 3001
