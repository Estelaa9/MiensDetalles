// ==========================================================================
// Miens — main.js
// Flex accordion + animaciones 3D + menú móvil
// ==========================================================================

function initFlexCarousel(wrapper) {
  const cards = Array.from(wrapper.querySelectorAll(".flex-card"));
  if (!cards.length) return;

  function setActive(card) {
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => setActive(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(card);
      }
    });
  });
}

function initHero3DTilt(el) {
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const maxTilt = 8;

  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

function initCard3DTilt(cards) {
  if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const maxTilt = 10;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--ry", `${x * maxTilt}deg`);
      card.style.setProperty("--rx", `${-y * maxTilt}deg`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}

class Carousel {
    constructor(root) {
      this.root = root;
      this.track = root.querySelector(".carousel-track");
      this.slides = Array.from(this.track.children);
      this.prevBtn = root.querySelector(".carousel-arrow.prev");
      this.nextBtn = root.querySelector(".carousel-arrow.next");
      this.dotsWrap = root.querySelector(".carousel-dots");
      this.liveRegion = root.querySelector(".carousel-live");
  
      this.perView = this.getPerView();
      this.index = 0;
      this.autoplayMs = Number(root.dataset.autoplay || 0);
      this.timer = null;
  
      this.buildDots();
      this.bindEvents();
      this.update(true);
  
      if (this.autoplayMs > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        this.startAutoplay();
      }
    }
  
    getPerView() {
      // Card-style carousels show multiple slides; the hero shows one.
      if (!this.root.classList.contains("carousel-cards")) return 1;
      const w = window.innerWidth;
      if (w <= 768) return 1;
      if (w <= 992) return 2;
      return 3;
    }
  
    get maxIndex() {
      return Math.max(0, this.slides.length - this.perView);
    }
  
    buildDots() {
      this.dotsWrap.innerHTML = "";
      const dotCount = Math.max(1, this.slides.length - this.perView + 1);
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Ir a la posición ${i + 1}`);
        dot.addEventListener("click", () => this.goTo(i, true));
        this.dotsWrap.appendChild(dot);
      }
      this.dots = Array.from(this.dotsWrap.children);
    }
  
    bindEvents() {
      this.prevBtn.addEventListener("click", () => this.goTo(this.index - 1, true));
      this.nextBtn.addEventListener("click", () => this.goTo(this.index + 1, true));
  
      this.root.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") this.goTo(this.index - 1, true);
        if (e.key === "ArrowRight") this.goTo(this.index + 1, true);
      });
  
      this.root.addEventListener("mouseenter", () => this.stopAutoplay());
      this.root.addEventListener("mouseleave", () => {
        if (this.autoplayMs > 0) this.startAutoplay();
      });
      this.root.addEventListener("focusin", () => this.stopAutoplay());
      this.root.addEventListener("focusout", () => {
        if (this.autoplayMs > 0) this.startAutoplay();
      });
  
      // Swipe support
      let startX = 0;
      let isDragging = false;
      this.track.addEventListener("pointerdown", (e) => {
        isDragging = true;
        startX = e.clientX;
        this.stopAutoplay();
      });
      window.addEventListener("pointerup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const delta = e.clientX - startX;
        if (Math.abs(delta) > 40) {
          this.goTo(this.index + (delta < 0 ? 1 : -1), true);
        }
        if (this.autoplayMs > 0) this.startAutoplay();
      });
  
      window.addEventListener("resize", () => {
        const newPerView = this.getPerView();
        if (newPerView !== this.perView) {
          this.perView = newPerView;
          this.buildDots();
        }
        this.update(true);
      });
    }
  
    goTo(i, userInitiated) {
      const clamped = Math.max(0, Math.min(i, this.maxIndex));
      this.index = clamped;
      this.update();
      if (userInitiated && this.autoplayMs > 0) {
        this.stopAutoplay();
        this.startAutoplay();
      }
    }
  
    update(skipTransition) {
      const slideWidth = this.slides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(this.track).gap || 0);
      const offset = this.index * (slideWidth + gap);
  
      if (skipTransition) {
        this.track.style.transition = "none";
        requestAnimationFrame(() => {
          this.track.style.transform = `translateX(-${offset}px)`;
          requestAnimationFrame(() => { this.track.style.transition = ""; });
        });
      } else {
        this.track.style.transform = `translateX(-${offset}px)`;
      }
  
      this.dots.forEach((dot, i) => dot.setAttribute("aria-selected", String(i === this.index)));
      this.prevBtn.disabled = this.index === 0;
      this.nextBtn.disabled = this.index === this.maxIndex;
      this.prevBtn.style.opacity = this.prevBtn.disabled ? "0.4" : "1";
      this.nextBtn.style.opacity = this.nextBtn.disabled ? "0.4" : "1";
  
      if (this.liveRegion) {
        const caption = this.slides[this.index]?.querySelector("figcaption, h4")?.textContent;
        this.liveRegion.textContent = caption ? `Mostrando: ${caption}` : `Posición ${this.index + 1}`;
      }
    }
  
    startAutoplay() {
      this.stopAutoplay();
      this.timer = setInterval(() => {
        const next = this.index >= this.maxIndex ? 0 : this.index + 1;
        this.goTo(next, false);
      }, this.autoplayMs);
    }
  
    stopAutoplay() {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
  const flexCarousel = document.getElementById("flexCarousel");
  if (flexCarousel) initFlexCarousel(flexCarousel);

  const hero3d = document.getElementById("hero3d");
  if (hero3d) initHero3DTilt(hero3d);

  initCard3DTilt(Array.from(document.querySelectorAll(".card-3d")));

  document.querySelectorAll(".carousel").forEach((el) => new Carousel(el));
  
    // Mobile nav toggle
    const navToggle = document.getElementById("navToggle");
    const navList = document.getElementById("navList");
    if (navToggle && navList) {
      navToggle.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
      });
      navList.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navList.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  });