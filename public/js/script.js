document.addEventListener("DOMContentLoaded", () => {
  hoverFocus();
  adaptsHeaderImageAccordingToScreenSize();
  window.addEventListener("resize", adaptsHeaderImageAccordingToScreenSize);
  initTextAnimation();
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
  classNames = [
    { className: ".layer-2", ratio: 500 },
    { className: ".layer-3", ratio: 300 },
    { className: ".layer-5", ratio: 150 },
  ];
  classNames.forEach((layer) => {
    setParallaxImage(layer.className, layer.ratio);
  });
}

/**
 * Permet de faire un effet de parallax sur une image
 * @param className
 * @param ratio
 */
function setParallaxImage(className, ratio) {
  gsap.fromTo(
    className,
    {
      y: 0,
    },
    {
      y: ratio,
      ease: "none",
      scrollTrigger: {
        trigger: className,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
}

/**
 * Permet de fixer une image
 * @param className
 */
function setFixedImage(className) {
  gsap.timeline({
    scrollTrigger: {
      trigger: className,
      start: "top top",
      end: "bottom top",
      pin: true,
    },
  });
}

/**
 * Met les images parallax si l'écran fait plus de 992px.
 * Met l'image statique si l'écran fait moins de 992px
 */
function adaptsHeaderImageAccordingToScreenSize() {
  const screenWidth = window.innerWidth;
  const parallaxContainer = document.querySelector(".parallax-container");
  parallaxContainer.innerHTML = "";
  if (screenWidth > 992) {
    parallaxContainer.innerHTML = `
                <div class="row">
                <div class="col layer-1 header-image">
                    <img src="img/Squirrel_Artwork_Layer_0.webp" alt="Layer 1" class="img-fluid">
                </div>
                <div class="col layer-2">
                    <img src="img/Squirrel_Artwork_Layer_1.webp" alt="Layer 2" class="img-fluid">
                </div>
                <div class="col layer-3">
                    <img src="img/Squirrel_Artwork_Layer_2.webp" alt="Layer 3" class="img-fluid">
                </div>
                <div class="col layer-4">
                    <img src="img/Squirrel_Artwork_Layer_3.webp" alt="Layer 4" class="img-fluid">
                </div>
                <div class="col layer-5">
                    <img src="img/Squirrel_Artwork_Layer_LogoSmall.webp" alt="Layer 5" class="img-fluid">
                    </picture>
                </div>
                </div>
        `;
    setParallaxImages();
    setFixedImage(".layer-1");
  } else {
    parallaxContainer.innerHTML = `
                <div class="row">
                <div class="col header-image">
                    <img src="img/Squirrel_Artwork_WithLargeLogo.webp" alt="Header image" class="img-fluid">
                </div>
                </div>
        `;
  }
}

/**
 * Anime le texte "The Game" dès qu'il est visible à l'écran
 */
function initTextAnimation() {
  const gameTitle = document.querySelector("#game-title");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && gameTitle) {
          gsap.to(gameTitle, {
            duration: 1,
            text: "The Game",
            ease: "none",
          });
        }
      });
    },
    { threshold: 0.5 }
  );
  if (gameTitle) {
    observer.observe(gameTitle);
  }
}