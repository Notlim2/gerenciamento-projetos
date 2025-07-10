FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN cp .env.example .env

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
