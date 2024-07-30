# Используем официальный образ Node.js в качестве базового образа
FROM node:19-alpine3.16

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем приложение
CMD ["npm", "start"]