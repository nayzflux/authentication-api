FROM node:latest

WORKDIR /app

COPY . .

RUN npm install --production-only

CMD ["npm", "start"]