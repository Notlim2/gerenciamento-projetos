FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN cp .env.example .env

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start"]
