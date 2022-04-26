FROM node:16
WORKDIR /usr/src/app
COPY package*.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3000 4080
CMD ["yarn", "dev"]
