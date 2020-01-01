FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm run build
RUN npm ci --only=production
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]