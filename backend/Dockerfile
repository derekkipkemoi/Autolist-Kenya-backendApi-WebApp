FROM node:14-slim

WORKDIR '/app'

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile 

COPY . .

EXPOSE 5000

CMD ["yarn","start"]
