const navTriggers = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");

function activatePage(pageKey, options = {}) {
  const { updateHash = true, smoothScroll = true } = options;

  pages.forEach((page) => {
    page.classList.remove("is-active");
  });

  navTriggers.forEach((item) => {
    item.classList.remove("active");
  });

  const target = document.getElementById(`page-${pageKey}`);
  const activeTrigger = document.querySelector(`[data-page="${pageKey}"]`);

  if (!target) {
    return false;
  }

  target.classList.add("is-active");

  if (activeTrigger) {
    activeTrigger.classList.add("active");
  }

  if (updateHash) {
    window.location.hash = pageKey;
  }

  window.scrollTo({
    top: 0,
    behavior: smoothScroll ? "smooth" : "auto",
  });

  return true;
}

function getPageFromHash() {
  const hash = window.location.hash.replace("#", "").trim();
  return hash || "home";
}

navTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const pageKey = trigger.dataset.page;
    activatePage(pageKey, { updateHash: true, smoothScroll: true });
  });
});

window.addEventListener("hashchange", () => {
  const pageKey = getPageFromHash();
  const ok = activatePage(pageKey, { updateHash: false, smoothScroll: false });

  if (!ok) {
    activatePage("home", { updateHash: false, smoothScroll: false });
  }
});

const initialPage = getPageFromHash();
const ok = activatePage(initialPage, { updateHash: false, smoothScroll: false });

if (!ok) {
  activatePage("home", { updateHash: false, smoothScroll: false });
}