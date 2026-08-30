document.documentElement.classList.add("js-reveal");

document.addEventListener("DOMContentLoaded", () => {
  /* Particles background */
  particlesJS.load("particles-js", "assets/js/particles.json");

  /* Scroll-in reveal for timeline items and project cards */
  const revealTargets = document.querySelectorAll(".timeline-item, .project-card");

  if (revealTargets.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* Work timeline interaction */
  const timelineItems = document.querySelectorAll(".timeline-item");
  const workDetails = document.querySelectorAll(".work-detail");

  if (timelineItems.length && workDetails.length) {
    timelineItems.forEach((item) => {
      item.setAttribute(
        "aria-selected",
        item.classList.contains("is-active") ? "true" : "false"
      );

      item.addEventListener("click", () => {
        const targetId = item.dataset.role;

        timelineItems.forEach((i) => {
          i.classList.remove("is-active");
          i.setAttribute("aria-selected", "false");
        });

        item.classList.add("is-active");
        item.setAttribute("aria-selected", "true");

        workDetails.forEach((detail) => {
          detail.classList.toggle("is-visible", detail.id === targetId);
        });
      });

      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.click();
        }
      });
    });
  }

    // Highlight active section in nav (scroll position based)
    const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
    const sections = Array.from(document.querySelectorAll("section[id]"));

    function setActiveNav() {
    const header = document.querySelector("header");
    const headerH = header ? header.offsetHeight : 0;

    const hero = document.getElementById("particles-js");
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;

    // Clear active while in hero
    if (window.scrollY + headerH < heroBottom - 40) {
      navLinks.forEach((a) => a.classList.remove("active"));
      return;
    }

    // activation line at mid-screen
    const y = window.scrollY + headerH + window.innerHeight * 0.5;

    let currentId = sections[0]?.id;
    for (const s of sections) {
      if (s.offsetTop <= y) currentId = s.id;
    }

    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
    });
  }

    window.addEventListener("scroll", setActiveNav, { passive: true });
    window.addEventListener("resize", setActiveNav);
    setActiveNav();

  /* Project filtering */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        projectCards.forEach((card) => {
          const category = card.dataset.category;
          card.style.display =
            filter === "all" || category === filter ? "flex" : "none";
        });
      });
    });
  }
});
