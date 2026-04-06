const heroLines = ["AI-СТУДИЯ", "ДЛЯ БРЕНДОВ", "КОТОРЫЕ ХОТЯТ", "УПРАВЛЯТЬ ТЕМПОМ."];

const capabilityItems = [
  {
    id: "01",
    title: "AI-стратегия и запуск",
    text: "Собираем дорожную карту внедрения: от позиционирования и use-case логики до первой рабочей архитектуры.",
  },
  {
    id: "02",
    title: "Продуктовые интерфейсы",
    text: "Делаем сайты, demo-поверхности и лендинги так, чтобы они ощущались как запуск новой категории, а не очередной шаблон.",
  },
  {
    id: "03",
    title: "Автоматизация операций",
    text: "Встраиваем AI-агентов, CRM-сценарии, квалификацию лидов, knowledge retrieval и внутренние copilot-контуры.",
  },
];

const mosaicCards = [
  {
    id: "A",
    title: "Контур продаж",
    text: "Лид -> квалификация -> follow-up -> handoff без ручных провалов.",
    asset: "/mesh-command.svg",
  },
  {
    id: "B",
    title: "Orchestration layer",
    text: "Telegram, CRM, таблицы, helpdesk и команда работают как одна сцена.",
    asset: "/mesh-pipeline.svg",
  },
  {
    id: "C",
    title: "Operator copilots",
    text: "Подсказки, контекст и next-step логика для людей внутри процесса.",
    asset: "/mesh-operators.svg",
  },
  {
    id: "D",
    title: "Executive control",
    text: "Видно не только, что работает, но и где система теряет скорость.",
    asset: "/mesh-control.svg",
  },
];

const caseCards = [
  {
    index: "01",
    title: "Премиальный AI-лендинг для студии услуг",
    text: "Собрали подачу, где бренд обещает высокий чек ещё до разговора с менеджером: большой ритм, визуальное доминирование, сильная русскоязычная копия.",
    meta: "brand direction / site experience / conversion theatre",
  },
  {
    index: "02",
    title: "Автоворонка для входящих лидов",
    text: "Разложили квалификацию по сигналам, автоответам и маршрутам передачи. Команда перестала тонуть в ручной сортировке входящих обращений.",
    meta: "AI qualification / routing / CRM sync",
  },
  {
    index: "03",
    title: "Внутренний контур для операционки",
    text: "Создали слой AI-помощников для FAQ, статусов, документов и next actions. Вместо хаоса — единая дисциплина процесса.",
    meta: "ops automation / knowledge layer / support triage",
  },
];

const metrics = [
  { value: "14д", label: "до первого рабочего MVP-контура" },
  { value: "24/7", label: "AI-агенты держат входящие и статусные точки" },
  { value: "x2.4", label: "быстрее запуск новых сценариев после базовой сборки" },
];

function PremiumAiStudioPage() {
  return (
    <main className="fantasy-remake">
      <section className="hero-scene" id="top">
        <div className="hero-noise" aria-hidden="true" />
        <header className="topbar-cinematic">
          <a className="brand-mark" href="#top" aria-label="KAMILA AI home">
            <span className="brand-dot" />
            <span>
              KAMILA AI
              <small>solutions / automation / intelligent experiences</small>
            </span>
          </a>

          <nav className="hero-nav">
            <a href="#services">Подход</a>
            <a href="#systems">Системы</a>
            <a href="#cases">Кейсы</a>
            <a href="#contact">Контакт</a>
          </nav>
        </header>

        <div className="hero-grid">
          <div className="hero-sidecopy">
            <span className="eyebrow-pill">Москва · удалённо · международные проекты</span>
            <p>
              Проектируем AI-решения и automation-системы для компаний, которым мало просто
              «внедрить нейросеть». Нужен эффект, контроль и ощущение нового уровня.
            </p>
          </div>

          <div className="hero-headline" aria-label="Hero headline">
            {heroLines.map((line) => (
              <div key={line} className="hero-line">
                {line}
              </div>
            ))}
          </div>

          <aside className="hero-stat-panel cinematic-panel">
            <span className="panel-kicker">Launch signal</span>
            <strong>97</strong>
            <p>
              Индекс готовности проекта: бренд, сценарий внедрения и automation-архитектура
              сведены в один запуск, а не размазаны по кварталам.
            </p>
            <div className="signal-bars" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </aside>
        </div>
      </section>

      <section className="numbered-services" id="services">
        <div className="services-intro">
          <span className="section-label">Capabilities</span>
          <h2>Три слоя, из которых собирается взрослый AI-бизнес.</h2>
        </div>

        <div className="services-grid">
          {capabilityItems.map((item) => (
            <article key={item.id} className="service-column">
              <span>{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="positioning-statement">
        <div className="statement-shell">
          <p>
            Уже не работает схема, где бренд отдельно, сайт отдельно, а автоматизация вообще
            «потом». Мы собираем всё в один управляемый опыт — чтобы компания выглядела сильнее и
            работала быстрее одновременно.
          </p>
        </div>
      </section>

      <section className="immersive-gallery" id="systems">
        <div className="gallery-copy sticky-column">
          <span className="section-label">Immersive systems</span>
          <h2>Середина сайта должна продавать не словами, а ощущением масштаба.</h2>
          <p>
            Поэтому здесь не обычный список услуг. Сначала идёт визуальный контроль, затем —
            логика AI-слоя, и только после этого — прикладная аргументация для бизнеса.
          </p>
        </div>

        <div className="gallery-mosaic">
          {mosaicCards.map((card) => (
            <article key={card.id} className="mosaic-card cinematic-panel">
              <img src={card.asset} alt={card.title} />
              <div className="mosaic-card-copy">
                <span>{card.id}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-narrative" id="cases">
        <div className="case-head">
          <span className="section-label">Selected builds</span>
          <h2>После атмосферы — плотность. Здесь уже видно, как это работает в деле.</h2>
        </div>

        <div className="case-stack">
          {caseCards.map((card) => (
            <article key={card.index} className="case-card cinematic-panel">
              <span className="case-index">{card.index}</span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
              <small>{card.meta}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="metrics-band">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="closing-cta" id="contact">
        <div className="closing-shell cinematic-panel">
          <div>
            <span className="section-label">Start the build</span>
            <h2>Если нужен русскоязычный AI-сайт или automation-студия без скучного SaaS-вайба — погнали делать это красиво и жёстко.</h2>
          </div>

          <div className="closing-actions">
            <a className="button-main" href="mailto:hello@kamila-ai.studio">
              hello@kamila-ai.studio
            </a>
            <a className="button-ghost" href="#top">
              Наверх
            </a>
            <p>AI strategy · launch systems · CRM orchestration · agent workflows · premium web production</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PremiumAiStudioPage;
