/* BusinessAI.academy — interazioni del sito statico */
(function () {
  "use strict";

  /* Dati dei percorsi: usati per popolare la select nel form contatti
     e disponibili per eventuali render dinamici. */
  var courses = [
    { code: "BA-04", title: "AI applicata allo studio professionale" },
    { code: "BA-01", title: "Fondamenti di AI per decision maker" },
    { code: "BA-02", title: "AI per la PMI: dal preventivo alla consegna" },
    { code: "BA-03", title: "Scrittura e conoscenza assistite per i professionisti" }
  ];

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* Menu mobile */
  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var panel = document.querySelector("[data-nav-panel]");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var open = panel.hasAttribute("hidden");
      if (open) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Chiudi" : "Menu";
    });
  }

  /* Evidenzia la voce di navigazione corrente */
  function initActiveLink() {
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav] a").forEach(function (a) {
      if (a.getAttribute("href") === path) a.classList.add("is-active");
    });
  }

  /* Anno corrente nel footer */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* Form candidatura: opzioni, validazione, stato inviato */
  function initForm() {
    var form = document.querySelector("[data-form]");
    if (!form) return;

    var select = form.querySelector("#interesse");
    if (select) {
      courses.forEach(function (c) {
        var opt = document.createElement("option");
        opt.value = c.code;
        opt.textContent = c.code + " — " + c.title;
        select.appendChild(opt);
      });
      var cons = document.createElement("option");
      cons.value = "consulenza";
      cons.textContent = "Consulenza — revisione processi";
      select.appendChild(cons);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      form.querySelectorAll(".error").forEach(function (n) { n.remove(); });
      var valid = true;

      function fail(field, message) {
        valid = false;
        var p = document.createElement("p");
        p.className = "error";
        p.textContent = message;
        field.parentNode.appendChild(p);
      }

      var nome = form.querySelector("#nome");
      var email = form.querySelector("#email");
      if (!nome.value.trim()) fail(nome, "Inserisci nome e cognome.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) fail(email, "Inserisci un indirizzo email valido.");
      if (!valid) return;

      var button = form.querySelector("button[type=submit]");
      button.disabled = true;
      button.textContent = "Invio in corso…";

      /* Nessun backend: si simula l'invio e si mostra la ricevuta. */
      window.setTimeout(function () {
        var data = Object.fromEntries(new FormData(form).entries());
        console.log("Candidatura:", data);
        var sent = document.querySelector("[data-form-sent]");
        form.setAttribute("hidden", "");
        if (sent) {
          sent.removeAttribute("hidden");
          sent.focus();
        }
      }, 600);
    });
  }

  ready(function () {
    initNav();
    initActiveLink();
    initYear();
    initForm();
  });
})();
