# Bell Integrator Test Task

## Задание (скопировано из .docx-файла)

```
Тестовое задание для бэка - NODE.JS (результат нужно опубликовать на Github):
 
То что нужно знать: замыкание, promise, async\await, typescript, graphql, mysql, git
То с чем придется работать: typescript, typeorm, type-graphql, tslint, type-di, jest


Тестовое задание:
Используя минимум 2 библиотеки type-graphql и typeorm:
1) Создать мутации на создание книги и автора в базе.
2) Реализовать запрос на получение списка книг с авторами. Важно ограничиться двумя запросами к базе за один graphql запрос. Для author использовать fieldResolver.
3) Тесты:
-Создание автора
-Создание книги
-Получение книг без авторов
-Получение книг с авторами
 
Типы graphql схемы:type Book {
  bookId: number;
  name: string;
  pageCount: number;
  authorId: number;
  author: Author;
}

type Author {
  authorId: number;
  name: string;
}
 
Пример запроса к graphql:query {
  books() {
    name
    author {
      name
    }
  }
}
```

## Детали реализации

Было реализовано простое Node.js приложение с использованием языка TypeScript. В процессе реализации использовались следующие npm-пакеты:

- `type-graphql@1.0.0` (По условию задания)
- `typeorm@0.2.25` (По условию задания)
- `apollo-server@2.16.1` (Для обработки входящих http-запросов)
- `mysql2@2.1.0` (Клиент базы данных MySQL)

В качестве средств автоматизации и поддержки процесса разработки были использованы следующие `devDependencies`:

- `tsc-watch` (Для обеспечения непрерывной ре-компиляции вносимых изменений, так называемого `dev`/`watch`-режима)
- `tslint` (Для автоматической проверки и исправления стиля кода)

Также были реализованы конфигурации для отладки приложения в VS Code:

- `Attach to Program` может быть использован для присоединения отладчика к запущенному приложению (см. следующую секцию)
- `Launch Program` запустит компиляцию программы и после запустит отладчик. *ПРИМЕЧАНИЕ:* Для корректной работы этого режима необходимо обновить файл `launch.json` следующим образом (добавить секцию `env` в данную конфигурацию запуска)
    ```json
    {
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        ...
        "env": {
            "SERVER_PORT": "<Your HTTP port>",
            "DATABASE_NAME": "<Your database name>",
            "DATABASE_HOST": "<Your database host>",
            "DATABASE_PORT": "<Your database port>",
            "DATABASE_USER": "<Your database user>",
            "DATABASE_PASSWORD": "<Your database password>"
        }
        ...
    }
    ```

## Инструкции для развертывания

- Развернуть сервер БД MySQL
- Создать в нем новую БД
- Открыть окно консоли, перейти в каталог текущего репозитория
- Выполнить команду: `npm install`
- Добавить в окружение следующие переменные (`bash`-style команды):
    ```bash
    export SERVER_PORT=<Your HTTP port>
    export DATABASE_NAME=<Your database name>
    export DATABASE_HOST=<Your database host>
    export DATABASE_PORT=<Your database port>
    export DATABASE_USER=<Your database user>
    export DATABASE_PASSWORD=<Your database password>
    ```
- Выполнить команды: `npm run build && npm start`
- В результате выполнения команд в консоли появится сообщение вида: `Server is running, GraphQL Playground available at http://localhost:<Your HTTP port>/`. Откройте эту ссылку в браузере: Песочница для тестирования приложения перед вами.