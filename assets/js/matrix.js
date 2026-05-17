// Matrix-style raining characters background.
// Resizes with the viewport and pauses when the tab isn't visible.

(() => {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const FONT_SIZE = 14;
  const CHARS = "0123456789ABCDEF".split("");

  let width = 0;
  let height = 0;
  let columns = 0;
  let yPositions = [];
  let rafId = null;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    // Match device pixel ratio for crisp text on HiDPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columns = Math.floor(width / FONT_SIZE);
    yPositions = Array.from({ length: columns }, () => Math.random() * height);
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "green";
    ctx.font = `${FONT_SIZE}px monospace`;

    for (let i = 0; i < columns; i++) {
      const char = CHARS[(Math.random() * CHARS.length) | 0];
      ctx.fillText(char, i * FONT_SIZE, yPositions[i]);
      yPositions[i] += FONT_SIZE;
      if (yPositions[i] > height && Math.random() > 0.98) {
        yPositions[i] = 0;
      }
    }
  }

  function loop() {
    rafId = requestAnimationFrame(loop);
    draw();
  }

  function start() {
    if (rafId == null) loop();
  }

  function stop() {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  resize();
  start();
})();
