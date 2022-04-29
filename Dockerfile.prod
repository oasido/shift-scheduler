# Production environment #

# Client side
FROM node:16 AS frontend
WORKDIR /usr/src/app/frontend/
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Nginx
FROM nginx:1.21.6-alpine
WORKDIR /usr/src/app/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /usr/src/app/frontend/build/ /usr/share/nginx/html/
