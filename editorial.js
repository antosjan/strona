const editorialData = window.editorialPortfolioData;

if (!editorialData) {
  throw new Error("Missing editorialPortfolioData in editorial-data.js.");
}

const getById = (id) => document.getElementById(id);
const arrayOrEmpty = (value) => Array.isArray(value) ? value : [];

const setTextContent = (id, value) => {
  const element = getById(id);

  if (element) {
    element.textContent = value || "";
  }
};

const setInnerHtml = (id, value) => {
  const element = getById(id);

  if (element) {
    element.innerHTML = value || "";
  }
};

const renderNavigation = () => {
  const markup = arrayOrEmpty(editorialData.navigation)
    .map(
      (item) => `
        <a
          class="rail-nav-link"
          href="#${item.id}"
          data-section-link="${item.id}"
          aria-label="${item.label}"
        >
          <span class="rail-nav-number">${item.number}</span>
          <span class="rail-nav-short">${item.label.charAt(0)}</span>
          <span class="rail-nav-full">${item.label}</span>
        </a>
      `
    )
    .join("");

  setInnerHtml("rail-nav", markup);
};

const renderHeroTools = () => {
  const markup = arrayOrEmpty(editorialData.hero.tools)
    .map((tool) => `<span>${tool}</span>`)
    .join("");

  setInnerHtml("hero-tools", markup);
};

const renderAboutParagraphs = () => {
  const markup = arrayOrEmpty(editorialData.about.paragraphs)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  setInnerHtml("about-text", markup);
};

const renderEducation = () => {
  const markup = arrayOrEmpty(editorialData.education)
    .map(
      (item) => `
        <article class="education-card">
          <p class="education-label">${item.label}</p>
          <div class="education-row">
            <div>
              <h3>${item.title}</h3>
              <p>${item.subtitle}</p>
            </div>
            <span>${item.meta || ""}</span>
          </div>
        </article>
      `
    )
    .join("");

  setInnerHtml("education-list", markup);
};

const projectMediaMarkup = (variant) => {
  switch (variant) {
    case "medical":
      return `
        <div class="project-mockup project-mockup-medical">
          <div class="mock-window">
            <div class="mock-topbar"></div>
            <div class="mock-sidebar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="mock-content">
              <div class="mock-table-row"></div>
              <div class="mock-table-row"></div>
              <div class="mock-table-row short"></div>
            </div>
          </div>
        </div>
      `;
    case "sports":
      return `
        <div class="project-mockup project-mockup-sports">
          <div class="sports-panel">
            <div class="sports-header"></div>
            <div class="sports-avatars">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="sports-stats">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      `;
    case "multimedia":
      return `
        <div class="project-mockup project-mockup-multimedia">
          <svg viewBox="0 0 500 240" aria-hidden="true">
            <path d="M0,155 C80,40 150,240 250,120 C340,10 410,220 500,95" />
            <path d="M0,170 C80,55 150,255 250,135 C340,25 410,235 500,110" />
            <path d="M0,140 C80,25 150,225 250,105 C340,-5 410,205 500,80" />
          </svg>
        </div>
      `;
    case "flutter":
      return `
        <div class="project-mockup project-mockup-flutter">
          <div class="phone-shell">
            <div class="phone-notch"></div>
            <div class="phone-screen">
              <div class="phone-list-item"></div>
              <div class="phone-list-item"></div>
              <div class="phone-list-item"></div>
              <div class="phone-list-item small"></div>
            </div>
          </div>
        </div>
      `;
    default:
      return `<div class="project-mockup"></div>`;
  }
};

const renderProjects = () => {
  const markup = arrayOrEmpty(editorialData.projectCards)
    .map(
      (project, index) => `
        <article class="project-card-editorial">
          ${projectMediaMarkup(project.variant)}
          <div class="project-heading">
            <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
            <h3>${project.title}</h3>
          </div>
          <p>${project.description}</p>
          <div class="project-stack">
            ${arrayOrEmpty(project.stack).map((item) => `<span>${item}</span>`).join("")}
          </div>
          <span class="project-arrow">&#8594;</span>
        </article>
      `
    )
    .join("");

  setInnerHtml("project-grid", markup);
};

const renderImageCards = (targetId, cards, cardClass) => {
  const markup = arrayOrEmpty(cards)
    .map((card) => {
      const styleRules = [];

      if (card.imagePosition) {
        styleRules.push(`--card-object-position:${card.imagePosition}`);
      }

      if (card.imageFit) {
        styleRules.push(`--card-object-fit:${card.imageFit}`);
      }

      if (card.hoverImagePosition) {
        styleRules.push(`--card-object-position-hover:${card.hoverImagePosition}`);
      }

      if (card.hoverImageFit) {
        styleRules.push(`--card-object-fit-hover:${card.hoverImageFit}`);
      }

      return `
        <article class="${cardClass}"${styleRules.length ? ` style="${styleRules.join(";")};"` : ""}>
          <div class="${cardClass}-image">
            <img src="${card.image}" alt="${card.title}">
          </div>
          <h3>${card.title}</h3>
          ${card.subtitle ? `<p>${card.subtitle}</p>` : ""}
        </article>
      `
    })
    .join("");

  setInnerHtml(targetId, markup);
};

