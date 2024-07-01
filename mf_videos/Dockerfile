# Use uma imagem base do nginx
FROM nginx:alpine

# Copie os arquivos do projeto para o diretório padrão do nginx
COPY src /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando padrão para rodar o nginx
CMD ["nginx", "-g", "daemon off;"]
