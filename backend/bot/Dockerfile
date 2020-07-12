FROM node:14-alpine

COPY ./package* ./

RUN npm install && \
    npm cache clean --force

RUN npm i -g sequelize-cli sequelize mysql2 nodemon

COPY . .

# Start the app
CMD npm run dev
