// ------------------------------------------------------------
// YOUR STORE DETAILS: change the words between the quotation marks.
// ------------------------------------------------------------
window.SITE = {
  name: "E-Books Store",
  tagline: "Any softcopy book you want, delivered to your phone instantly.",
  email: "dbernardinvestments@gmail.com",
  whatsapp: "256765880900"   // Optional. Digits only, with country code, e.g. 2567XXXXXXXX
};

// ------------------------------------------------------------
// Everything below builds the top bar, footer and page titles.
// You don't need to change anything below this line.
// ------------------------------------------------------------
(function () {
  var site = window.SITE;

  // Page title in the browser tab
  var pageTitle = document.body.getAttribute("data-title");
  document.title = pageTitle
    ? pageTitle + " | " + site.name
    : site.name + " | " + site.tagline;

  // Top bar
  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<header class="topbar"><div class="wrap">' +
      '<a class="logo" href="index.html">' + site.name + '</a>' +
      '<nav class="nav">' +
      '<a href="index.html#books">Books</a>' +
      '<a href="library.html">My Library</a>' +
      '</nav></div></header>';
  }

  // Footer
  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<footer><div class="wrap">' +
      '<span>&copy; ' + new Date().getFullYear() + ' ' + site.name + '</span>' +
      '<div class="links">' +
      '<a href="terms.html">Terms</a>' +
      '<a href="refunds.html">Refunds</a>' +
      '<a href="privacy.html">Privacy</a>' +
      '<a href="contact.html">Contact</a>' +
      '</div></div></footer>';
  }

  // Fill in the store name and email wherever a page asks for them
  document.querySelectorAll("[data-site]").forEach(function (el) {
    el.textContent = site[el.getAttribute("data-site")];
  });

  document.querySelectorAll("[data-mailto]").forEach(function (el) {
    el.href = "mailto:" + site.email;
    el.textContent = site.email;
  });

  var whatsappLink = document.getElementById("whatsapp-link");
  if (whatsappLink && site.whatsapp) {
    whatsappLink.href = "https://wa.me/" + site.whatsapp;
    whatsappLink.hidden = false;
  }
})();