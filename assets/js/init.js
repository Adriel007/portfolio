// ==========================================
// Portfolio bootstrap
// ==========================================
// Loaded with `defer`, so the DOM is ready by the time this script runs.
// External libs (AOS, LeaderLine, Typed) are loaded in <head>.
//
// Sections:
//   1. PerformanceChecker — scores device, decides whether to lazy-load demos.
//   2. DOM helpers       — small render utilities.
//   3. Renderers         — build projects and demos from data.js.
//   4. Carousel          — generic image carousel used by every project card.
//   5. Demos viewer      — tabs + slides + iframe lazy loading.
//   6. Skills graph      — LeaderLine connections between roadmap nodes.
//   7. Boot              — orchestrates everything on `load`.

// ==========================================
// 1. PERFORMANCE CHECKER
// ==========================================
const PerformanceChecker = {
  thresholds: { minCores: 2, minScore: 30 },

  collect() {
    return {
      cores: navigator.hardwareConcurrency || 2,
      memoryAPI: navigator.deviceMemory,
      connection: navigator.connection?.effectiveType || "unknown",
      isMobile:
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ),
      gpu: PerformanceChecker.detectGPU(),
    };
  },

  detectGPU() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return "Unknown";
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "Unknown";
    } catch {
      return "Unknown";
    }
  },

  score(specs) {
    let s = 0;
    // CPU cores: 0–40
    if (specs.cores >= 8) s += 40;
    else if (specs.cores >= 6) s += 35;
    else if (specs.cores >= 4) s += 25;
    else if (specs.cores >= 2) s += 15;
    else s += 5;
    // Memory (browser-rounded so absence likely means desktop): 0–30
    const m = specs.memoryAPI;
    if (m === undefined || m >= 8) s += 30;
    else if (m >= 4) s += 20;
    else if (m >= 2) s += 10;
    else s += 5;
    // Mobile penalty
    if (specs.isMobile) s -= 20;
    // Connection bonus
    if (specs.connection === "4g" || specs.connection === "unknown") s += 10;
    else if (specs.connection === "3g") s += 5;
    // GPU bonus
    const g = specs.gpu;
    if (g && g !== "Unknown") {
      if (/NVIDIA|GeForce|RTX|GTX|AMD|Radeon|RX/i.test(g)) s += 20;
      else if (/Intel.*Iris|Intel.*Xe/i.test(g)) s += 15;
      else if (/Intel/i.test(g)) s += 10;
    }
    return Math.max(0, Math.min(100, s));
  },

  evaluate() {
    const specs = this.collect();
    const score = this.score(specs);
    const isWeak =
      score < this.thresholds.minScore ||
      (specs.isMobile && specs.cores < 4) ||
      specs.cores < this.thresholds.minCores;
    return { specs, score, isWeak };
  },

  renderWarning({ specs, score }) {
    const warning = document.getElementById("performance-warning");
    if (!warning) return;
    warning.classList.remove("hidden");

    setText(
      "cpu-cores-info",
      `CPU: ${specs.cores} core${specs.cores !== 1 ? "s" : ""}`,
    );
    setText(
      "memory-info",
      specs.memoryAPI !== undefined
        ? `RAM: ~${specs.memoryAPI}GB (limited by API)`
        : "RAM: Not detectable (likely desktop)",
    );
    const emoji = score >= 60 ? "🟢" : score >= 40 ? "🟡" : "🔴";
    setText("score-info", `${emoji} Score: ${score}/100`);

    if (specs.gpu && specs.gpu !== "Unknown") {
      const specsBox = document.querySelector(".device-specs");
      if (specsBox && !specsBox.querySelector(".gpu-info")) {
        const gpu = document.createElement("span");
        gpu.className = "gpu-info";
        gpu.textContent = `GPU: ${specs.gpu.substring(0, 40)}...`;
        specsBox.appendChild(gpu);
      }
    }
  },

  hideWarning() {
    document.getElementById("performance-warning")?.classList.add("hidden");
  },

  blockDemos() {
    document.querySelector(".demo-content")?.classList.add("demos-blocked");
  },

  unblockDemos() {
    document.querySelector(".demo-content")?.classList.remove("demos-blocked");
  },
};

