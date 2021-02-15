FROM node:14.15-alpine3.13

WORKDIR autan

COPY package*.json src ./

ENV NODE_ENV=production

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]
