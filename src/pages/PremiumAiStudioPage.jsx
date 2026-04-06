const manifestoLines = [
  "AI STUDIO",
  "ДЛЯ БИЗНЕСА,",
  "КОТОРЫЙ НЕ ХОЧЕТ",
  "ЖИТЬ ВЧЕРА.",
];

const capabilities = [
  {
    id: "01",
    title: "Cinematic launch systems",
    text: "Собираем сайты и продуктовые поверхности, где бренд, motion и смысл работают как один режиссёрский кадр.",
  },
  {
    id: "02",
    title: "AI revenue engines",
    text: "Строим AI-воронки, qualification flow, follow-up контуры, scoring и операторские copilot-системы без ощущения шаблона.",
  },
  {
    id: "03",
    title: "Operational intelligence",
    text: "Автоматизируем внутренние процессы: support, документооборот, knowledge retrieval, triage и decision-routing.",
  },
];

const storyFrames = [
  {
    index: "A1",
    title: "Сначала мы режем шум.",
    text: "Убираем всё, что выглядит как очередной bland no-code лендинг. Нужен не блоковый конструктор, а цифровая сцена с напряжением, воздухом и драмой.",
    meta: "brand system / art direction / motion grammar",
  },
  {
    index: "A2",
    title: "Потом собираем интеллект в кадре.",
    text: "Каждый экран объясняет, как AI встраивается в продажи, операционку и сервис. Не набор фич. Последовательное ощущение силы.",
    meta: "experience logic / orchestration / interaction narrative",
  },
  {
    index: "A3",
    title: "И только потом давим цифрами.",
    text: "Когда визуальный мир уже продал доверие, подключаем outcomes: скорость внедрения, рост conversion, падение ручной нагрузки и эффект для команды.",
    meta: "impact proof / premium delivery / deployment rhythm",
  },
];

const systemLayers = [
  {
    label: "Signal layer",
    value: "24/7",
    text: "AI-агенты мониторят входящие лиды, внутренние очереди и критические точки процесса без потерь в темпе.",
  },
  {
    label: "Decision layer",
    value: "11",
    text: "Интеграционных узлов в MVP-архитектуре: CRM, knowledge base, мессенджеры, таблицы, helpdesk и внутренние панели.",
  },
  {
    label: "Velocity layer",
    value: "14d",
    text: "От стратегии до первого рабочего контура, если бизнес готов принимать быстрые решения, а не играть в бесконечные согласования.",
  },
];

const outcomes = [
  {
    sector: "D2C / retail",
    value: "+41%",
    title: "к конверсии из входящих обращений",
    text: "AI-квалификация, автоответы и контекстные сценарии для менеджеров сократили потери на первом касании.",
  },
  {
    sector: "Service business",
    value: "-58%",
    title: "ручной рутины в клиентском сервисе",
    text: "FAQ, triage, статусные апдейты и next-step рекомендации ушли в единый AI layer.",
  },
  {
    sector: "B2B ops",
    value: "x2.7",
    title: "быстрее запуск новых сценариев",
    text: "После сборки базовой orchestration-системы команда перестаёт перепридумывать процесс каждый раз с нуля.",
  },
];

