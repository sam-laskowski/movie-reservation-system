FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV NEXT_IGNORE_TYPE_ERRORS=true
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]