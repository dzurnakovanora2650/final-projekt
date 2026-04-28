// =========================================
// Turistická informačná kancelária Lienka
// JavaScript — addEventListener, bez onclick
// =========================================

document.addEventListener('DOMContentLoaded', function () {


  // ---------------------------------------
  // 1. DARK MODE TOGGLE
  // Pridá/odoberie triedu .dark na <body>.
  // Všetky vizuálne zmeny sú v style.css.
  // Stav sa ukladá do localStorage.
  // ---------------------------------------

  const darkModeBtn = document.getElementById('darkModeBtn');
  const body = document.body;

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


  // ---------------------------------------
  // 2. SMOOTH SCROLL pre nav odkazy
  // Po kliknutí na odkaz sa stránka plynulo
  // posunie na danú sekciu.
  // ---------------------------------------

  const navLinks = document.querySelectorAll('.custom-nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      const navMenu = document.getElementById('mainNav');
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  });


  // ---------------------------------------
  // 3. TOAST NOTIFIKÁCIA
  // Všetky tlačidlá .rezervovat-btn spustia
  // Bootstrap Toast v pravom dolnom rohu.
  // Toast zmizne automaticky po 4 sekundách.
  // ---------------------------------------

  const toastEl = document.getElementById('rezervaciaToast');
  const toast = new bootstrap.Toast(toastEl, { delay: 4000 });

  const rezervovatBtns = document.querySelectorAll('.rezervovat-btn');
  rezervovatBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      toast.show();
    });
  });


  // ---------------------------------------
  // 4. POČÍTADLO ZNAKOV V TEXTAREA
  // Sleduje zostatok znakov do maxlength 200.
  // Pod 20 znakov zmení farbu na červenú.
  // ---------------------------------------

  const sprava = document.getElementById('sprava');
  const charCount = document.getElementById('charCount');

  if (sprava && charCount) {
    sprava.addEventListener('input', function () {
      const remaining = 200 - sprava.value.length;
      charCount.textContent = remaining;
      const counter = charCount.parentElement;
      if (remaining <= 20) {
        counter.classList.add('warning');
      } else {
        counter.classList.remove('warning');
      }
    });
  }


  // ---------------------------------------
  // 5. PODMIENENÝ FORMULÁR — REZERVÁCIA
  // Výber "Áno" rozbalí sekciu s dátumom
  // a počtom osôb. "Nie" ju opäť skryje.
  // ---------------------------------------

  const rezAno = document.getElementById('rezAno');
  const rezNie = document.getElementById('rezNie');
  const rezervaciaDetail = document.getElementById('rezervaciaDetail');

  if (rezAno && rezNie && rezervaciaDetail) {
    rezAno.addEventListener('change', function () {
      if (this.checked) {
        rezervaciaDetail.classList.remove('d-none');
      }
    });
    rezNie.addEventListener('change', function () {
      if (this.checked) {
        rezervaciaDetail.classList.add('d-none');
        document.getElementById('datum').value = '';
        document.getElementById('osoby').value = '';
      }
    });
  }


  // ---------------------------------------
  // 6. ŽIVÉ VYHĽADÁVANIE V PONUKE
  // Filtruje karty aj zoznam služieb podľa
  // textu zadaného do vyhľadávacieho poľa.
  // ---------------------------------------

  const searchInput = document.getElementById('searchInput');
  const menuItems = document.querySelectorAll('.menu-item');
  const serviceItems = document.querySelectorAll('.service-item');
  const noResults = document.getElementById('noResults');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      let visibleCount = 0;

      // Filtrujeme karty
      menuItems.forEach(function (item) {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.classList.remove('hidden');
          visibleCount++;
        } else {
          item.classList.add('hidden');
        }
      });

      // Filtrujeme aj zoznam služieb
      serviceItems.forEach(function (item) {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      // Správa ak nič nenájdeme
      if (noResults) {
        if (visibleCount === 0) {
          noResults.classList.remove('d-none');
        } else {
          noResults.classList.add('d-none');
        }
      }
    });
  }


  // ---------------------------------------
  // 7. ODOSLANIE FORMULÁRA
  // Skontroluje validáciu, zobrazí správu
  // o úspechu a vráti stránku na začiatok.
  // ---------------------------------------

  const contactForm = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMsg');

  if (contactForm && successMsg) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      successMsg.classList.remove('d-none');
      contactForm.reset();
      if (charCount) charCount.textContent = '200';
      if (rezervaciaDetail) rezervaciaDetail.classList.add('d-none');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(function () {
        successMsg.classList.add('d-none');
      }, 5000);
    });
  }


}); // koniec DOMContentLoaded