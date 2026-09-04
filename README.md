# salon-plus

Сайт парикмахерской «Салон-Плюс» в Калининграде.

## Запуск

Требуется Node.js 22.13 или новее.

```sh
npm ci
npm run dev
```

## Сборка

```sh
npm run build
```

Проект использует React и Vinext. Сборка для Cloudflare Workers находится в `dist/server`, публичные ресурсы — в `dist/client`.

Услуги и телефон: `app/data.ts`. Разметка: `app/page.tsx`. Стили: `app/globals.css`.

Запись по телефону. Подтверждённую ссылку YCLIENTS можно указать в `YCLIENTS_BOOKING_URL`.
