# BMW Accessories KZ — Frontend MVP

Фронтенд-MVP интернет-магазина автоаксессуаров BMW по Казахстану.

## Что внутри

- современный premium automotive UI
- hero / CTA / преимущества
- каталог товаров с фильтрами
- карточки товаров и добавление в корзину
- корзина и checkout drawer UI
- блок доставки по Казахстану
- FAQ
- блок профиля клиента UI
- CRM / admin concept UI
- sales chat widget UI
- без backend, но структура готова под следующую интеграцию

## Стек

Максимально простой стек без лишней тяжести:

- `index.html`
- `styles.css`
- `app.js`

Это статический SPA-like MVP на чистом HTML/CSS/JS.

## Запуск

### Вариант 1: Python

```bash
python3 -m http.server 8080
```

Открой:

```text
http://localhost:8080
```

### Вариант 2: Node

Если хочется через Node:

```bash
npx serve .
```

## Структура

- `index.html` — разметка всех секций и UI drawer/widget блоков
- `styles.css` — визуальный стиль и адаптивность
- `app.js` — каталог, фильтры, FAQ, корзина, drawer-логика

## Дальше можно подключить

- CMS / headless backend
- реальную корзину и checkout API
- оплату Kaspi / card acquiring
- расчет доставки по городу и весу
- авторизацию клиента
- CRM-интеграцию и лиды из чата
