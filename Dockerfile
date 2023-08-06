# Use a imagem base do PHP com Apache
FROM php:8.0.19-apache-buster

# Define a variável de ambiente PORT com um valor padrão de 80
ENV PORT=80

# Define o diretório de trabalho como /var/www/html
WORKDIR /var/www/html

# Copia o conteúdo do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Expõe a porta definida pela variável de ambiente PORT
EXPOSE ${PORT}

# Inicia o servidor Apache
CMD ["apache2-foreground"]
