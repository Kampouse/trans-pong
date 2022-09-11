### STAGE 1: Build ###
FROM node:16 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install 
COPY . /usr/src/app
RUN npm run build
### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine
COPY --from=builder /usr/src/app/dist  /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
