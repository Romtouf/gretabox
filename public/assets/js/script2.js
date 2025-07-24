// Carousel simple et propre
class SimpleCarousel {
  constructor() {
    this.track = document.getElementById("carouselTrack");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.indicators = document.getElementById("carouselIndicators");

    if (!this.track) return;

    this.slides = this.track.querySelectorAll(".carousel-slide");
    this.currentIndex = 0;
    this.slideWidth = 215; // 200px + 15px gap
    this.slidesToShow = this.getSlidesToShow();

    this.init();
  }

  init() {
    this.createIndicators();
    this.setupEventListeners();
    this.updateCarousel();
    this.startAutoPlay();
  }

  getSlidesToShow() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 600) return 2;
    if (width <= 768) return 3;
    if (width <= 992) return 4;
    return 5;
  }

  createIndicators() {
    const totalPages = Math.ceil(this.slides.length / this.slidesToShow);
    this.indicators.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("div");
      dot.classList.add("carousel-indicator");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        this.currentIndex = i * this.slidesToShow;
        this.updateCarousel();
      });

      this.indicators.appendChild(dot);
    }
  }

  setupEventListeners() {
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    // Touch/swipe support
    let startX = 0;
    this.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) this.nextSlide();
        else this.prevSlide();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Responsive
    window.addEventListener("resize", () => {
      this.slidesToShow = this.getSlidesToShow();
      this.slideWidth = this.getSlideWidth();
      this.createIndicators();
      this.updateCarousel();
    });
  }

  getSlideWidth() {
    const width = window.innerWidth;
    if (width <= 480) return 135; // 120px + 15px gap
    if (width <= 600) return 152; // 140px + 12px gap
    if (width <= 768) return 172; // 160px + 12px gap
    return 215; // 200px + 15px gap
  }

  updateCarousel() {
    const offset = -this.currentIndex * this.slideWidth;
    this.track.style.transform = `translateX(${offset}px)`;

    // Update indicators
    const currentPage = Math.floor(this.currentIndex / this.slidesToShow);
    document
      .querySelectorAll(".carousel-indicator")
      .forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentPage);
      });
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - this.slidesToShow) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
    this.updateCarousel();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.slides.length - this.slidesToShow; // Loop to end
    }
    this.updateCarousel();
  }

  startAutoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  new SimpleCarousel();

  // Update footer year
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
