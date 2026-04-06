const products = [
  {
    id: 'mat-g05',
    name: '3D коврики Premium G05/G06',
    category: 'Салон',
    price: 69000,
    badge: 'Best seller',
    compatibility: 'X5 G05 / X6 G06',
    description: 'Износостойкий комплект с высоким бортом для сухого и грязного сезона.',
  },
  {
    id: 'ambient-kit',
    name: 'Ambient LED kit',
    category: 'Салон',
    price: 99000,
    badge: 'New',
    compatibility: '3 / 5 / X series',
    description: 'Мягкая интерьерная подсветка с OEM-style интеграцией.',
  },
  {
    id: 'mirror-caps',
    name: 'M Performance mirror caps',
    category: 'Экстерьер',
    price: 84000,
    badge: 'Carbon look',
    compatibility: 'G20 / G30 / G42',
    description: 'Аккуратный карбон-look апгрейд без визуального колхоза.',
  },
  {
    id: 'trunk-organizer',
    name: 'Trunk organizer premium',
    category: 'Практичность',
    price: 42000,
    badge: 'KZ road ready',
    compatibility: 'X3 / X5 / X7',
    description: 'Органайзер для инструмента, химии, зарядок и мелочей в багажнике.',
  },
  {
    id: 'carplay-adapter',
    name: 'Wireless CarPlay adapter',
    category: 'Tech',
    price: 59000,
    badge: 'Plug & play',
    compatibility: 'NBT EVO / ID6 / ID7',
    description: 'Переход на беспроводной CarPlay без сложной установки.',
  },
  {
    id: 'winter-pack',
    name: 'Winter protection pack',
    category: 'Защита',
    price: 129000,
    badge: 'Seasonal',
    compatibility: 'BMW F / G platform',
    description: 'Защита порогов, антигрязевой набор и премиальная химия для зимы.',
  },
  {
    id: 'dash-cam',
    name: 'Dash cam discreet OEM',
    category: 'Tech',
    price: 109000,
    badge: 'Safety',
    compatibility: 'Большинство BMW 2017+',
    description: 'Скрытая установка и запись поездок в фирменной эстетике интерьера.',
  },
  {
    id: 'urban-bundle',
    name: 'Urban Carbon Pack',
    category: 'Комплекты',
    price: 189000,
    badge: 'Bundle',
    compatibility: 'G-series',
    description: 'Готовый набор для заметного, но взрослого апгрейда BMW.',
  },
];

const faqs = [
  {
    q: 'Это реальные товары или просто заглушка?',
    a: 'Это фронтенд-MVP с правдоподобным каталогом и UI под реальный магазин. Backend, оплата и интеграции можно подключить следующим этапом без переделки визуальной логики.',
  },
  {
    q: 'Можно ли добавить подбор по VIN?',
    a: 'Да. Под это уже подходит sales chat и форма checkout/comment. Дальше логично подключить CRM, лиды и форму совместимости.',
  },
  {
    q: 'Как считается доставка по Казахстану?',
    a: 'Сейчас это UI-концепт. На следующем этапе можно интегрировать таблицы тарифов, API логистики и динамический расчет по городу/весу.',
  },
  {
    q: 'Есть ли личный кабинет и CRM?',
    a: 'Да, в MVP уже есть визуальные блоки кабинета клиента и admin/CRM-концепта, чтобы продукт выглядел как готовая система, а не как “документ с хотелками”.',
  },
];

const state = {
  filter: 'Все',
  cart: [],
};

const productGrid = document.getElementById('product-grid');
const filtersNode = document.getElementById('filters');
const faqNode = document.getElementById('faq-list');
const cartItemsNode = document.getElementById('cart-items');
const cartTotalNode = document.getElementById('cart-total');
const cartCountNode = document.getElementById('cart-count');
const checkoutSummaryNode = document.getElementById('checkout-summary');
const drawers = {
  cart: document.getElementById('cart-drawer'),
  checkout: document.getElementById('checkout-drawer'),
  account: document.getElementById('account-drawer'),
};
const chatPanel = document.getElementById('chat-panel');

function formatPrice(value) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₸`;
}

function renderFilters() {
  const categories = ['Все', ...new Set(products.map((p) => p.category))];
  filtersNode.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-chip ${state.filter === category ? 'active' : ''}" data-filter="${category}">
          ${category}
        </button>
      `,
    )
    .join('');
}

