FROM node:20-alpine3.16

WORKDIR /app

COPY . .  

ENV PATH /app/node_modues/.bin:$PATH

RUN npm install 

CMD ["npm","start"]