const renderLinks = () => {
  const personal = editorialData.personal;
  const githubLink = getById("github-link");
  const linkedinLink = getById("linkedin-link");
  const mailLink = getById("mail-link");
  const contactEmail = getById("contact-email");
  const contactPhone = getById("contact-phone");
  const contactLinkedin = getById("contact-linkedin");
  const contactGithub = getById("contact-github");
  const heroCvLink = getById("hero-cv-link");
  const contactCv = getById("contact-cv");
  const configureCvLink = (link) => {
    if (!link) {
      return;
    }

    if (personal.cvFile) {
      link.href = personal.cvFile;
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
      link.setAttribute("download", "");
    } else {
      link.href = "#contact";
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.removeAttribute("download");
    }
  };

  if (githubLink) {
    githubLink.href = personal.github;
  }

  if (linkedinLink) {
    linkedinLink.href = personal.linkedin;
  }

  if (mailLink) {
    mailLink.href = `mailto:${personal.email}`;
  }

  if (contactEmail) {
    contactEmail.href = `mailto:${personal.email}`;
    contactEmail.textContent = personal.email;
  }

  if (contactPhone) {
    contactPhone.href = `tel:${personal.phone.replace(/\s+/g, "")}`;
    contactPhone.textContent = personal.phone;
  }

  if (contactLinkedin) {
    contactLinkedin.href = personal.linkedin;
  }

  if (contactGithub) {
    contactGithub.href = personal.github;
  }

  configureCvLink(heroCvLink);
  configureCvLink(contactCv);
};

const renderImages = () => {
  const heroPhoto = getById("hero-photo");
  const aboutSideImage = getById("about-side-image");
  const contactImage = getById("contact-image");

  if (heroPhoto) {
    heroPhoto.src = editorialData.personal.heroPhoto;
    heroPhoto.alt = editorialData.personal.name;
  }

  if (aboutSideImage) {
    aboutSideImage.src = editorialData.personal.sideArchitecture;
    aboutSideImage.alt = "Selected architecture view";
  }

  if (contactImage) {
    contactImage.src = editorialData.personal.contactImage;
    contactImage.alt = "Selected architectural detail";
  }
};

const initRailInteraction = () => {
  const shell = document.querySelector(".editorial-shell");
  const rail = document.querySelector(".side-rail");

  if (!shell || !rail) {
    return;
  }

  const expand = () => shell.classList.add("is-rail-expanded");
  const collapse = () => shell.classList.remove("is-rail-expanded");

  rail.addEventListener("mouseenter", expand);
  rail.addEventListener("mouseleave", collapse);
  rail.addEventListener("focusin", expand);
  rail.addEventListener("focusout", (event) => {
    if (!rail.contains(event.relatedTarget)) {
      collapse();
    }
  });
};

const initActiveNavigation = () => {
  const sectionIds = arrayOrEmpty(editorialData.navigation).map((item) => item.id);
  const linkMap = new Map(
    [...document.querySelectorAll("[data-section-link]")].map((link) => [
      link.getAttribute("data-section-link"),
      link
    ])
  );

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const activeId = visible.target.id;

      linkMap.forEach((link, id) => {
        link.classList.toggle("is-active", id === activeId);
      });
    },
    {
      rootMargin: "-25% 0px -45% 0px",
      threshold: [0.15, 0.3, 0.45, 0.6]
    }
  );

  sections.forEach((section) => observer.observe(section));
};

const initEditorialPage = () => {
  document.title = editorialData.site.title;

  setTextContent("rail-logo", editorialData.personal.shortMark);
  setTextContent("hero-name", editorialData.personal.name);
  setTextContent("hero-role", editorialData.personal.role);
  setTextContent("hero-intro", editorialData.personal.intro);
  setTextContent("hero-statement", editorialData.hero.statement);
  setTextContent("signature", editorialData.about.signature);
  setTextContent("footer-mark", editorialData.personal.shortMark);
  setTextContent("contact-location", editorialData.personal.location);

  renderNavigation();
  renderHeroTools();
  renderAboutParagraphs();
  renderEducation();
  renderProjects();
  renderImageCards("design-grid", editorialData.designCards, "design-card-editorial");
  renderImageCards("photo-grid", editorialData.photographyCards, "photo-card-editorial");
  renderLinks();
  renderImages();
  initRailInteraction();
  initActiveNavigation();
};

initEditorialPage();
