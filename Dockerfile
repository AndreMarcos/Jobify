FROM node:latest
WORKDIR /usr/app
COPY package*.json ./
RUN npm update
RUN export NODE_OPTIONS=--openssl-legacy-provider
COPY . .
EXPOSE 3000
CMD npm run dev