function PremiumAiStudioPage() {
  return (
    <main className="studio-page">
      <section className="hero-block" id="top">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="grid-fade" aria-hidden="true" />

        <header className="topbar topbar-premium">
          <a className="brand-lockup" href="#top" aria-label="NOVA ERA home">
            <span className="brand-pulse" />
            <span>
              NOVA ERA
              <small>AI CINEMA / SYSTEMS / AUTOMATION</small>
            </span>
          </a>

          <nav className="topnav topnav-premium">
            <a href="#capabilities">Подход</a>
            <a href="#story">Нарратив</a>
            <a href="#outcomes">Результат</a>
            <a href="#contact">Контакт</a>
          </nav>
        </header>

        <div className="hero-stage">
          <div className="hero-copy-stack">
            <div className="eyebrow eyebrow-premium">Moscow / Dubai / worldwide delivery</div>
            <p className="hero-intro">
              Мы проектируем AI-студии, automation-системы и цифровые experiences с ощущением
              большого бренда — не ради декора, а ради власти над вниманием.
            </p>
          </div>

          <div className="hero-manifesto" aria-label="AI studio manifesto">
            {manifestoLines.map((line) => (
              <div key={line} className="manifesto-line">
                {line}
              </div>
            ))}
          </div>

          <div className="hero-aside-panel glass-panel">
            <div className="aside-kicker">Realtime direction</div>
            <div className="aside-metric">97</div>
            <p>
              Индекс готовности к внедрению: бренд, архитектура и automation-контура синхронизированы в одном запуске.
            </p>
            <div className="signal-track" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="hero-footer-ribbon">
          <span>AI websites</span>
          <span>growth systems</span>
          <span>brand experiences</span>
          <span>automation design</span>
          <span>операционный интеллект</span>
        </div>
      </section>

      <section className="chapter chapter-capabilities" id="capabilities">
        <div className="chapter-head split-head">
          <div>
            <span className="section-tag">Capabilities</span>
            <h2>
              Не делаем просто лендинг.
              <br />
              Строим контролируемое впечатление.
            </h2>
          </div>
          <p>
            В этой версии MVP убран обычный стартаповый вайб и заменён на editorial-подачу:
            большие плоскости, layered depth, тактильные панели, жесткая типографика и ощущение
            дорогой постановки с AI-смыслом внутри.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card glass-panel" key={item.id}>
              <span className="capability-id">{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="chapter chapter-immersive" id="story">
        <div className="immersive-layout">
          <div className="immersive-sticky">
            <span className="section-tag">Immersive narrative</span>
            <h2>
              Сайт ведёт себя как тизер будущей системы.
            </h2>
            <p>
              Не «вот наши услуги», а разворачивающийся сценарий: сначала ощущение силы, потом
              логика продукта, затем конкретный эффект для бизнеса.
            </p>

            <div className="orbital-scene glass-panel" aria-hidden="true">
              <div className="orbital-ring orbital-ring-a" />
              <div className="orbital-ring orbital-ring-b" />
              <div className="orbital-core" />
              <div className="orbital-card orbital-card-main">
                <span>Automation density</span>
                <strong>High signal / low noise</strong>
              </div>
              <div className="orbital-card orbital-card-side">
                <span>Interface mood</span>
                <strong>Cinematic / premium / alive</strong>
              </div>
            </div>
          </div>

          <div className="story-stack">
            {storyFrames.map((frame) => (
              <article className="story-card glass-panel" key={frame.index}>
                <span className="story-index">{frame.index}</span>
                <h3>{frame.title}</h3>
                <p>{frame.text}</p>
                <small>{frame.meta}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter chapter-system">
        <div className="system-banner glass-panel">
          <div className="system-banner-copy">
            <span className="section-tag">System architecture</span>
            <h2>
              AI-контур должен не только работать.
              <br />
              Он должен ощущаться неизбежным.
            </h2>
          </div>
          <div className="system-marquee" aria-hidden="true">
            <span>strategy</span>
            <span>interface</span>
            <span>automation</span>
            <span>storytelling</span>
            <span>ai agents</span>
            <span>ops design</span>
          </div>
        </div>

        <div className="system-layer-grid">
          {systemLayers.map((layer) => (
            <article className="system-layer glass-panel" key={layer.label}>
              <span>{layer.label}</span>
              <strong>{layer.value}</strong>
              <p>{layer.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="chapter chapter-outcomes" id="outcomes">
        <div className="chapter-head chapter-head-outcomes">
          <span className="section-tag">Selected outcomes</span>
          <h2>Когда упаковка дорогая, а система умная — цифры подтягиваются неслучайно.</h2>
        </div>

        <div className="outcomes-grid">
          {outcomes.map((item) => (
            <article className="outcome-card glass-panel" key={item.sector}>
              <span className="outcome-sector">{item.sector}</span>
              <div className="outcome-value">{item.value}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="chapter chapter-contact" id="contact">
        <div className="contact-shell glass-panel">
          <div className="contact-copy">
            <span className="section-tag">Start the build</span>
            <h2>
              Если нужен AI-сайт, automation-студия или growth-система с премиальной подачей —
              значит пора делать это не скучно.
            </h2>
          </div>

          <div className="contact-actions">
            <a className="button-primary" href="mailto:hello@novaera.ai">
              hello@novaera.ai
            </a>
            <a className="button-secondary" href="#top">
              Вернуться наверх
            </a>
            <p>Discovery sprint · визуальная концепция · архитектура внедрения · production-ready MVP</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PremiumAiStudioPage;