function renderProducts() {
  const filtered = state.filter === 'Все' ? products : products.filter((p) => p.category === state.filter);

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="glass-card product-card">
          <div class="product-media" data-badge="${product.badge}"></div>
          <div>
            <p class="compatibility">${product.compatibility}</p>
            <h3>${product.name}</h3>
          </div>
          <p>${product.description}</p>
          <div class="product-meta">
            <span>${product.category}</span>
            <strong class="price">${formatPrice(product.price)}</strong>
          </div>
          <div class="product-actions">
            <button class="ghost-button" data-open="checkout">Купить сейчас</button>
            <button class="primary-button" data-add="${product.id}">В корзину</button>
          </div>
        </article>
      `,
    )
    .join('');
}

function renderFaqs() {
  faqNode.innerHTML = faqs
    .map(
      (item, index) => `
        <article class="faq-item ${index === 0 ? 'open' : ''}">
          <button data-faq>
            <span>${item.q}</span>
            <span>+</span>
          </button>
          <p>${item.a}</p>
        </article>
      `,
    )
    .join('');
}

function renderCart() {
  cartCountNode.textContent = String(state.cart.length);

  if (!state.cart.length) {
    cartItemsNode.innerHTML = '<div class="glass-card">Корзина пока пустая. Но это легко исправить.</div>';
    checkoutSummaryNode.innerHTML = '<div class="summary-line"><span>Нет товаров</span><strong>0 ₸</strong></div>';
    cartTotalNode.textContent = formatPrice(0);
    return;
  }

  cartItemsNode.innerHTML = state.cart
    .map(
      (item, index) => `
        <div class="cart-item">
          <strong>${item.name}</strong>
          <span>${item.compatibility}</span>
          <div class="product-meta">
            <strong>${formatPrice(item.price)}</strong>
            <button class="ghost-button" data-remove="${index}">Убрать</button>
          </div>
        </div>
      `,
    )
    .join('');

  checkoutSummaryNode.innerHTML = state.cart
    .map(
      (item) => `
        <div class="summary-line">
          <span>${item.name}</span>
          <strong>${formatPrice(item.price)}</strong>
        </div>
      `,
    )
    .join('');

  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalNode.textContent = formatPrice(total);
  checkoutSummaryNode.innerHTML += `
    <div class="summary-line">
      <span>Доставка</span>
      <strong>от 5 000 ₸</strong>
    </div>
    <div class="summary-line">
      <span>Итого</span>
      <strong>${formatPrice(total + 5000)}</strong>
    </div>
  `;
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  state.cart.push(product);
  renderCart();
}

function openDrawer(name) {
  Object.values(drawers).forEach((drawer) => drawer.classList.remove('open'));
  if (drawers[name]) drawers[name].classList.add('open');
}

function closeDrawers() {
  Object.values(drawers).forEach((drawer) => drawer.classList.remove('open'));
}

function toggleChat(forceOpen = false) {
  chatPanel.classList.toggle('hidden', forceOpen ? false : !chatPanel.classList.contains('hidden'));
}

document.addEventListener('click', (event) => {
  const filterButton = event.target.closest('[data-filter]');
  const addButton = event.target.closest('[data-add]');
  const bundleButton = event.target.closest('[data-add-bundle]');
  const removeButton = event.target.closest('[data-remove]');
  const openButton = event.target.closest('[data-open]');
  const closeButton = event.target.closest('[data-close]');
  const faqButton = event.target.closest('[data-faq]');
  const chatCloseButton = event.target.closest('[data-chat-close]');

  if (filterButton) {
    state.filter = filterButton.dataset.filter;
    renderFilters();
    renderProducts();
  }

  if (addButton) {
    addToCart(addButton.dataset.add);
    openDrawer('cart');
  }

  if (bundleButton) {
    addToCart('urban-bundle');
    openDrawer('cart');
  }

  if (removeButton) {
    state.cart.splice(Number(removeButton.dataset.remove), 1);
    renderCart();
  }

  if (openButton) {
    const target = openButton.dataset.open;
    if (target === 'chat') {
      chatPanel.classList.remove('hidden');
    } else {
      openDrawer(target);
    }
  }

  if (closeButton || event.target.classList.contains('drawer')) {
    closeDrawers();
  }

  if (faqButton) {
    faqButton.parentElement.classList.toggle('open');
  }

  if (chatCloseButton) {
    chatPanel.classList.add('hidden');
  }
});

renderFilters();
renderProducts();
renderFaqs();
renderCart();
