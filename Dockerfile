FROM node:latest
WORKDIR /app
COPY . /app
RUN npm intstall
EXPOSE 3000
CMD node app.js