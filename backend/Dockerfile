# Server side
FROM node:16
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4080
CMD ["npm", "start"]