// ==========================================
// 2. DOM HELPERS
// ==========================================
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "className") node.className = v;
    else if (k === "dataset")
      Object.assign(node.dataset, v);
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function")
      node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.append(c instanceof Node ? c : document.createTextNode(c));
  }
  return node;
}

function resolveImageSrc(image) {
  if (typeof image === "string") return `assets/images/projects/${image}`;
  if (image && image.external) return image.src;
  return image?.src ?? "";
}

// ==========================================
// 3. RENDERERS
// ==========================================
function renderProjects(container, projects) {
  container.replaceChildren(...projects.map(renderProjectCard));
}

function renderProjectCard(project, index) {
  const slides = project.images.map((img, i) =>
    el("div", {
      className: `carousel-slide${i === 0 ? " active" : ""}`,
      style: `background-image: url('${resolveImageSrc(img)}')`,
      "aria-label": `${project.title} – image ${i + 1}`,
    }),
  );

  const indicators = project.images.map((_, i) =>
    el("span", {
      className: `indicator${i === 0 ? " active" : ""}`,
      "data-index": String(i),
    }),
  );

  const links = project.links.map((link) =>
    el(
      "a",
      {
        href: link.href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: `project-link${link.className ? " " + link.className : ""}`,
      },
      el("i", { className: link.icon }),
      ` ${link.label}`,
    ),
  );

  const tags = project.tags.map((t) =>
    el("span", { className: "tag" }, t),
  );

  return el(
    "div",
    {
      className: "project-card",
      "data-aos": "fade-up",
      "data-aos-delay": index === 0 ? null : "100",
    },
    el(
      "div",
      { className: "project-carousel" },
      el(
        "div",
        { className: "carousel-container" },
        el("div", { className: "carousel-slides" }, ...slides),
        slides.length > 1 &&
          el(
            "button",
            { className: "carousel-btn prev", "aria-label": "Previous" },
            el("i", { className: "fa-solid fa-chevron-left" }),
          ),
        slides.length > 1 &&
          el(
            "button",
            { className: "carousel-btn next", "aria-label": "Next" },
            el("i", { className: "fa-solid fa-chevron-right" }),
          ),
        slides.length > 1 &&
          el("div", { className: "carousel-indicators" }, ...indicators),
      ),
    ),
    el(
      "div",
      { className: "project-info" },
      el("h3", {}, project.title),
      el("p", { className: "project-description", html: project.description }),
      el("div", { className: "project-tags" }, ...tags),
      el("div", { className: "project-links" }, ...links),
    ),
  );
}

function renderDemos(tabsContainer, slidesContainer, demos) {
  tabsContainer.replaceChildren(
    ...demos.map((d, i) =>
      el(
        "button",
        {
          className: `demo-tab${i === 0 ? " active" : ""}`,
          "data-demo": String(i),
        },
        el("i", { className: d.icon }),
        el("span", {}, d.title),
      ),
    ),
  );

  slidesContainer.replaceChildren(
    ...demos.map((d, i) =>
      el(
        "div",
        {
          className: `demo-slide${i === 0 ? " active" : ""}`,
          "data-demo-index": String(i),
        },
        el(
          "div",
          { className: "demo-header" },
          el(
            "div",
            { className: "demo-header-text" },
            el("h3", {}, d.title),
            el("p", {}, d.description),
            d.warning &&
              el(
                "p",
                { className: "demo-warning-text" },
                `(Attention: ${d.warning})`,
              ),
          ),
          el(
            "div",
            { className: "demo-actions" },
            el(
              "button",
              { className: "demo-reload", title: "Reload Demo" },
              el("i", { className: "fa-solid fa-rotate-right" }),
            ),
            el(
              "a",
              {
                href: d.path,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "demo-fullscreen",
                title: "Open in New Tab",
              },
              el("i", { className: "fa-solid fa-up-right-from-square" }),
            ),
          ),
        ),
        el(
          "div",
          { className: "demo-frame-container" },
          el("iframe", {
            "data-src": d.path,
            frameborder: "0",
            allowfullscreen: true,
            className: "demo-iframe",
            title: d.title,
            loading: "lazy",
          }),
          el(
            "div",
            { className: "demo-loading" },
            el("i", { className: "fa-solid fa-spinner fa-spin" }),
            el("p", {}, "Loading demo..."),
          ),
        ),
      ),
    ),
  );
}

