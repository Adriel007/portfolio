import {
  pipeline,
  env,
} from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2";

env.allowLocalModels = false;
env.useBrowserCache = true;

let generator = null;

async function ensureModel() {
  if (generator) return generator;
  postMessage({ type: "status", status: "downloading" });
  generator = await pipeline(
    "text2text-generation",
    "Xenova/LaMini-Flan-T5-248M",
    {
      progress_callback: (data) => {
        postMessage({ type: "progress", data });
      },
    }
  );
  postMessage({ type: "status", status: "ready" });
  return generator;
}

self.onmessage = async (e) => {
  const { type, payload } = e.data || {};
  try {
    if (type === "init") {
      await ensureModel();
      return;
    }
    if (type === "generate") {
      const { text, options } = payload;
      await ensureModel();
      postMessage({ type: "status", status: "generating" });
      const output = await generator(text, {
        max_new_tokens: 150,
        temperature: 0.6,
        repetition_penalty: 1.2,
        do_sample: true,
        ...(options || {}),
      });
      const response = output[0]?.generated_text ?? "";
      postMessage({ type: "result", text: response });
      postMessage({ type: "status", status: "idle" });
    }
  } catch (err) {
    postMessage({
      type: "error",
      error: String(err && err.message ? err.message : err),
    });
  }
};
