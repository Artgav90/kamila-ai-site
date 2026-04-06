# BMW KZ MVP — System Architecture

## 1. Архитектурный принцип
MVP должен быть быстрым в запуске, понятным в поддержке и не упираться в тяжелый enterprise.

Подход:
- storefront отдельно;
- CMS / catalog admin отдельно;
- orders + CRM интеграция обязательно;
- чат и аналитика как first-class части системы.

## 2. Target architecture (MVP)
```text
Traffic Sources
  ├─ Meta / Google / TikTok / Direct / SEO
  ↓
Frontend Storefront
  ├─ Home / Category / PDP / Cart / Checkout / Account
  ├─ Search + filters
  ├─ SEO pages
  └─ Chat entry points
  ↓
Commerce / Backend Layer
  ├─ Product catalog
  ├─ Pricing
  ├─ Inventory status
  ├─ Cart
  ├─ Checkout
  ├─ Orders
  └─ Customer profiles
  ↓
Integrations Layer
  ├─ Payment provider(s)
  ├─ Delivery/shipping rules
  ├─ CRM
  ├─ Messaging (WhatsApp/Telegram/email)
  ├─ Analytics / pixels
  └─ CMS content blocks
```

## 3. Рекомендуемые модули
### 3.1 Frontend
Функции:
- главная;
- категории;
- product detail page;
- корзина;
- checkout;
- кабинет;
- статические страницы;
- SEO-посадочные.

Требования:
- mobile-first;
- быстрая загрузка;
- SSR/SSG желательно для SEO;
- удобная контентная сборка баннеров и блоков.

### 3.2 Catalog / CMS / admin
Нужно хранить:
- товары;
- категории;
- цены;
- остатки;
- брендинг/медиа;
- совместимость;
- SEO-мета;
- статусы availability.

Ключевые сущности:
- Product
- Category
- FitmentTag
- Brand
- Media
- InventoryState
- Order
- Customer
- CompatibilityRequest

### 3.3 Orders
Order lifecycle MVP:
- new;
- pending confirmation;
- awaiting payment;
- paid;
- packed;
- shipped;
- delivered;
- cancelled;
- return requested.

### 3.4 CRM
CRM должна получать:
- каждый заказ;
- каждую заявку “проверить совместимость”;
- заявки “нет в наличии / под заказ”;
- канал и utm.

Если нет сложной CRM, допустим старт с:
- amoCRM / Bitrix24 / HubSpot pipeline;
- либо lightweight internal admin + Telegram notifications.

## 4. Suggested data model
### Product
- id
- sku
- title
- slug
- short_description
- full_description
- price
- sale_price
- currency
- stock_status (in_stock / preorder / out_of_stock)
- quantity optional
- brand
- images[]
- category_ids[]
- fitment_tags[]
- badges[]
- attributes[]
- seo_title
- seo_description

### FitmentTag
- id
- series (3/5/X5/etc.)
- model code (G20/F30/G05/etc.)
- body type optional
- year range optional
- notes

### Customer
- id
- first_name
- phone
- email
- city
- preferred_messenger
- garage[]

### GarageItem
- make = BMW
- series/model
- generation/code
- year
- vin_last7 optional

### CompatibilityRequest
- id
- customer_id or guest data
- product_id
- message
- car data
- status
- assigned_to

## 5. Checkout architecture
### Required behavior
- guest checkout by default;
- optional login/account creation after purchase;
- coupon field optional;
- shipping cost calculation by city/method;
- fallback manual confirmation for complex items.

### Validation
- phone required;
- city required;
- address required if courier selected;
- payment method required;
- product availability re-check before order confirm.

## 6. Payment architecture
### MVP approach
Поддержать один основной онлайн-платеж + один ручной fallback.

Примеры:
- card acquiring;
- Kaspi / local pay option если реально доступно через стек;
- manual invoice / transfer fallback.

Требования:
- order создается даже при неуспешной оплате;
- webhook обновляет статус оплаты;
- менеджер видит pending payment.

## 7. Delivery architecture
На старте не нужна глубокая интеграция с каждым перевозчиком.

Достаточно:
- таблицы тарифных зон / правил;
- методы: самовывоз, локальный курьер, доставка по РК;
- admin/manual update tracking later.

## 8. Chat & messaging architecture
### Entry points
- floating WhatsApp/Telegram button;
- PDP CTA;
- checkout help CTA;
- contact page.

### What must be passed into chat
- product name;
- SKU;
- URL;
- customer message;
- model/year if entered.

### Notifications
- new order → manager channel;
- compatibility request → manager channel;
- out-of-stock lead → manager channel.

## 9. Analytics architecture
Минимум:
- GA4;
- Meta Pixel;
- GTM;
- server-side or enhanced event mapping later.

Track events:
- page_view;
- view_item;
- search;
- add_to_cart;
- begin_checkout;
- add_payment_info;
- purchase;
- contact_click;
- compatibility_request_submit.

## 10. SEO architecture
- clean URLs: `/catalog/`, `/bmw-x5-accessories/`, `/product/...`;
- unique meta on categories and PDP;
- schema.org Product / Breadcrumb / Organization;
- sitemap.xml;
- robots.txt;
- canonical URLs;
- category text blocks manageable from CMS.

## 11. Security / compliance baseline
- HTTPS everywhere;
- admin roles and access control;
- no full VIN in public pages;
- mask sensitive customer data in logs;
- backups of catalog/orders;
- anti-spam on forms/chat forms.

## 12. Recommended implementation path
### Option A — fastest pragmatic MVP
- Next.js storefront
- headless CMS / commerce backend
- simple admin for products/orders
- CRM via webhook
- payments via local/acquiring integration

### Option B — even faster no-code/low-code-ish commerce
- Shopify-like or WooCommerce-like base
- custom theme for premium look
- CRM/chat/pixel integrations

Если цель — быстро доказать спрос, Option B часто быстрее.
Если нужен масштабируемый custom stack и team-led build — Option A лучше.

## 13. What not to overbuild now
- полный PIM;
- сложная OMS;
- складская автоматизация;
- AI-подборщик без данных;
- микросервисы ради вайба.

Один нормальный монолитный MVP сейчас умнее, чем модная архитектурная духота.
