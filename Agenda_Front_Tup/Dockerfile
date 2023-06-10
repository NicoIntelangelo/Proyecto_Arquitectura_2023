FROM node:14.17.0 as build

WORKDIR /app

COPY package*.json ./
COPY angular.json ./

RUN npm install

COPY . .
#espacio entre los puntos !

RUN npm run build --prod

###########

FROM nginx 

COPY --from=build /app/dist/proyect-angular /usr/share/nginx/html

# Exponer el puerto 80
#EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
