FROM node:12

COPY ./package* ./

RUN npm install -g && \
    npm cache clean --force

RUN npm i -g nodemon

COPY . .

EXPOSE 5672

# Start the app
CMD npm run dev
