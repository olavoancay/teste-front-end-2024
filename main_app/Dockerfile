# Use uma imagem base do nginx
FROM nginx:alpine

# Copie o arquivo de configuração do nginx para o contêiner
COPY src/nginx.conf /etc/nginx/nginx.conf

# Copie o index.html para o diretório padrão do nginx
COPY src/index.html /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando padrão para rodar o nginx
CMD ["nginx", "-g", "daemon off;"]
