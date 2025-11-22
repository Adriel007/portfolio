window.addEventListener("load", function () {
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

  // --- INÍCIO DA LÓGICA DO GRAFO ---

  if (typeof LeaderLine === "undefined") {
    console.error("LeaderLine library not loaded.");
    return;
  }

  // Opções de estilo para a linha
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

    // Conecta o nó central a todos os satélites
    satelliteNodes.forEach((nodeId) => {
      const satelliteNode = document.getElementById(nodeId);
      if (centralNode && satelliteNode) {
        lines.push(new LeaderLine(satelliteNode, centralNode, lineOptions));
      }
    });
  }

  // Espera as animações do AOS terminarem para desenhar as linhas
  // Isso evita que as linhas sejam desenhadas na posição errada
  setTimeout(() => {
    createLines();
  }, 1000); // 1s de delay, pode ajustar se necessário

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      lines.forEach((line) => line.position());
    }, 100);
  });

  // --- FIM DA LÓGICA DO GRAFO ---

  // --- INÍCIO DA LÓGICA DO CAROUSEL ---

  function initCarousels() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      const slides = card.querySelectorAll(".carousel-slide");
      const prevBtn = card.querySelector(".carousel-btn.prev");
      const nextBtn = card.querySelector(".carousel-btn.next");
      const indicators = card.querySelectorAll(".indicator");
      let currentSlide = 0;
      let autoPlayInterval;

      // Converter <img> em divs com background-image
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

      // Atualizar a referência dos slides após a conversão
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
        autoPlayInterval = setInterval(nextSlide, 4000);
      }

      function stopAutoPlay() {
        clearInterval(autoPlayInterval);
      }

      // Event listeners
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

      // Pausar autoplay quando o mouse está sobre o carousel
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

  // Inicializar carousels após o carregamento
  initCarousels();

  // --- FIM DA LÓGICA DO CAROUSEL ---

  // --- INÍCIO DA LÓGICA DOS DEMOS ---

  function initDemos() {
    const demoTabs = document.querySelectorAll(".demo-tab");
    const demoSlides = document.querySelectorAll(".demo-slide");
    const prevBtn = document.querySelector(".demo-prev");
    const nextBtn = document.querySelector(".demo-next");
    let currentDemo = 0;

    // Configurar event listeners de load para cada iframe apenas uma vez
    demoSlides.forEach((slide) => {
      const iframe = slide.querySelector(".demo-iframe");
      const loading = slide.querySelector(".demo-loading");

      if (iframe && loading) {
        // Verificar se o iframe já está carregado (caso tenha carregado antes do script)
        const isIframeLoaded =
          iframe.contentDocument || iframe.contentWindow?.document;

        if (isIframeLoaded) {
          try {
            // Se conseguimos acessar o documento, significa que está carregado
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
            // Cross-origin, não conseguimos verificar, assumir não carregado
            iframe.dataset.loaded = "false";
          }
        } else {
          iframe.dataset.loaded = "false";
        }

        iframe.addEventListener("load", function () {
          // Marcar iframe como carregado
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
      // Atualizar slides
      demoSlides.forEach((slide) => slide.classList.remove("active"));
      demoTabs.forEach((tab) => tab.classList.remove("active"));

      if (index >= demoSlides.length) currentDemo = 0;
      if (index < 0) currentDemo = demoSlides.length - 1;

      demoSlides[currentDemo].classList.add("active");
      demoTabs[currentDemo].classList.add("active");

      // Verificar se o iframe já foi carregado
      const iframe = demoSlides[currentDemo].querySelector(".demo-iframe");
      const loading = demoSlides[currentDemo].querySelector(".demo-loading");

      if (iframe && loading) {
        // Se o iframe já foi carregado anteriormente, esconder loading imediatamente
        if (iframe.dataset.loaded === "true") {
          loading.style.display = "none";
          loading.style.opacity = "0";
        }
      }
    }

    // Event listeners para tabs
    demoTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        currentDemo = index;
        showDemo(currentDemo);
      });
    });

    // Event listeners para botões de navegação
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

    // Botões de reload
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
          // Marcar como não carregado para reexibir o loading
          iframe.dataset.loaded = "false";
          iframe.src = iframe.src;
        }
      });
    });

    // Suporte para teclado
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

    // Inicializar primeiro demo
    if (demoSlides.length > 0) {
      showDemo(0);
    }
  }

  // Inicializar demos se a seção existir
  if (document.querySelector(".demos-section")) {
    initDemos();
  }

  // --- FIM DA LÓGICA DOS DEMOS ---
});
