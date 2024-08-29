# Используем официальный образ Node.js в качестве базового образа
FROM node:19-alpine3.16

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем приложение
CMD ["yarn", "start"]