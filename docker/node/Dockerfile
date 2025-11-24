# docker/node/Dockerfile
FROM node:20-alpine

# Рабочая директория внутри контейнера
WORKDIR /var/www/hackathon-2025-alice

# Сначала копируем файлы зависимостей,
# чтобы докер кешировал слой с npm ci
COPY package*.json ./

# Установка прод-зависимостей
# (если нужны dev-зависимости — убери флаг --only=production)
RUN npm ci --only=production

# Копируем остальной код приложения
COPY . .

# Порт, на котором слушает Node (прокидываешь на него из nginx)
EXPOSE 3000

# Старт команды — опираемся на "scripts.start" в package.json
CMD ["npm", "run", "start"]
