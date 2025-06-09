FROM node:24-alpine

WORKDIR /app

COPY package*.json package-lock.json ./

# RUN npm install --legacy-peer-deps
RUN npm install --legacy-peer-deps


COPY . .
COPY next.config.ts ./next.config.ts
# ENV NEXT_IGNORE_TYPE_ERRORS=true
# RUN npm run build


EXPOSE 3000
# CMD ["npm", "run", "start"]

CMD ["npm", "run", "dev"]