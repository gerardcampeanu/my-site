const people = {
  victor: {
    label: "Victor's website",
    title: "Victor",
    summary:
      "A personal page for Victor. This can become a profile, project site, family hub, or anything else you want to publish.",
    detailsTitle: "Victor's place",
    detailsCopy:
      "The first version is connected and ready. Next we can add photos, contact details, projects, or a longer story."
  },
  gerard: {
    label: "Gerard's website",
    title: "Gerard",
    summary:
      "A personal page for Gerard, ready to live on its own subdomain and grow into a small website.",
    detailsTitle: "Gerard's place",
    detailsCopy:
      "This page can later become a portfolio, school page, hobby site, or anything Gerard wants to share."
  },
  tomas: {
    label: "Tomas's website",
    title: "Tomas",
    summary:
      "A personal page for Tomas, prepared for a future subdomain and simple updates.",
    detailsTitle: "Tomas's place",
    detailsCopy:
      "This simple start keeps the site fast and flexible while leaving room for photos, projects, and favorite things."
  }
};

function currentPerson() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("site")?.toLowerCase();
  const hostPart = window.location.hostname.split(".")[0]?.toLowerCase();

  if (people[requested]) {
    return requested;
  }

  if (people[hostPart]) {
    return hostPart;
  }

  return null;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

const selected = currentPerson();
const localPreviewHosts = ["localhost", "127.0.0.1"];

if (localPreviewHosts.includes(window.location.hostname)) {
  const localLinks = {
    victor: "https://victorcampeanu.me/",
    gerard: "http://localhost:4173/",
    tomas: "http://localhost:4176/"
  };

  Object.entries(localLinks).forEach(([person, href]) => {
    document.querySelector(`[data-person-link="${person}"]`)?.setAttribute("href", href);
  });
}

if (selected) {
  const page = people[selected];
  document.title = `${page.title} | Victor Family Sites`;
  setText("site-label", page.label);
  setText("page-title", page.title);
  setText("page-summary", page.summary);
  setText("details-title", page.detailsTitle);
  setText("details-copy", page.detailsCopy);

  document
    .querySelector(`[data-person-link="${selected}"]`)
    ?.setAttribute("aria-current", "page");
}
