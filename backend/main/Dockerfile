FROM node:12

COPY ./package* ./

RUN npm install -g && \
    npm cache clean --force

RUN npm i -g sequelize-cli sequelize mysql2 nodemon

COPY . .

EXPOSE 8000

# Start the app
CMD npm run dev
