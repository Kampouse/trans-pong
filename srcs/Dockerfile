FROM node:latest

VOLUME [ "/app" ]

WORKDIR /app

ENV PATH="./node_modules/.bin$PATH"

EXPOSE 5173
EXPOSE 5555
EXPOSE 3000

CMD [ "npm", "start" ]
