document.getElementById('inputEmail').addEventListener('input', updateButtonState);

document.addEventListener("DOMContentLoaded", () => {
  hoverFocus();
  adaptsHeaderImageAccordingToScreenSize();
  window.addEventListener("resize", adaptsHeaderImageAccordingToScreenSize);
  initTextAnimation("#game-title", "The Game");
  initTextAnimation("#game-features", "Features");
  initTextAnimation("#game-faq", "FAQ");
  initTextAnimation("#game-join", "Join our mailing list to be notified when the game is out!");
  initImageFeaturesAnimation("#snail-features", 4);
  initLinks();
  updateButtonState();
});

window.addEventListener('load', function () {
  setTimeout(_ => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(_ => {
        loader.style.display = 'none';
    }, 200);
  }, 2000);
});

/**
 * Permet d'assombrir les textes et les icones des liens quand on passe la souris dessus
 */
function hoverFocus() {
  var activeLinks = document.querySelectorAll(".nav-link-text");
  var activeIcons = document.querySelectorAll("i");

  activeLinks.forEach(function (element) {
    element.addEventListener("mouseover", function () {
      this.classList.add("active-hover");
    });

    element.addEventListener("mouseout", function () {
      this.classList.remove("active-hover");
    });

    element.addEventListener("focus", function () {
      this.classList.add("active-hover");
    });

    element.addEventListener("blur", function () {
      this.classList.remove("active-hover");
    });
  });

  activeIcons.forEach(function (element) {
    element.addEventListener("mouseover", function () {
      this.classList.add("bi-hover");
    });

    element.addEventListener("mouseout", function () {
      this.classList.remove("bi-hover");
    });

    element.addEventListener("focus", function () {
      this.classList.add("bi-hover");
    });

    element.addEventListener("blur", function () {
      this.classList.remove("bi-hover");
    });
  });
}

/**
 * Permet de faire un effet de parallax sur plusieurs images
 */
function setParallaxImages() {
  document.addEventListener('scroll', function(e) {
    var scrolled = window.pageYOffset;
    var layer1 = document.querySelector('.layer-1 img');
    var layer2 = document.querySelector('.layer-2 img');
    var layer3 = document.querySelector('.layer-3 img');
    var layer5 = document.querySelector('.layer-5 img');

    layer1.style.transform = 'translateY(' + (scrolled * 1) + 'px)';
    layer2.style.transform = 'translateY(' + (scrolled * 0.85) + 'px)';
    layer3.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
    layer5.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
  });
}

/**
 * Met les images en parallax si l'écran fait plus de 992px.
 * Met l'image en statique si l'écran fait moins de 992px
 */
function adaptsHeaderImageAccordingToScreenSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 992) {
    setParallaxImages();
  }
}

/**
 * Anime un texte dès qu'il est visible à l'écran
 * @param {string} id 
 * @param {string} newText
 */
function initTextAnimation(id, newText) {
  const title = document.querySelector(id);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && title) {
          title.style.visibility = 'visible';
          title.textContent = newText;
          const text = new SplitType(id, { types: 'chars' })
          const chars = text.chars
          gsap.fromTo(
            chars,
            { 
              x: -25,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
            });
        } else {
          title.textContent = "-";
          title.style.visibility = 'hidden';
        }
      });
    },
    { threshold: 0.5 }
  );
  if (title) {
    observer.observe(title);
  }
}

/**
 * Permet de faire un effet d'apparition de gauche à droite et de fondu sur les images du bloc features
 * @param {string} id 
 * @param {number} duration
 */
function initImageFeaturesAnimation(id, duration) {
  const title = document.querySelector(id);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && title) {
          gsap.fromTo(id, { x: -750, opacity: 0 }, { duration: duration, x: 0, opacity: 1 });
        } else {
          gsap.fromTo(id, { x: 0, opacity: 0 }, { duration: duration, x: -750, opacity: 0 });
        }
      });
    },
    { threshold: 0.5 }
  );
  if (title) {
    observer.observe(title);
  }
}

/**
 * Initialise la façon de faire lors du click sur les liens de la navbar
 */
function initLinks() {
  var scrollLinks = document.querySelectorAll('.nav-link-text[data-target]');
  scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var target = document.querySelector(link.getAttribute('data-target'));
      target.scrollIntoView({
        behavior: "instant"
      });
    });
  });
}

/**
 * Permet de griser ou dégriser le bouton d'envoi de l'email
 */
function updateButtonState() {
  const input = document.getElementById('inputEmail');
  const button = document.getElementById('buttonEmail');
  button.disabled = !input.value.trim();
}