// ==========================================
// DEVICE PERFORMANCE DETECTION SYSTEM
// ==========================================
const PerformanceChecker = {
  specs: {
    cores: navigator.hardwareConcurrency || 2,
    memoryAPI: navigator.deviceMemory, // Pode ser undefined ou limitado
    connection: navigator.connection?.effectiveType || "unknown",
    isMobile:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
    gpu: null,
    performanceScore: 0,
  },

  thresholds: {
    minCores: 2, // Ajustado para ser mais realista
    minPerformanceScore: 30, // Score baseado em múltiplos fatores
  },

  async detectGPU() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
      }
    } catch (e) {
      console.warn("GPU detection failed:", e);
    }
    return "Unknown";
  },

  calculatePerformanceScore() {
    let score = 0;

    // Score por CPU cores (0-40 pontos)
    const cores = this.specs.cores;
    if (cores >= 8) score += 40;
    else if (cores >= 6) score += 35;
    else if (cores >= 4) score += 25;
    else if (cores >= 2) score += 15;
    else score += 5;

    // Score por memória (0-30 pontos)
    // Nota: deviceMemory é limitado e não confiável
    // Se não estiver disponível, assumimos que é desktop decente
    const memory = this.specs.memoryAPI;
    if (memory === undefined || memory >= 8) {
      score += 30; // Sem API ou valor alto = provavelmente bom
    } else if (memory >= 4) {
      score += 20;
    } else if (memory >= 2) {
      score += 10;
    } else {
      score += 5;
    }

    // Penalidade para mobile (-20 pontos)
    if (this.specs.isMobile) {
      score -= 20;
    }

    // Bonus por conexão boa (0-10 pontos)
    const conn = this.specs.connection;
    if (conn === "4g" || conn === "unknown") score += 10;
    else if (conn === "3g") score += 5;

    // Bonus por GPU (0-20 pontos) - será adicionado depois
    const gpu = this.specs.gpu;
    if (gpu && gpu !== "Unknown") {
      // GPUs dedicadas geralmente têm NVIDIA, AMD, ou Intel Iris
      if (/NVIDIA|GeForce|RTX|GTX|AMD|Radeon|RX/i.test(gpu)) {
        score += 20;
      } else if (/Intel.*Iris|Intel.*Xe/i.test(gpu)) {
        score += 15;
      } else if (/Intel/i.test(gpu)) {
        score += 10;
      }
    }

    return Math.max(0, Math.min(100, score));
  },

  async checkPerformance() {
    // Detecta GPU
    this.specs.gpu = await this.detectGPU();

    // Calcula score de performance
    this.specs.performanceScore = this.calculatePerformanceScore();

    const { cores, memoryAPI, performanceScore, isMobile } = this.specs;
    const { minCores, minPerformanceScore } = this.thresholds;

    console.log("📊 Device Specs:", this.specs);
    console.log("🎯 Performance Score:", performanceScore, "/100");

    // Critérios mais inteligentes
    // Fraco se: mobile OU (poucos cores E score baixo)
    const weakDevice =
      performanceScore < minPerformanceScore ||
      (isMobile && cores < 4) ||
      cores < minCores;

    return {
      isWeak: weakDevice,
      specs: this.specs,
      recommendations: this.getRecommendations(weakDevice),
    };
  },

  getRecommendations(isWeak) {
    if (!isWeak) {
      return "Your device has adequate specifications. Enjoy the demos!";
    }
    return "We recommend using a device with better performance for an optimal experience.";
  },

  blockDemos() {
    const demoContent = document.querySelector(".demo-content");
    if (demoContent) {
      demoContent.classList.add("demos-blocked");

      // Remove src dos iframes para não carregar
      const iframes = demoContent.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.dataset.src = iframe.src;
        iframe.removeAttribute("src");
      });
    }
  },

  enableDemos() {
    const demoContent = document.querySelector(".demo-content");
    if (demoContent) {
      demoContent.classList.remove("demos-blocked");

      // Restaura src dos iframes
      const iframes = demoContent.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        if (iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
        }
      });
    }
  },

  showWarning() {
    const warning = document.getElementById("performance-warning");
    if (warning) {
      warning.classList.remove("hidden");

      // Preenche informações do dispositivo
      const cpuInfo = document.getElementById("cpu-cores-info");
      const memInfo = document.getElementById("memory-info");
      const scoreInfo = document.getElementById("score-info");

      if (cpuInfo) {
        cpuInfo.textContent = `CPU: ${this.specs.cores} core${
          this.specs.cores !== 1 ? "s" : ""
        }`;
      }

      if (memInfo) {
        const memAPI = this.specs.memoryAPI;
        let memText = "";
        if (memAPI !== undefined) {
          memText = `RAM: ~${memAPI}GB (limited by API)`;
        } else {
          memText = `RAM: NNot detectable (likely desktop)`;
        }
        memInfo.textContent = memText;
      }

      if (scoreInfo) {
        const score = this.specs.performanceScore;
        const emoji = score >= 60 ? "🟢" : score >= 40 ? "🟡" : "🔴";
        scoreInfo.textContent = `${emoji} Score: ${score}/100`;
      }

      // Adiciona info da GPU se disponível
      if (this.specs.gpu && this.specs.gpu !== "Unknown") {
        const gpuInfo = document.createElement("span");
        gpuInfo.textContent = `GPU: ${this.specs.gpu.substring(0, 40)}...`;
        gpuInfo.className = "gpu-info";
        const specsContainer = document.querySelector(".device-specs");
        if (specsContainer && !specsContainer.querySelector(".gpu-info")) {
          specsContainer.appendChild(gpuInfo);
        }
      }
    }
  },

  hideWarning() {
    const warning = document.getElementById("performance-warning");
    if (warning) {
      warning.classList.add("hidden");
    }
  },

  async init() {
    const result = await this.checkPerformance();

    if (result.isWeak) {
      console.warn("⚠️ Device with limited specifications detected");
      this.showWarning();
      this.blockDemos();

      // Botão para habilitar demos mesmo assim
      const enableBtn = document.getElementById("enable-demos-btn");
      if (enableBtn) {
        enableBtn.addEventListener("click", () => {
          this.enableDemos();
          this.hideWarning();
          console.log("✅ Demos enabled by user");
        });
      }

      // Botão para dismissar warning sem habilitar
      const dismissBtn = document.getElementById("dismiss-warning-btn");
      if (dismissBtn) {
        dismissBtn.addEventListener("click", () => {
          this.hideWarning();
        });
      }
    } else {
      console.log("✅ Device with adequate specifications detected");
      console.log("🎯 Performance Score:", this.specs.performanceScore, "/100");
      this.hideWarning();
    }
    return result;
  },
};

