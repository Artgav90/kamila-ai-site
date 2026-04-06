const serviceCards = [
  {
    title: "AI-отдел продаж",
    text: "Автоматизируем воронку: лиды, скрипты, CRM, follow-up и аналитику в одном контуре.",
  },
  {
    title: "Операции без рутины",
    text: "Убираем ручные процессы в финансах, поддержке, логистике и бэк-офисе без боли для команды.",
  },
  {
    title: "Корпоративные AI-ассистенты",
    text: "Создаём брендированных ассистентов, которые знают ваши документы, регламенты и KPI.",
  },
];

const metrics = [
  { value: "x3", label: "ускорение обработки лидов" },
  { value: "-62%", label: "ручной рутины в операциях" },
  { value: "14 дней", label: "до первого продакшн-сценария" },
  { value: "24/7", label: "поддержка автоматизаций и мониторинг" },
];

const workflow = [
  {
    id: "01",
    title: "Диагностика узких мест",
    text: "Разбираем, где бизнес теряет деньги, скорость и фокус. Смотрим цепочку от заявки до удержания.",
  },
  {
    id: "02",
    title: "Архитектура AI-контура",
    text: "Проектируем сценарии, интеграции и логику принятия решений: CRM, ERP, мессенджеры, BI, базы знаний.",
  },
  {
    id: "03",
    title: "Запуск и масштабирование",
    text: "Выводим MVP быстро, замеряем эффект и раскатываем на новые отделы без хаоса и техдолга.",
  },
];

const cases = [
  {
    company: "Retail / D2C",
    result: "+38% к конверсии из входящих заявок",
    text: "AI-квалификация лидов, персональные ответы и триггерные сценарии в Telegram, WhatsApp и CRM.",
  },
  {
    company: "B2B SaaS",
    result: "-47% времени на customer success",
    text: "Внутренний AI-ассистент для onboarding, QBR-подготовки, базы знаний и контроля SLA.",
  },
  {
    company: "Логистика",
    result: "x2.4 быстрее обработка запросов",
    text: "Автоматизация расчётов, маршрутов, статусов заказов и работы операторов в едином интерфейсе.",
  },
];

function PremiumAiStudioPage() {
  return (
    <main className="site-shell">
      <section className="hero-section">
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-working-with-the-digital-world-1560883448248?download=1080p"
              type="video/mp4"
            />
          </video>
          <div className="hero-video-overlay" />
          <div className="hero-noise" />
        </div>

        <header className="topbar">
          <div className="brand-block">
            <span className="brand-mark" />
            <span className="brand-name">NEURON NOIR</span>
          </div>
          <nav className="topnav">
            <a href="#services">Решения</a>
            <a href="#workflow">Процесс</a>
            <a href="#cases">Кейсы</a>
            <a href="#contact">Контакт</a>
          </nav>
        </header>

        <div className="hero-content">
          <div className="eyebrow">AI automation studio / Москва — Дубай — remote</div>
          <h1>
            Премиальные AI-системы,
            <span> которые превращают бизнес в машину скорости.</span>
          </h1>
          <p className="hero-copy">
            Проектируем и запускаем AI-ассистентов, автоматизацию продаж, операционный copilot и
            мультимодальные интерфейсы для компаний, которым уже тесно в ручном управлении.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#contact">
              Обсудить проект
            </a>
            <a className="button-secondary" href="#cases">
              Смотреть кейсы
            </a>
          </div>

          <div className="hero-panel-grid">
            <article className="floating-panel featured-panel">
              <div className="panel-kicker">LIVE SYSTEM</div>
              <h2>AI Control Room</h2>
              <p>
                Живой контур автоматизации: лиды, задачи, SLA, инциденты и решения модели — в одном
                интерфейсе для команды роста.
              </p>
              <div className="signal-bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </article>

            <article className="floating-panel stats-panel">
              <div className="panel-kicker">MVP IMPACT</div>
              <ul>
                {metrics.map((metric) => (
                  <li key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-intro" id="services">
        <div className="section-heading">
          <span className="section-label">Что мы строим</span>
          <h2>Не просто чат-боты. Полноценные AI-контуры для роста, ops и customer experience.</h2>
        </div>
        <div className="service-grid">
          {serviceCards.map((card) => (
            <article className="service-card" key={card.title}>
              <div className="service-card-glow" />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cinematic-band">
        <div className="band-copy">
          <span className="section-label">Motion layer</span>
          <h2>Визуально — премиум. Технически — прагматично. Запускаем быстро, выглядим дорого.</h2>
          <p>
            Для MVP мы собираем цифровой опыт с ощущением high-end продукта: видео-слои, кинематографичный
            свет, живые панели, глубокая типографика и сценарии, которые продают ещё до первого созвона.
          </p>
        </div>
        <div className="band-visual">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="visual-card visual-card-main">
            <span>Realtime orchestration</span>
            <strong>12 automation nodes</strong>
          </div>
          <div className="visual-card visual-card-side">
            <span>Lead score</span>
            <strong>94 / 100</strong>
          </div>
        </div>
      </section>

      <section className="section workflow-section" id="workflow">
        <div className="section-heading narrow">
          <span className="section-label">Как работаем</span>
          <h2>Сначала находим деньги и bottleneck, потом автоматизируем то, что реально двигает бизнес.</h2>
        </div>
        <div className="workflow-grid">
          {workflow.map((step) => (
            <article className="workflow-card" key={step.id}>
              <span className="workflow-id">{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cases-section" id="cases">
        <div className="section-heading">
          <span className="section-label">Selected outcomes</span>
          <h2>Сценарии, в которых AI даёт не хайп, а цифры.</h2>
        </div>
        <div className="cases-grid">
          {cases.map((item) => (
            <article className="case-card" key={item.company}>
              <span className="case-company">{item.company}</span>
              <h3>{item.result}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-card">
          <div>
            <span className="section-label">Start the build</span>
            <h2>Если нужен сайт, AI-воронка или automation-студия под ключ — мы уже мысленно собираем архитектуру.</h2>
          </div>
          <div className="contact-meta">
            <a href="mailto:hello@neuronnoir.ai">hello@neuronnoir.ai</a>
            <p>Discovery call · 30 минут · без скучных слайдов</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PremiumAiStudioPage;
