FROM node:13.12.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

CMD ["npm", "start"]
