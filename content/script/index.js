(function() {
  const _body = document.querySelector("body");
  for (let i = 0; i < 10; i++) {
    const _span = document.createElement("span");
    _span.setAttribute("class", "s");
    _span.setAttribute("id", "s-" + i);
    _body.appendChild(_span);
  }
  const _spans = document.querySelectorAll(".s");
  window.addEventListener("mousemove", (e) => {
    const x = parseFloat(e.clientX);
    const y = parseFloat(e.clientY);
    _spans.forEach((_span) => {
      const cls = _span.getAttribute("id") || "";
      const reg = /s-(\d+)/.exec(cls);
      if (reg) {
        const num = parseFloat(reg[1]);
        setTimeout(() => {
          _span.style.display = "block";
          _span.style.top = y + "px";
          _span.style.left = x + (num + 0) * 1 + "px";
        }, (num + 1) * 50);
      }
    });
  });
})();
