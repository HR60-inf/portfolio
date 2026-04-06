'use strict';

/* ============================================================
   PORTFOLIO – ISMAEL RAHALI
   folio.js – Script principal modernisé
   ============================================================ */

// ===== EMAILJS INIT =====
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("EXSQxrpXGOTBTsqcO");
  }
})();

/* ============================================================
   NAVBAR – Scroll effect + Mobile toggle
   ============================================================ */
(function () {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (!navbar) return;

  // Scrolled class
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Mobile burger toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }
})();

/* ============================================================
   HERO PARTICLES – Particules flottantes animées
   ============================================================ */
(function () {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#7c4dff', '#00e676', '#d5f51c', '#a37fff', '#00b359'];
  const count  = 28;

  for (let i = 0; i < count; i++) {
    const p   = document.createElement('div');
    const size = Math.random() * 5 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.random() * 18 + 10;
    const delay    = Math.random() * 12;
    const left     = Math.random() * 100;

    p.classList.add('particle');
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;
    container.appendChild(p);
  }
})();

/* ============================================================
   TYPING ANIMATION
   ============================================================ */
(function () {
  const element = document.getElementById('tape-text');
  if (!element) return;

  const phrases = [
    "Bienvenue dans mon portfolio !",
    "Passionné par les systèmes, réseaux et cybersécurité.",
    "En alternance à l'Hôpital de Tonnerre.",
    "Bachelor SRC · EPF Troyes · Promo 2026."
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function type() {
    const current = phrases[phraseIndex];
    const speed   = isDeleting ? 50 : 28;

    if (!isDeleting && charIndex === current.length) {
      setTimeout(function () { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
    }

    element.textContent = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    setTimeout(type, speed);
  }

  type();
})();

/* ============================================================
   CONTACT FORM POPUP
   ============================================================ */
function afficherFormulaire(position) {
  const container = document.getElementById('formulaireContainer');
  if (!container) return;

  // Supprimer popup existant
  const existing = document.getElementById('formulairePopup');
  if (existing) { existing.remove(); return; }

  const html = `
    <div id="formulairePopup">
      <div class="header">
        <i class="fas fa-envelope"></i>&nbsp; Me contacter – Cliquez pour déplacer
      </div>
      <div class="content">
        <form id="monFormulaire" autocomplete="off">
          <label for="prenom">Prénom ou Société</label>
          <input type="text" id="prenom" name="prenom" placeholder="Votre nom..." required>
          <label for="numero">Téléphone</label>
          <input type="text" id="numero" name="numero" placeholder="+33 6 xx xx xx xx">
          <label for="email">Adresse Email</label>
          <input type="email" id="email" name="email" placeholder="email@exemple.fr" required>
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="4" placeholder="Votre message..." required></textarea>
          <input type="submit" value="Envoyer le message">
        </form>
        <button id="closePopup"><i class="fas fa-times"></i> Fermer</button>
      </div>
    </div>`;

  container.innerHTML = html;

  const popup = document.getElementById('formulairePopup');

  // Positionnement
  if (position === 'center') {
    popup.style.cssText += 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);';
  } else {
    popup.style.cssText += 'position:fixed;bottom:14px;left:14px;';
  }

  // Fermeture
  document.getElementById('closePopup').addEventListener('click', function () {
    container.innerHTML = '';
  });

  // Soumission EmailJS
  document.getElementById('monFormulaire').addEventListener('submit', function (e) {
    e.preventDefault();
    if (typeof emailjs === 'undefined') {
      alert("Service email non disponible.");
      return;
    }
    const btn = this.querySelector('[type="submit"]');
    btn.value = "Envoi en cours...";
    btn.disabled = true;

    emailjs.sendForm('service_dih28c9', 'template_hec9uo8', this)
      .then(function () {
        alert("Message envoyé avec succès !");
        container.innerHTML = '';
      })
      .catch(function (err) {
        alert("Erreur lors de l'envoi : " + (err.text || "Veuillez réessayer."));
        btn.value = "Envoyer le message";
        btn.disabled = false;
      });
  });

  // Drag & Drop
  initDrag(popup, popup.querySelector('.header'));
}

function initDrag(el, handle) {
  if (!handle) return;
  let startX, startY, elX, elY;

  handle.addEventListener('mousedown', function (e) {
    startX = e.clientX;
    startY = e.clientY;
    const rect = el.getBoundingClientRect();
    elX = rect.left;
    elY = rect.top;
    el.style.transform = 'none';

    function move(e) {
      el.style.left = (elX + e.clientX - startX) + 'px';
      el.style.top  = (elY + e.clientY - startY) + 'px';
    }
    function stop() {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
  });
}

/* ============================================================
   EVENTS – Ouvrir le formulaire
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  // Icône utilisateur (héro)
  const userIcon = document.getElementById('userIcon');
  if (userIcon) {
    userIcon.addEventListener('click', function (e) {
      e.preventDefault();
      afficherFormulaire('center');
    });
  }

  // Icône contact (footer)
  const contactIcon = document.getElementById('contactIcon');
  if (contactIcon) {
    contactIcon.addEventListener('click', function (e) {
      e.preventDefault();
      afficherFormulaire('bottom');
    });
  }

  // Bouton contact navbar
  const contactNavBtn = document.getElementById('contactNavBtn');
  if (contactNavBtn) {
    contactNavBtn.addEventListener('click', function (e) {
      e.preventDefault();
      afficherFormulaire('center');
    });
  }

  // Smooth scroll générique
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log("Portfolio Ismael RAHALI – Chargé avec succès ✓");
});
