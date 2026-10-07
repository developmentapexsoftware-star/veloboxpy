(() => {
  document.documentElement.classList.add("js");

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute(
        "aria-label",
        open ? "Abrir menú" : "Cerrar menú",
      );
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        nav.classList.remove("is-open");
      });
    });
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        menuButton.getAttribute("aria-expanded") === "true"
      ) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        nav.classList.remove("is-open");
        menuButton.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (
        menuButton.getAttribute("aria-expanded") === "true" &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        nav.classList.remove("is-open");
      }
    });
    window.addEventListener(
      "resize",
      () => {
        if (
          window.innerWidth > 1180 &&
          menuButton.getAttribute("aria-expanded") === "true"
        ) {
          menuButton.setAttribute("aria-expanded", "false");
          menuButton.setAttribute("aria-label", "Abrir menú");
          nav.classList.remove("is-open");
        }
      },
      { passive: true },
    );
  }

  const weightInput = document.querySelector("#weight");
  const estimate = document.querySelector("#estimate");
  const quoteLink = document.querySelector("#quote-link");
  const waNumber = "595971390000";
  const formatter = new Intl.NumberFormat("es-PY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function updateQuote() {
    if (!weightInput || !estimate || !quoteLink) return;
    const rawWeight = Number.parseFloat(weightInput.value);
    const weight = Number.isFinite(rawWeight)
      ? Math.min(1000, Math.max(0.1, rawWeight))
      : 0.1;
    if (Number.isFinite(rawWeight) && rawWeight !== weight)
      weightInput.value = String(weight);
    const total = weight * 24;
    const text = `Hola VeloBox, quiero confirmar un flete estimado de ${formatter.format(weight)} kg (USD ${formatter.format(total)}). ¿Me ayudan con mi compra?`;
    estimate.textContent = `USD ${formatter.format(total)}`;
    quoteLink.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  }

  weightInput?.addEventListener("input", updateQuote);
  weightInput?.addEventListener("change", updateQuote);
  updateQuote();

  const trackingInput = document.querySelector("#tracking-number");
  const trackingLink = document.querySelector("#tracking-link");
  function updateTrackingLink() {
    if (!trackingLink) return;
    const guide = (trackingInput?.value ?? "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 120);
    const message = guide
      ? `Hola VeloBox, quiero consultar el estado de mi envío. Mi número de guía es ${guide}.`
      : "Hola VeloBox, quiero consultar el estado de mi envío. Todavía no tengo el número de guía.";
    trackingLink.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  }
  trackingInput?.addEventListener("input", updateTrackingLink);
  updateTrackingLink();

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();

(() => {
  const header = document.querySelector(".site-header");
  if (header)
    window.addEventListener(
      "scroll",
      () => header.classList.toggle("is-stuck", window.scrollY > 10),
      { passive: true },
    );
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((e) => e.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  items.forEach((e, i) => {
    e.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(e);
  });
})();
(() => {
  const st = document.querySelector(".spot__stage"),
    im = document.querySelector("#spot-img");
  if (
    !st ||
    !im ||
    matchMedia("(hover:none)").matches ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  st.addEventListener("mousemove", (e) => {
    const r = st.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    im.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.05)`;
  });
  st.addEventListener("mouseleave", () => {
    im.style.transform = "";
  });
})();
