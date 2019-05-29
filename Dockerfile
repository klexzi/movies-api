FROM node:10.13-alpine

# Create app directory
WORKDIR /usr/src/movies-api

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]