window.addEventListener("load", async function () {
  const loader = document.getElementById("app-loader");
  const forceBtn = document.getElementById("force-enter");
  const statusEl = document.getElementById("loader-status");
  const start = performance.now();
  const perf = await PerformanceChecker.init();
  function hydrateDemos() {
    document.querySelectorAll(".demo-iframe").forEach((f) => {
      if (!f.src && f.dataset.src) f.src = f.dataset.src;
    });
  }
  if (!perf.isWeak) {
    hydrateDemos();
  } else {
    statusEl.textContent = "Slow Connection Detected.";
    forceBtn.hidden = false;
    forceBtn.onclick = () => {
      forceBtn.hidden = true;
      statusEl.textContent = "Loading demos...";
      hydrateDemos();
      setTimeout(() => loader.classList.add("hide"), 500);
    };
  }
  if (!perf.isWeak) {
    setTimeout(
      () => loader.classList.add("hide"),
      Math.max(200, 600 - (performance.now() - start))
    );
  }

  const mediaQuery = window.matchMedia(
    "(max-width: 768px) and (orientation: portrait)"
  );

  function handleOrientationChange(e) {
    if (e.matches) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }

  mediaQuery.addEventListener("change", handleOrientationChange);
  handleOrientationChange(mediaQuery);

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

  AOS.init({
    duration: 800,
    once: true,
  });

  // START OF GRAPH LOGIC

  if (typeof LeaderLine === "undefined") {
    console.error("LeaderLine library not loaded.");
    return;
  }

  // Options for the line style
  const lineOptions = {
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

  const lines = [];
  const satelliteNodes = [
    "node-frontend",
    "node-backend",
    "node-db",
    "node-devops",
    "node-cloud",
  ];
  const centralNode = document.getElementById("node-fundamentos");

  function createLines() {
    lines.forEach((line) => line.remove());
    lines.length = 0;

    // Connect the central node to all satellites
    satelliteNodes.forEach((nodeId) => {
      const satelliteNode = document.getElementById(nodeId);
      if (centralNode && satelliteNode) {
        lines.push(new LeaderLine(satelliteNode, centralNode, lineOptions));
      }
    });
  }

  setTimeout(() => {
    createLines();
  }, 1000);

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      lines.forEach((line) => line.position());
    }, 100);
  });

  // START OF CAROUSEL LOGIC

  function initCarousels() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      const slides = card.querySelectorAll(".carousel-slide");
      const prevBtn = card.querySelector(".carousel-btn.prev");
      const nextBtn = card.querySelector(".carousel-btn.next");
      const indicators = card.querySelectorAll(".indicator");
      let currentSlide = 0;
      let autoPlayInterval;

      // Convert <img> to divs with background-image
      slides.forEach((slide) => {
        if (slide.tagName === "IMG") {
          const imgSrc = slide.src;
          const imgAlt = slide.alt;
          const isActive = slide.classList.contains("active");

          const div = document.createElement("div");
          div.className = "carousel-slide";
          div.style.backgroundImage = `url('${imgSrc}')`;
          div.setAttribute("aria-label", imgAlt);

          if (isActive) {
            div.classList.add("active");
          }

          slide.parentNode.replaceChild(div, slide);
        }
      });

      // Update the reference to slides after conversion
      const updatedSlides = card.querySelectorAll(".carousel-slide");

      function showSlide(index) {
        updatedSlides.forEach((slide) => slide.classList.remove("active"));
        indicators.forEach((indicator) => indicator.classList.remove("active"));

        if (index >= updatedSlides.length) currentSlide = 0;
        if (index < 0) currentSlide = updatedSlides.length - 1;

        updatedSlides[currentSlide].classList.add("active");
        indicators[currentSlide].classList.add("active");
      }

      function nextSlide() {
        currentSlide++;
        if (currentSlide >= updatedSlides.length) currentSlide = 0;
        showSlide(currentSlide);
      }

      function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) currentSlide = updatedSlides.length - 1;
        showSlide(currentSlide);
      }

      function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 10_000);
      }

      function stopAutoPlay() {
        clearInterval(autoPlayInterval);
      }

      nextBtn.addEventListener("click", () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
      });

      prevBtn.addEventListener("click", () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
      });

      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          currentSlide = index;
          showSlide(currentSlide);
          stopAutoPlay();
          startAutoPlay();
        });
      });

      card
        .querySelector(".carousel-container")
        .addEventListener("mouseenter", stopAutoPlay);
      card
        .querySelector(".carousel-container")
        .addEventListener("mouseleave", startAutoPlay);

      // Iniciar autoplay
      startAutoPlay();
    });
  }

  initCarousels();

  // START OF DEMOS LOGIC

  function initDemos() {
    const demoTabs = document.querySelectorAll(".demo-tab");
    const demoSlides = document.querySelectorAll(".demo-slide");
    const prevBtn = document.querySelector(".demo-prev");
    const nextBtn = document.querySelector(".demo-next");
    let currentDemo = 0;

    demoSlides.forEach((slide) => {
      const iframe = slide.querySelector(".demo-iframe");
      const loading = slide.querySelector(".demo-loading");

      if (iframe && loading) {
        const isIframeLoaded =
          iframe.contentDocument || iframe.contentWindow?.document;

        if (isIframeLoaded) {
          try {
            const iframeDoc =
              iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc.readyState === "complete") {
              iframe.dataset.loaded = "true";
              loading.style.opacity = "0";
              loading.style.display = "none";
            } else {
              iframe.dataset.loaded = "false";
            }
          } catch (e) {
            iframe.dataset.loaded = "false";
          }
        } else {
          iframe.dataset.loaded = "false";
        }

        iframe.addEventListener("load", function () {
          iframe.dataset.loaded = "true";

          setTimeout(() => {
            loading.style.opacity = "0";
            setTimeout(() => {
              loading.style.display = "none";
            }, 300);
          }, 500);
        });
      }
    });

    function showDemo(index) {
      demoSlides.forEach((slide) => slide.classList.remove("active"));
      demoTabs.forEach((tab) => tab.classList.remove("active"));

      if (index >= demoSlides.length) currentDemo = 0;
      if (index < 0) currentDemo = demoSlides.length - 1;

      demoSlides[currentDemo].classList.add("active");
      demoTabs[currentDemo].classList.add("active");

      const iframe = demoSlides[currentDemo].querySelector(".demo-iframe");
      const loading = demoSlides[currentDemo].querySelector(".demo-loading");

      if (iframe && loading) {
        if (iframe.dataset.loaded === "true") {
          loading.style.display = "none";
          loading.style.opacity = "0";
        }
      }
    }

    demoTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        currentDemo = index;
        showDemo(currentDemo);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentDemo--;
        if (currentDemo < 0) currentDemo = demoSlides.length - 1;
        showDemo(currentDemo);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentDemo++;
        if (currentDemo >= demoSlides.length) currentDemo = 0;
        showDemo(currentDemo);
      });
    }

    const reloadButtons = document.querySelectorAll(".demo-reload");
    reloadButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const slide = button.closest(".demo-slide");
        const iframe = slide.querySelector(".demo-iframe");
        const loading = slide.querySelector(".demo-loading");

        if (loading) {
          loading.style.display = "flex";
          loading.style.opacity = "1";
        }

        if (iframe) {
          iframe.dataset.loaded = "false";
          iframe.src = iframe.src;
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (document.querySelector(".demos-section")) {
        if (e.key === "ArrowLeft") {
          currentDemo--;
          if (currentDemo < 0) currentDemo = demoSlides.length - 1;
          showDemo(currentDemo);
        } else if (e.key === "ArrowRight") {
          currentDemo++;
          if (currentDemo >= demoSlides.length) currentDemo = 0;
          showDemo(currentDemo);
        }
      }
    });

    if (demoSlides.length > 0) {
      showDemo(0);
    }
  }

  if (document.querySelector(".demos-section")) {
    initDemos();
  }
});
