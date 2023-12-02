FROM node:18.18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8000

RUN npm run build

CMD npm start