// ==========================================
// 4. CAROUSEL
// ==========================================
function initCarousel(card, { autoplayMs = 10_000 } = {}) {
  const slides = [...card.querySelectorAll(".carousel-slide")];
  const indicators = [...card.querySelectorAll(".indicator")];
  if (slides.length <= 1) return;

  let current = 0;
  let timer = null;

  const show = (i) => {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle("active", idx === current));
    indicators.forEach((ind, idx) =>
      ind.classList.toggle("active", idx === current),
    );
  };
  const next = () => show(current + 1);
  const prev = () => show(current - 1);
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(next, autoplayMs);
  };

  card.querySelector(".carousel-btn.next")?.addEventListener("click", () => {
    next();
    restart();
  });
  card.querySelector(".carousel-btn.prev")?.addEventListener("click", () => {
    prev();
    restart();
  });
  indicators.forEach((ind, i) =>
    ind.addEventListener("click", () => {
      show(i);
      restart();
    }),
  );

  const container = card.querySelector(".carousel-container");
  container?.addEventListener("mouseenter", () => clearInterval(timer));
  container?.addEventListener("mouseleave", restart);

  restart();
}

// ==========================================
// 5. DEMOS VIEWER
// ==========================================
function initDemos() {
  const tabs = [...document.querySelectorAll(".demo-tab")];
  const slides = [...document.querySelectorAll(".demo-slide")];
  if (!slides.length) return;

  let current = 0;
  const show = (i) => {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, idx) => s.classList.toggle("active", idx === current));
    tabs.forEach((t, idx) => t.classList.toggle("active", idx === current));
  };

  // Lazy-load: hydrate iframe on first view
  const hydrate = (slide) => {
    const iframe = slide.querySelector(".demo-iframe");
    if (iframe && !iframe.src && iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
    }
  };

  // Hide loading overlay when iframe finishes
  slides.forEach((slide) => {
    const iframe = slide.querySelector(".demo-iframe");
    const loading = slide.querySelector(".demo-loading");
    if (!iframe || !loading) return;
    iframe.addEventListener("load", () => {
      iframe.dataset.loaded = "true";
      loading.style.opacity = "0";
      setTimeout(() => (loading.style.display = "none"), 300);
    });
  });

  tabs.forEach((tab, i) =>
    tab.addEventListener("click", () => {
      show(i);
      hydrate(slides[i]);
    }),
  );

  document.querySelector(".demo-prev")?.addEventListener("click", () => {
    show(current - 1);
    hydrate(slides[current]);
  });
  document.querySelector(".demo-next")?.addEventListener("click", () => {
    show(current + 1);
    hydrate(slides[current]);
  });

  document.querySelectorAll(".demo-reload").forEach((btn) =>
    btn.addEventListener("click", () => {
      const slide = btn.closest(".demo-slide");
      const iframe = slide.querySelector(".demo-iframe");
      const loading = slide.querySelector(".demo-loading");
      if (loading) {
        loading.style.display = "flex";
        loading.style.opacity = "1";
      }
      if (iframe) {
        iframe.dataset.loaded = "false";
        // Re-trigger load by reassigning src
        const src = iframe.src || iframe.dataset.src;
        iframe.src = src;
      }
    }),
  );

  document.addEventListener("keydown", (e) => {
    if (!document.querySelector(".demos-section")) return;
    if (e.key === "ArrowLeft") {
      show(current - 1);
      hydrate(slides[current]);
    } else if (e.key === "ArrowRight") {
      show(current + 1);
      hydrate(slides[current]);
    }
  });

  show(0);
  return { hydrateCurrent: () => hydrate(slides[current]), hydrateAll: () => slides.forEach(hydrate) };
}

