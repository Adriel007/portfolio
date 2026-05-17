// Single source of truth for projects and demos.
// Render functions in init.js consume these arrays.

const PROJECTS = [
  {
    title: "Matrioska — Multi-Agent LLM Orchestrator",
    description:
      "Contract-first, state-graph LLM orchestrator for code generation. " +
      "Decomposes complex coding tasks into a DAG of cooperating agents through a three-phase pipeline " +
      "(Architecture → Generation → Verification), combining Tree-of-Thoughts planning, AlphaCodium-style " +
      "DAG-layered parallel generation, blind test design and ACI repair, plus a Docker sandbox for safe execution. " +
      "Typed shared-state contracts and verbal-reflection memory minimize hallucination across runs.",
    tags: [
      "Python",
      "LLM Orchestration",
      "Multi-Agent",
      "DSPy",
      "ChromaDB",
      "Docker",
    ],
    images: [
      "matrioska/banner.jpeg",
      "matrioska/print-1.png",
      "matrioska/print-2.png",
      "matrioska/print-3.png",
    ],
    links: [
      { href: "https://github.com/adriel007/matrioska", icon: "bx bxl-github", label: "View Code" },
      {
        href: "https://colab.research.google.com/drive/1Vq3b7Xu5z2Un0n3_6_dQVYWQrX4fsK0j",
        icon: "fa-solid fa-arrow-up-right-from-square",
        label: "Google Colab Demo",
        className: "project-link-demo",
      },
    ],
  },
  {
    title: "Cognito — KV Cache Paging for Long-Context LLMs",
    description:
      "Thesis project: an application-level KV cache management system that enables long-context inference on commodity GPUs " +
      "without custom CUDA. Combines chunked prefill (Sarathi-Serve) with a RAG-aware pager that evicts segments by retrieval " +
      "relevance. Reaches 100% exact match on 4k/8k needle-in-haystack tests and outperforms the H2O baseline by 20–33 points " +
      "(statistically significant) while running Mistral-7B-Instruct (NF4) on a single NVIDIA T4.",
    tags: [
      "Python",
      "Long Context",
      "LLM Inference",
      "RAG",
      "ChromaDB",
      "Research",
    ],
    images: [
      { src: "https://opengraph.githubassets.com/1/adriel007/cognito", external: true },
    ],
    links: [
      { href: "https://github.com/adriel007/cognito", icon: "bx bxl-github", label: "View Code" },
    ],
  },
  {
    title: "TernaryBoost — 1.58-bit LLM Quantization",
    description:
      "Post-training quantization pipeline that compresses HuggingFace language models to 1.58-bit ternary representation. " +
      "Three stages — PT-BitNet ternarization, LoRA knowledge distillation, INT2 packed export — achieve ~12.4× disk reduction " +
      "(Phi-2: 5.6 GB → ~450 MB) with PPL degradation of only 1.22× on WikiText-2. Full pipeline runs end-to-end on a Colab T4 " +
      "in ~47 minutes. Ships with `tchat`, an interactive CLI with multi-model registry and thinking mode.",
    tags: [
      "Python",
      "PyTorch",
      "Quantization",
      "BitNet",
      "GPTQ",
      "LoRA",
    ],
    images: [
      { src: "https://opengraph.githubassets.com/1/adriel007/ternary-boost", external: true },
    ],
    links: [
      { href: "https://github.com/adriel007/ternary-boost", icon: "bx bxl-github", label: "View Code" },
    ],
  },
  {
    title: "Cyber Lab — Dockerized Pentest Environment",
    description:
      "Python tool that automates the deployment and management of a local pentesting lab using Docker. " +
      "Spawns an isolated internal network (`pentest_net`) with eight pre-configured vulnerable targets " +
      "(DVWA, Juice Shop, Metasploitable2, Kali Linux, and more), no internet access by default, and an interactive menu " +
      "to start, stop and inspect containers. Built for security study, attack simulation, and tool experimentation in a safe sandbox.",
    tags: [
      "Python",
      "Docker",
      "Cybersecurity",
      "Penetration Testing",
      "Infrastructure",
    ],
    images: [
      "cyber-lab/banner.png",
      "cyber-lab/print-1.png",
      "cyber-lab/print-2.png",
    ],
    links: [
      { href: "https://github.com/adriel007/cyber-lab", icon: "bx bxl-github", label: "View Code" },
    ],
  },
  {
    title: "Self Custody View — Privacy-First Crypto Tracker",
    description:
      "Lightweight Electron desktop app to monitor cryptocurrency wallets across 13+ blockchains " +
      "(Bitcoin, Ethereum, Solana, Monero, Cardano, and more) using only public addresses. " +
      "View-only by design: private keys and seed phrases are never requested or stored. " +
      "All user data — custom wallet names, fiat preferences (USD, BRL, EUR, GBP) — stays in a local <code>data.json</code>. " +
      "Includes portfolio analytics, live price conversion and a Portuguese / English / Russian UI.",
    tags: [
      "Electron",
      "JavaScript",
      "Privacy",
      "Multi-Blockchain",
      "View-Only",
    ],
    images: [
      "self-custody-view/banner.jpeg",
      "self-custody-view/print-1.png",
      "self-custody-view/print-2.png",
    ],
    links: [
      { href: "https://github.com/adriel007/self-custody-view", icon: "bx bxl-github", label: "View Code" },
    ],
  },
  {
    title: "FORTECode — VSCode Obfuscation Plugin",
    description:
      "Visual Studio Code extension developed as a FATEF scientific research project. " +
      "Protects intellectual property of web software by minifying and obfuscating JavaScript, CSS and HTML. " +
      "Combines Terser, javascript-obfuscator, clean-css and html-minifier-terser with configurable obfuscation levels " +
      "(variable renaming, string centralization, dead code injection, control-flow flattening) directly inside the editor.",
    tags: [
      "TypeScript",
      "VSCode API",
      "Obfuscation",
      "Tooling",
      "Research",
    ],
    images: [
      { src: "https://opengraph.githubassets.com/1/adriel007/FORTECode-plugin", external: true },
    ],
    links: [
      { href: "https://github.com/adriel007/FORTECode-plugin", icon: "bx bxl-github", label: "View Code" },
    ],
  },
];

const DEMOS = [
  {
    title: "Markov Chain (NLP)",
    description: "A simple demo of a Markov Chain for text generation.",
    icon: "fa-solid fa-align-left",
    path: "assets/demos/markov-chain/index.html",
  },
  {
    title: "MNIST Neural Network",
    description: "An interactive demo of a neural network trained on the MNIST dataset.",
    icon: "fa-solid fa-brain",
    path: "assets/demos/mnist/index.html",
  },
  {
    title: "A* Pathfinding Game",
    description: "An interactive demo game of the A* pathfinding algorithm.",
    icon: "fa-solid fa-route",
    path: "assets/demos/a-star/index.html",
  },
  {
    title: "Cell Automata Simulation",
    description: "An interactive demo of a cellular automata simulation.",
    icon: "fa-solid fa-bacterium",
    path: "assets/demos/automata-cell/index.html",
  },
  {
    title: "Fardo-Mini (SLM)",
    description: "An interactive demo of a small language model.",
    icon: "fa-solid fa-robot",
    path: "assets/demos/llm/index.html",
    warning:
      "GitHub Pages limits the model's download speed. Running the demo locally is faster.",
  },
  {
    title: "Hack Lab (Edu)",
    description: "An interactive demo of an educational hacking lab.",
    icon: "fa-solid fa-microscope",
    path: "assets/demos/hack_lab/index.html",
  },
];
