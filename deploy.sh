#!/bin/bash

# Сценарий локального деплоя приложения "Семейный Чемодан" на GitHub Pages
# --------------------------------------------------------------------------
# Этот скрипт автоматически собирает приложение и отправляет его в ветку gh-pages вашего репозитория.

# Цвета для вывода в терминал
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Запуск сценария деплоя на GitHub Pages ===${NC}\n"

# Проверка наличия git
if ! [ -x "$(command -v git)" ]; then
  echo -e "${RED}Ошибка: Git не установлен. Пожалуйста, установите Git и настройте репозиторий.${NC}" >&2
  exit 1
fi

# Проверка наличия npm
if ! [ -x "$(command -v npm)" ]; then
  echo -e "${RED}Ошибка: Node.js и npm не установлены. Установите их перед запуском деплоя.${NC}" >&2
  exit 1
fi

# 1. Сброс и очистка старой сборки
echo -e "${YELLOW}[1/4] Очистка и установка зависимостей...${NC}"
rm -rf dist
npm install

# 2. Сборка приложения в режиме production
echo -e "${YELLOW}[2/4] Сборка оптимизированной production-версии...${NC}"
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Ошибка сборки приложения. Проверьте ошибки в коде.${NC}"
  exit 1
fi

# 3. Инициализация временного репозитория в папке dist
echo -e "${YELLOW}[3/4] Подготовка файлов сборки...${NC}"
cd dist

# Создаем копию index.html как 404.html для правильной работы роутинга на GitHub Pages
cp index.html 404.html

git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages: $(date '+%Y-%m-%d %H:%M:%S')"

# Получаем URL удаленного репозитория из родительской папки
REMOTE_URL=$(git -C .. remote get-url origin 2>/dev/null)

if [ -z "$REMOTE_URL" ]; then
  echo -e "${RED}Предупреждение: Удаленный репозиторий (remote origin) не найден в родительской папке.${NC}"
  echo -e "Пожалуйста, введите URL вашего GitHub репозитория (например, https://github.com/username/repo.git):"
  read -r REMOTE_URL
fi

if [ -n "$REMOTE_URL" ]; then
  git remote add origin "$REMOTE_URL"
  echo -e "${YELLOW}[4/4] Отправка сборки в ветку gh-pages репозитория $REMOTE_URL...${NC}"
  git push -f origin gh-pages
  
  if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}🎉 Деплой успешно завершен!${NC}"
    # Парсим имя пользователя и репозитория для вывода ссылки
    if [[ $REMOTE_URL =~ github.com[:/]([^/]+)/([^.]+)(\.git)? ]]; then
      USER="${BASH_REMATCH[1]}"
      REPO="${BASH_REMATCH[2]}"
      echo -e "${GREEN}Приложение будет доступно по ссылке: https://$USER.github.io/$REPO/${NC}"
    fi
  else
    echo -e "${RED}Ошибка отправки в ветку gh-pages. Убедитесь в наличии прав доступа к репозиторию.${NC}"
  fi
else
  echo -e "${RED}Ошибка: URL репозитория не был указан. Сборка готова в папке /dist, но не отправлена на GitHub.${NC}"
fi

# Возвращаемся в корень проекта
cd ..
rm -rf dist/.git