// ==========================================
// 6. SKILLS GRAPH (LeaderLine)
// ==========================================
function initSkillsGraph() {
  if (typeof LeaderLine === "undefined") {
    console.warn("LeaderLine not available — skipping skill graph.");
    return;
  }

  const central = document.getElementById("node-fundamentos");
  if (!central) return;

  const satelliteIds = [
    "node-frontend",
    "node-backend",
    "node-db",
    "node-devops",
    "node-cloud",
    "node-ai",
    "node-research",
  ];

  const options = {
    color: "rgba(0, 255, 0, 0.7)",
    size: 3,
    path: "fluid",
    startSocket: "auto",
    endSocket: "auto",
    startPlug: "disc",
    endPlug: "arrow1",
    dash: { animation: true },
    outline: true,
    outlineColor: "rgba(0,0,0,0.8)",
    endPlugOutline: false,
  };

  const lines = satelliteIds
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .map((sat) => new LeaderLine(sat, central, options));

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => lines.forEach((l) => l.position()), 100);
  });
}

// ==========================================
// 7. BOOT
// ==========================================
function lockBodyForMobilePortrait() {
  const mq = window.matchMedia(
    "(max-width: 768px) and (orientation: portrait)",
  );
  const apply = (e) => {
    document.body.style.overflow = e.matches ? "hidden" : "";
  };
  mq.addEventListener("change", apply);
  apply(mq);
}

function hideLoader() {
  document.getElementById("app-loader")?.classList.add("hide");
}

function initTyped() {
  if (typeof Typed === "undefined") return;
  new Typed(".pro-text", {
    strings: [
      "FullStack and Web Development.",
      "Cyber Security and Ethical Hacking.",
      "Machine Learning and AI.",
      "Large Language Models and NLP.",
      "Computer Vision and Data Analysis.",
      "Infrastructure and Servers.",
      "Virtualization and Containers.",
      "Networks and Privacy.",
      "Linux and Windows.",
      "Bots and Web Scraping.",
    ],
    typeSpeed: 65,
    backSpeed: 45,
    backDelay: 2200,
    loop: true,
  });
}

window.addEventListener("load", () => {
  const start = performance.now();

  // Render dynamic content first so query-selectors below find it.
  const projectsContainer = document.querySelector(".projects-container");
  if (projectsContainer && typeof PROJECTS !== "undefined") {
    renderProjects(projectsContainer, PROJECTS);
  }
  const tabsContainer = document.querySelector(".demos-tabs");
  const slidesContainer = document.querySelector(".demo-slides");
  if (tabsContainer && slidesContainer && typeof DEMOS !== "undefined") {
    renderDemos(tabsContainer, slidesContainer, DEMOS);
  }

  // Performance check — decides whether to auto-hydrate demos.
  const perf = PerformanceChecker.evaluate();
  console.log("📊 Device", perf.specs, "Score", perf.score, "/100");

  // Init UI pieces.
  document.querySelectorAll(".project-card").forEach((c) => initCarousel(c));
  const demos = initDemos();

  if (typeof AOS !== "undefined") AOS.init({ duration: 800, once: true });

  initTyped();
  lockBodyForMobilePortrait();
  setTimeout(initSkillsGraph, 1000);

  // Loader / warning flow.
  if (perf.isWeak) {
    console.warn("⚠️ Limited device — gating demos.");
    PerformanceChecker.renderWarning(perf);
    PerformanceChecker.blockDemos();
    document
      .getElementById("enable-demos-btn")
      ?.addEventListener("click", () => {
        PerformanceChecker.unblockDemos();
        PerformanceChecker.hideWarning();
        demos?.hydrateCurrent();
      });
    document
      .getElementById("dismiss-warning-btn")
      ?.addEventListener("click", PerformanceChecker.hideWarning);
  } else {
    demos?.hydrateCurrent();
  }

  // Always hide the loader once setup is done.
  const elapsed = performance.now() - start;
  setTimeout(hideLoader, Math.max(200, 600 - elapsed));
});
