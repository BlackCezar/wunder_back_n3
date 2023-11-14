## Installation

Скопировать .env
```bash
cp .env-example .env
```

Время для задач по парсеру валют выставляется в формате
```
"0 30 13 * * *"
```
От привычного отличает то что добавлены секунды и они идут первым значением (а не минуты)

AT_SECRET - Access-токен

RT_SECRET - Refresh-токен

Быстро сгенерировать можно например так:
```bash
$ openssl rand -hex 42
# или так
$ pwgen -Bcny 42 -1
```

Заполнить .env

#### Установка
```bash
$ npm install
$ docker-compose up -d
```

Если контейнер postgres постоянно перезагружается или пустой, то значит забыли поменять владельца папки
```bash
# лог
$ docker logs --tail 50 --follow --timestamps postgres
# если не хватает прав что бы использовать папку с данными
$ chown -R 1001:1001 [directory]
# пример
$ chown -R 1001:1001 /var/apps/wunder_uz/data/pg
```
где `[directory]` это полный путь к папке с данными `./data/pg/` из `docker-compose.yml`
Аналогичные действия, если не подключается к БД


Для работы pgadmin4 тоже требуется установить владельца папки 5050
```bash
chown -R 5050:5050 [directory]
# пример
$ chown -R 5050:5050 /var/apps/wunder_uz/data/pgadmin
```

## Running the app

#### Запуск миграций
```bash
$ npx prisma migrate dev
# заполнение данными
$ npx prisma db seed
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
