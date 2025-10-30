# Étape 1 : Construire l'application React avec Vite
FROM node:18-alpine AS build

WORKDIR /app


COPY package.json package-lock.json ./

RUN npm install


COPY . .


RUN npm run build


FROM nginx:alpine


COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80
EXPOSE 3001


CMD ["nginx", "-g", "daemon off;"]
