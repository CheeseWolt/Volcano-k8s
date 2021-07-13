FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

ENV MONGO_URL=${MONGO_URL}
ENV MONGO_PORT=${MONGO_PORT}
ENV MONGO_DB=${MONGO_DB}

EXPOSE ${API_PORT}

CMD [ "npm", "start" ]