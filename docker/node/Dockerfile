# docker/node/Dockerfile
FROM node:20-alpine

WORKDIR /var/www/hackathon-2025-alice

# Копируем только манифесты, чтобы слои кешировались
COPY package.json yarn.lock ./

# Устанавливаем зависимости
# --frozen-lockfile — строго по yarn.lock
# --production=true — только prod-зависимости
RUN yarn install --frozen-lockfile

# Копируем остальной код
COPY . .

EXPOSE 3000

# Если в package.json есть "start": "node index.js" или что-то своё
CMD ["yarn", "start"]
