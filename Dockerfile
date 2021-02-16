FROM node:14.15-alpine3.13

ENV NODE_ENV=production

WORKDIR autan

COPY . ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
