(() => {
  const el = document.getElementById("type");
  if (!el) return;

  const text = el.dataset.text || "";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    el.textContent = text;
    return;
  }

  const base = 12;      
  const pauseSpace = 120;
  const pausePunct = 220;
  const punct = new Set([",", ".", "!", "?", ":", ";"]);

  let i = 0;
  function typeNext() {
    if (i > text.length) {
      document.querySelectorAll(".spline-corner, .cmd-deck, .links")
        .forEach(el => el.classList.add("show-after-typing"));
      return;
    }
    el.textContent = text.slice(0, i);
    const ch = text[i - 1] || "";
    let delay = base;
    if (ch === " ") delay += pauseSpace;
    if (punct.has(ch)) delay += pausePunct;
    i++;
    setTimeout(typeNext, delay);
  }

  setTimeout(typeNext, 250);
})();
