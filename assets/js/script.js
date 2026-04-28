// =========================================
// Turistická informačná kancelária Lienka
// Externý JS — len addEventListener
// =========================================

document.addEventListener('DOMContentLoaded', function () {


  // ---------------------------------------
  // 1. DARK MODE TOGGLE
  // Pridá/odoberie triedu .dark na <body>.
  // Stav ukladáme do localStorage — vydží
  // aj po prechode medzi stránkami.
  // ---------------------------------------

  const darkModeBtn = document.getElementById('darkModeBtn');
  const body = document.body;

  if (darkModeBtn) {
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark');
      darkModeBtn.textContent = '☀️ Svetlý režim';
    }

    darkModeBtn.addEventListener('click', function () {
      body.classList.toggle('dark');
      if (body.classList.contains('dark')) {
        darkModeBtn.textContent = '☀️ Svetlý režim';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        darkModeBtn.textContent = '🌙 Tmavý režim';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }


  // ---------------------------------------
  // 2. SMOOTH SCROLL — nav odkazy
  // Plynulý posun na sekciu po kliknutí
  // na odkaz v navigácii (len href="#...").
  // ---------------------------------------

  const navLinks = document.querySelectorAll('.custom-nav-link[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const navMenu = document.getElementById('mainNav');
      if (navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  });


  // ---------------------------------------
  // 3. ŽIVÉ VYHĽADÁVANIE V PONUKE
  // Filtruje karty podľa textu v poli.
  // Karty bez zhody dostanú triedu .hidden.
  // Ak nič nenájde, zobrazí správu.
  // ---------------------------------------

  const searchInput = document.getElementById('searchInput');
  const menuItems   = document.querySelectorAll('.menu-item');
  const noResults   = document.getElementById('noResults');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      let visible = 0;

      menuItems.forEach(function (item) {
        const match = item.textContent.toLowerCase().includes(query);
        item.classList.toggle('hidden', !match);
        if (match) visible++;
      });

      if (noResults) {
        noResults.classList.toggle('d-none', visible > 0);
      }
    });
  }


  // ---------------------------------------
  // 4. POČÍTADLO ZNAKOV V TEXTAREA
  // Odpočítava znaky do maxlength 200.
  // Pod 20 znakov pridá CSS triedu .warning
  // ktorá zmení farbu počítadla na červenú.
  // ---------------------------------------

  const sprava   = document.getElementById('sprava');
  const charCount = document.getElementById('charCount');

  if (sprava && charCount) {
    sprava.addEventListener('input', function () {
      const remaining = 200 - sprava.value.length;
      charCount.textContent = remaining;
      charCount.parentElement.classList.toggle('warning', remaining <= 20);
    });
  }


  // ---------------------------------------
  // 5. PODMIENENÝ FORMULÁR — REZERVÁCIA
  // Radio "Áno" rozbalí sekciu s dátumom
  // a počtom osôb. "Nie" ju skryje a vymaže.
  // ---------------------------------------

  const rezAno           = document.getElementById('rezAno');
  const rezNie           = document.getElementById('rezNie');
  const rezervaciaDetail = document.getElementById('rezervaciaDetail');

  if (rezAno && rezNie && rezervaciaDetail) {
    rezAno.addEventListener('change', function () {
      if (this.checked) rezervaciaDetail.classList.remove('d-none');
    });

    rezNie.addEventListener('change', function () {
      if (this.checked) {
        rezervaciaDetail.classList.add('d-none');
        const datum = document.getElementById('datum');
        const osoby = document.getElementById('osoby');
        if (datum) datum.value = '';
        if (osoby) osoby.value = '';
      }
    });
  }


  // ---------------------------------------
  // 6. TOAST NOTIFIKÁCIA
  // Po odoslaní formulára na kontakt.html
  // sa zobrazí Bootstrap Toast a po 4s
  // automaticky zmizne.
  // ---------------------------------------

  const toastEl = document.getElementById('kontaktToast');
  const contactForm = document.getElementById('contactForm');
  const successMsg  = document.getElementById('successMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Skontrolujeme HTML5 validáciu
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Zobrazíme Toast notifikáciu
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
        toast.show();
      }

      // Zobrazíme inline správu o úspechu
      if (successMsg) {
        successMsg.classList.remove('d-none');
        setTimeout(function () {
          successMsg.classList.add('d-none');
        }, 5000);
      }

      // Resetujeme formulár
      contactForm.reset();
      if (charCount) charCount.textContent = '200';
      if (rezervaciaDetail) rezervaciaDetail.classList.add('d-none');

      // Scrollujeme na začiatok stránky
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


}); // koniec DOMContentLoaded