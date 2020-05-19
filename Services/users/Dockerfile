FROM node:13.14.0-alpine3.10

# Create app directory
WORKDIR /usr/src/app/servises/users

COPY . ./

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start:prod" ]

