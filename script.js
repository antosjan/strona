const data = window.portfolioData;

if (!data) {
  throw new Error("Missing portfolioData in content.js.");
}

const byId = (id) => document.getElementById(id);
const safeArray = (value) => Array.isArray(value) ? value : [];

const setText = (id, value) => {
  const element = byId(id);

  if (element) {
    element.textContent = value || "";
  }
};

const setHtml = (id, value) => {
  const element = byId(id);

  if (element) {
    element.innerHTML = value || "";
  }
};

const shortUrl = (value) =>
  value
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

const initialsFromName = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

const renderCvLinks = () => {
  const links = document.querySelectorAll("[data-cv-link]");
  const hasCv = Boolean(data.personal.cvFile);

  links.forEach((link) => {
    link.hidden = !hasCv;
    link.classList.toggle("is-hidden", !hasCv);

    if (hasCv) {
      link.href = data.personal.cvFile;
      link.setAttribute("download", "");
    } else {
      link.removeAttribute("href");
      link.removeAttribute("download");
    }
  });
};

const renderHeroPhoto = () => {
  const image = byId("hero-photo");

  if (!image) {
    return;
  }

  if (data.personal.photo) {
    image.src = data.personal.photo;
    image.alt = data.personal.name;
    return;
  }

  image.remove();

  const fallback = document.createElement("div");
  fallback.className = "hero-photo-fallback";
  fallback.textContent = initialsFromName(data.personal.name);
  document.querySelector(".hero-portrait")?.appendChild(fallback);
};

const renderFactGrid = () => {
  const markup = safeArray(data.about.facts)
    .map(
      (fact) => `
        <article class="fact-card">
          <span>${fact.label}</span>
          <strong>${fact.value}</strong>
        </article>
      `
    )
    .join("");

  setHtml("fact-grid", markup);
};

const renderTraits = () => {
  const markup = safeArray(data.about.traits)
    .map((trait) => `<span class="trait-chip">${trait}</span>`)
    .join("");

  setHtml("trait-row", markup);
};

const renderProjects = () => {
  const renderWorkCard = (project, variant) => {
      const tags = safeArray(project.stack)
        .map((item) => `<span class="stack-chip">${item}</span>`)
        .join("");

      return `
        <article class="${variant}-work-card">
          <div class="${variant}-work-media work-media">
            <img src="${project.image}" alt="${project.title}">
          </div>

          <div class="${variant}-work-copy work-copy">
            <div class="work-meta">
              <span>${project.category}</span>
              <span>${project.year}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="stack-row">${tags}</div>
          </div>
        </article>
      `;
  };

  const works = safeArray(data.projects);
  const featuredWork = works.find((project) => project.format === "featured");
  const brandingWorks = works.filter((project) => project.format === "brand");
  const photoWorks = works.filter((project) => project.format === "photo");

  setText("works-title", data.worksSection?.title || "");
  setText("works-intro", data.worksSection?.intro || "");
  setText("works-row-copy", data.worksSection?.photographyIntro || "");
  setHtml("featured-work", featuredWork ? renderWorkCard(featuredWork, "featured") : "");
  setHtml(
    "branding-work-list",
    brandingWorks.map((project) => renderWorkCard(project, "brand")).join("")
  );
  setHtml(
    "photo-work-list",
    photoWorks.map((project) => renderWorkCard(project, "photo")).join("")
  );
};

const renderEntries = (targetId, items) => {
  const markup = safeArray(items)
    .map((item) => {
      const pointsMarkup = safeArray(item.points).length
        ? `
          <ul class="entry-points">
            ${safeArray(item.points).map((point) => `<li>${point}</li>`).join("")}
          </ul>
        `
        : "";

      return `
        <article class="entry-card">
          <p class="entry-topline">${item.period || ""}</p>
          <h3>${item.title}</h3>
          <p class="entry-subtitle">${item.subtitle || ""}</p>
          <p class="entry-description">${item.description || ""}</p>
          ${pointsMarkup}
        </article>
      `;
    })
    .join("");

  setHtml(targetId, markup);
};

const renderSkills = () => {
  const markup = safeArray(data.skills)
    .map(
      (group) => `
        <article class="skill-card">
          <h3>${group.group}</h3>
          <div class="stack-row">
            ${safeArray(group.items).map((item) => `<span class="stack-chip">${item}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");

  setHtml("skill-groups", markup);
};

const renderChipList = (targetId, items) => {
  const markup = safeArray(items)
    .map((item) => `<span class="info-chip">${item}</span>`)
    .join("");

  setHtml(targetId, markup);
};

const renderContactActions = () => {
  const actions = [];

  if (data.personal.email) {
    actions.push(
      `<a class="contact-button contact-button-strong" href="mailto:${data.personal.email}">Email me</a>`
    );
  }

  if (data.personal.linkedin) {
    actions.push(
      `<a class="contact-button" href="${data.personal.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>`
    );
  }

  if (data.personal.github) {
    actions.push(
      `<a class="contact-button" href="${data.personal.github}" target="_blank" rel="noreferrer">GitHub</a>`
    );
  }

  if (data.personal.website) {
    actions.push(
      `<a class="contact-button" href="${data.personal.website}" target="_blank" rel="noreferrer">${shortUrl(data.personal.website)}</a>`
    );
  }

  if (data.personal.cvFile) {
    actions.push(
      `<a class="contact-button" href="${data.personal.cvFile}" download>Download CV</a>`
    );
  }

  setHtml("contact-actions", actions.join(""));
};

const initReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
};

const initContent = () => {
  document.title = data.site.title;

  setText("brand-link", data.personal.name);
  setText("hero-meta-left", data.hero.metaLeft);
  setText("hero-meta-right", data.hero.metaRight);
  setText("hero-note-primary", data.hero.notePrimary);
  setText("hero-note-secondary", data.hero.noteSecondary);
  setText("hero-marquee", data.hero.marquee);
  setText("hero-name", data.personal.name);
  setText("hero-role", data.personal.role);
  setText("scroll-cta", data.hero.scrollLabel);
  setText("about-headline", data.about.headline);
  setText("about-body", data.about.body);
  setText("contact-title", data.contact.title);
  setText("contact-text", data.contact.text);
  setText("footer-name", data.personal.name);
  setText("footer-note", data.site.footerNote);

  renderCvLinks();
  renderHeroPhoto();
  renderFactGrid();
  renderTraits();
  renderProjects();
  renderEntries("experience-list", data.experience);
  renderEntries("education-list", data.education);
  renderSkills();
  renderChipList("language-list", data.languages);
  renderChipList("interest-list", data.interests);
  renderContactActions();
};

initContent();
initReveal();
