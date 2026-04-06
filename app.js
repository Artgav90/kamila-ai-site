const products = [
  {
    id: 'floor-liner-g05',
    name: 'All-weather floor liner set',
    category: 'Салон',
    price: 79000,
    badge: 'Daily essential',
    compatibility: 'X5 G05 / X6 G06',
    description: 'Плотные демо-коврики с высоким бортом для городской грязи, песка и дождливого сезона.',
    image:
      'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'ambient-light-kit',
    name: 'Ambient light upgrade kit',
    category: 'Салон',
    price: 118000,
    badge: 'Night cabin',
    compatibility: '3 / 5 / X series',
    description: 'Мягкий акцентный свет в духе premium салона без визуального перебора.',
    image:
      'https://images.pexels.com/photos/1276567/pexels-photo-1276567.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'seatback-organizer',
    name: 'Seatback organizer duo',
    category: 'Практичность',
    price: 36000,
    badge: 'Family ready',
    compatibility: 'Большинство BMW SUV',
    description: 'Два аккуратных органайзера для зарядок, документов, бутылки и travel-мелочей.',
    image:
      'https://images.pexels.com/photos/7567537/pexels-photo-7567537.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'mirror-cap-set',
    name: 'Mirror cap performance set',
    category: 'Экстерьер',
    price: 92000,
    badge: 'Sport look',
    compatibility: 'G20 / G30 / G42',
    description: 'Строгий performance-акцент для внешки без дешёвого тюнинг-шума.',
    image:
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'wireless-carplay',
    name: 'Wireless CarPlay adapter',
    category: 'Tech',
    price: 64000,
    badge: 'Plug & play',
    compatibility: 'NBT EVO / ID6 / ID7',
    description: 'Быстрый переход на беспроводной сценарий без лишнего визуального мусора в салоне.',
    image:
      'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'dash-cam-pro',
    name: 'Discreet dash cam pro',
    category: 'Tech',
    price: 129000,
    badge: 'Safety',
    compatibility: 'BMW 2018+',
    description: 'Скрытая демо-камера в стиле OEM setup для водителей, которые любят всё clean.',
    image:
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'trunk-storage-kit',
    name: 'Trunk storage kit',
    category: 'Практичность',
    price: 47000,
    badge: 'Road trip',
    compatibility: 'X3 / X5 / X7',
    description: 'Складные секции и ремни фиксации для багажника, чтобы ничего не каталось по салону.',
    image:
      'https://images.pexels.com/photos/248747/pexels-photo-248747.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'paint-protection-pack',
    name: 'Paint protection care pack',
    category: 'Защита',
    price: 54000,
    badge: 'Care',
    compatibility: 'BMW F / G platform',
    description: 'Демо-набор для ухода за лаком, стеклом и чёрным глянцем в премиальной подаче.',
    image:
      'https://images.pexels.com/photos/6873088/pexels-photo-6873088.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'performance-pedal-set',
    name: 'Performance pedal set',
    category: 'Салон',
    price: 58000,
    badge: 'Driver feel',
    compatibility: 'G-series automatic',
    description: 'Металлический акцент для водительской зоны, который реально добавляет премиальный штрих.',
    image:
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'winter-guard-bundle',
    name: 'Winter guard bundle',
    category: 'Защита',
    price: 143000,
    badge: 'KZ season',
    compatibility: 'Sedan / SUV BMW',
    description: 'Комбо для холодного и грязного сезона: коврики, защита порога и набор ухода.',
    image:
      'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'charging-console-tray',
    name: 'Charging console tray',
    category: 'Tech',
    price: 41000,
    badge: 'Clean desk',
    compatibility: 'G20 / G30 / X5',
    description: 'Организация центральной консоли: кабели, смартфон и ключи лежат как надо.',
    image:
      'https://images.pexels.com/photos/8424036/pexels-photo-8424036.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'night-drive-essentials',
    name: 'Night Drive Essentials',
    category: 'Комплекты',
    price: 214000,
    badge: 'Bundle',
    compatibility: 'G-series',
    description: 'Собранный demo-набор из floor liners, storage kit, dash cam и console tray.',
    image:
      'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

const faqs = [
  {
    q: 'Это официальный магазин BMW?',
    a: 'Нет. Это независимый demo-концепт storefront для аксессуаров BMW-fit. Он не притворяется официальным store и не использует ворованные marketplace-фото.',
  },
  {
    q: 'Какие изображения использованы на сайте?',
    a: 'Только safe-demo подход: удалённые royalty-free / stock-like изображения из открытых permissive источников для automotive mood, без копирования карточек с маркетплейсов.',
  },
  {
    q: 'Цены реальные?',
    a: 'Нет, это ориентировочные demo-цены в KZT для MVP-подачи. Они нужны, чтобы каталог и корзина выглядели правдоподобно при тесте оффера.',
  },
  {
    q: 'Можно ли превратить это в рабочий магазин?',
    a: 'Да. Следующий шаг — подключить CMS или backend, реальную корзину, оплату, тарифы доставки и CRM-обработку заявок.',
  },
  {
    q: 'Зачем здесь FAQ, CTA и checkout, если это demo?',
    a: 'Чтобы MVP выглядел как почти готовый storefront: это ускоряет проверку спроса, UX и рекламных гипотез без долгой сборки полноценной e-commerce платформы.',
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
          <div class="product-media" data-badge="${product.badge}" style="--product-image: url('${product.image}')"></div>
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
      <strong>от 8 000 ₸</strong>
    </div>
    <div class="summary-line">
      <span>Итого</span>
      <strong>${formatPrice(total + 8000)}</strong>
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
    addToCart('night-drive-essentials');
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
