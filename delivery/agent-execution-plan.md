# BMW KZ MVP — Agent Execution Plan

## 1. Цель
Разложить реализацию MVP на роли, артефакты и порядок включения команды.

## 2. Рекомендуемые роли
### 1) Product / delivery lead
Отвечает за scope, приоритеты, acceptance criteria, синхронизацию.

### 2) UX/UI designer
Собирает user flows, wireframes, visual direction, responsive screens.

### 3) E-commerce architect / tech lead
Выбирает стек, проектирует сущности, интеграции и delivery plan.

### 4) Frontend engineer
Реализует storefront, catalog, PDP, cart, checkout, account basics.

### 5) Backend / CMS engineer
Реализует catalog model, admin, orders, CRM/payment integrations.

### 6) Content / copy lead
Готовит homepage copy, category copy, PDP templates, trust pages.

### 7) SEO specialist
Финализирует IA, metadata, template rules, schema, indexing logic.

### 8) CRM / operations specialist
Настраивает order processing, pipeline, notifications, message templates.

### 9) QA / launch operator
Проверяет critical flows и readiness перед запуском.

## 3. Execution sequence
### Stage 0 — Alignment
Артефакты:
- market overview
- MVP scope
- architecture draft
- build brief

Output:
- подтвержденный scope;
- выбранный стек;
- список стартовых SKU и категорий.

### Stage 1 — Foundations
Исполнители:
- product lead
- tech lead
- designer
- SEO

Задачи:
- freeze core requirements;
- подтвердить IA;
- определить tech stack;
- описать catalog fields;
- собрать screen map.

### Stage 2 — UX/UI
Исполнители:
- designer
- product lead
- content lead

Задачи:
- wireframes desktop/mobile;
- UI kit lite;
- homepage, category, PDP, cart, checkout, account, static pages;
- states: in stock / preorder / out of stock.

### Stage 3 — Build
Исполнители:
- frontend
- backend
- tech lead

Задачи:
- storefront;
- CMS/admin;
- order model;
- payments;
- CRM/webhooks;
- analytics base;
- SEO template rules.

### Stage 4 — Merchandising & content
Исполнители:
- content lead
- merch manager
- SEO

Задачи:
- загрузить категории;
- завести SKU;
- подготовить фото;
- заполнить PDP content;
- написать trust pages.

### Stage 5 — Ops & launch prep
Исполнители:
- CRM/ops
- QA
- delivery lead

Задачи:
- order statuses;
- manager scripts;
- test orders;
- payment verification;
- shipping rules;
- event tracking verification.

### Stage 6 — Launch
Исполнители:
- full pod light

Задачи:
- soft launch;
- sanity monitoring;
- фиксы по real-user feedback;
- запуск трафика.

## 4. Suggested agent work packages
### Package A — Product foundation
Owner: product lead
Deliverables:
- final scope
- prioritized backlog
- acceptance criteria for P0/P1

### Package B — UX system
Owner: designer
Deliverables:
- information architecture
- wireframes
- UI direction
- responsive screens

### Package C — Commerce data model
Owner: tech lead / backend
Deliverables:
- entities
- API contract
- admin model
- integration map

### Package D — Storefront implementation
Owner: frontend
Deliverables:
- pages
- reusable components
- state handling
- analytics event hooks

### Package E — Content & SEO
Owner: content + SEO
Deliverables:
- homepage copy
- category copy
- metadata
- structured content blocks

### Package F — CRM & support ops
Owner: ops specialist
Deliverables:
- pipeline statuses
- order routing
- manager notifications
- message templates

## 5. Delivery dependencies
- Designer depends on scope and IA.
- Frontend depends on wireframes and API/content model.
- Backend depends on agreed order/CRM/payment logic.
- Content depends on final category tree and product template.
- SEO depends on page structure and template fields.
- QA depends on stable staging and seeded catalog.

## 6. Risks during execution
- late stack decision;
- catalog data chaos;
- missing product photos/content;
- underdefined checkout/payment flow;
- no clear owner for CRM and order ops;
- trying to implement too much fitment logic too early.

## 7. Recommended first agents to activate
1. Product lead
2. Tech lead / architect
3. UX/UI designer
4. Content + SEO pair
5. Frontend + backend build pair
6. CRM/ops specialist
7. QA

## 8. Definition of done for MVP
MVP can go live when:
- 50–150 SKU uploaded;
- homepage, categories, PDP, cart, checkout working;
- at least one payment path works;
- delivery rules are visible;
- CRM receives orders/leads;
- chat entry points work;
- analytics basic events fire;
- legal/trust pages exist;
- mobile QA passed on key flows.
