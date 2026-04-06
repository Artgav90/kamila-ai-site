# BMW Accessories KZ Demo — Frontend MVP

Независимый frontend-MVP / demo storefront для аксессуаров BMW-fit по Казахстану.

## Что обновлено

- premium hero с legal demo-подачей и disclaimer
- demo-каталог из 12 товаров с ориентировочными ценами в KZT
- карточки товаров с удалёнными safe-demo изображениями
- обновлённые преимущества, FAQ и CTA
- корзина и checkout drawer UI
- premium automotive стиль без притворства официальным BMW store

## Подход к изображениям

На сайте используются **только safe-demo remote visuals**:

- royalty-free / stock-like automotive images
- удалённые URL из свободных/пермиссивных photo-stock источников
- без marketplace rip'ов, водяных знаков и без копирования чужих карточек товаров

Важно: это **demo storefront**, а не официальный магазин BMW и не обещание реального наличия SKU.

## Стек

- `index.html`
- `styles.css`
- `app.js`

Это статический MVP на чистом HTML/CSS/JS.

## Локальный запуск

### Вариант 1: Python

```bash
python3 -m http.server 8080
```

Открыть:

```text
http://localhost:8080
```

### Вариант 2: Node

```bash
npx serve .
```

## Структура

- `index.html` — секции страницы, drawers, CTA и legal demo copy
- `styles.css` — premium automotive UI, сетка и responsive
- `app.js` — demo-каталог, фильтры, FAQ, корзина и drawer-логика

## Следующий шаг, если превращать в real project

- подключить CMS / backend
- завести реальные SKU и совместимость по кузовам
- добавить оплату и расчёт доставки
- подключить CRM / лиды / аналитику
- заменить demo-цены на реальные
