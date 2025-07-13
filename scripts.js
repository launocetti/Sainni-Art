// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(33, 37, 41, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "var(--dark-color)"
    navbar.style.backdropFilter = "none"
  }
})

// ===== GALLERY FILTER =====

muestra solo los item de las categorias pero no selecciona el filtro de categorias

const filterButtons = document.querySelectorAll(".filter-buttons .btn")
const galleryItems = document.querySelectorAll(".gallery-item")

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    this.classList.add("active")

    const filter = this.getAttribute("data-filter")

    galleryItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block"
        item.style.animation = "fadeInUp 0.5s ease"
      } else {
        item.style.display = "none"
      }
    })
  })
})


// ===== IMAGE MODAL =====
const imageModal = document.getElementById("imageModal")
const modalImage = document.getElementById("modalImage")
const modalTitle = document.getElementById("modalTitle")
const modalDescription = document.getElementById("modalDescription")

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    const imageSrc = this.getAttribute("data-image")
    const title = this.getAttribute("data-title")
    const description = this.getAttribute("data-description")

    modalImage.src = imageSrc
    modalTitle.textContent = title
    modalDescription.textContent = description
  })
})

// ===== CLOSE MOBILE MENU =====
const bootstrap = window.bootstrap // Declare the bootstrap variable
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse")
    if (navbarCollapse.classList.contains("show")) {
      bootstrap.Collapse.getInstance(navbarCollapse).hide()
    }
  })
})

// ===== ANIMATE ON SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el)
})

// ===== LOADING ANIMATION =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// ===== GALLERY MASONRY EFFECT =====
function adjustGalleryLayout() {
  const grid = document.getElementById("galleryGrid")
  const items = grid.querySelectorAll(".gallery-item")

  // Reset any previous styles
  items.forEach((item) => {
    item.style.gridRowEnd = "auto"
  })

  // Apply masonry effect on larger screens
  if (window.innerWidth > 768) {
    items.forEach((item) => {
      const img = item.querySelector("img")
      if (img.complete) {
        const height = img.naturalHeight
        const rowSpan = Math.ceil(height / 10)
        item.style.gridRowEnd = `span ${Math.min(rowSpan, 50)}`
      }
    })
  }
}

// Adjust layout on load and resize
window.addEventListener("load", adjustGalleryLayout)
window.addEventListener("resize", adjustGalleryLayout)

// ===== PRELOAD IMAGES =====
function preloadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize preloading
document.addEventListener("DOMContentLoaded", preloadImages)



/*prueba carrousel rapido*/

// ===== CAROUSEL AUTOMÁTICO Y RÁPIDO =====
document.addEventListener("DOMContentLoaded", () => {
  // ===== CAROUSEL NORMAL (2 segundos) =====
  const carouselNormal = document.getElementById("demoRapido")
  if (carouselNormal) {
    const carousel1 = new window.bootstrap.Carousel(carouselNormal, {
      interval: 2000, // 2 segundos
      wrap: true, // Volver al inicio
      pause: "hover", // Pausar al hacer hover
    })
  }

  // ===== CAROUSEL SÚPER RÁPIDO (1 segundo) =====
  const carouselRapido = document.getElementById("carouselSuperRapido")
  if (carouselRapido) {
    const carousel2 = new window.bootstrap.Carousel(carouselRapido, {
      interval: 1000, // 1 segundo
      wrap: true,
      pause: false, // No pausar nunca
    })
  }

  // ===== CAROUSEL PERSONALIZABLE =====
  const carouselPersonalizable = document.getElementById("carouselPersonalizable")
  const speedRange = document.getElementById("speedRange")
  const speedValue = document.getElementById("speedValue")

  if (carouselPersonalizable && speedRange) {
    let carouselInstance = new window.bootstrap.Carousel(carouselPersonalizable, {
      interval: 2000,
      wrap: true,
      pause: "hover",
    })

    // Cambiar velocidad dinámicamente
    speedRange.addEventListener("input", function () {
      const newInterval = Number.parseFloat(this.value) * 1000 // Convertir a milisegundos
      speedValue.textContent = this.value

      // Recrear el carousel con nueva velocidad
      carouselInstance.dispose()
      carouselInstance = new window.bootstrap.Carousel(carouselPersonalizable, {
        interval: newInterval,
        wrap: true,
        pause: "hover",
      })
    })
  }

  // ===== FUNCIONES ADICIONALES =====

  // Pausar todos los carousels al hacer clic
  document.querySelectorAll(".carousel").forEach((carousel) => {
    carousel.addEventListener("click", function () {
      const carouselInstance = window.bootstrap.Carousel.getInstance(this)
      if (carouselInstance) {
        carouselInstance.pause()

        // Reanudar después de 3 segundos
        setTimeout(() => {
          carouselInstance.cycle()
        }, 3000)
      }
    })
  })

  // Controlar con teclado
  document.addEventListener("keydown", (e) => {
    const activeCarousel = document.querySelector(".carousel:hover")
    if (activeCarousel) {
      const carouselInstance = window.bootstrap.Carousel.getInstance(activeCarousel)
      if (carouselInstance) {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault()
            carouselInstance.prev()
            break
          case "ArrowRight":
            e.preventDefault()
            carouselInstance.next()
            break
          case " ": // Espacio
            e.preventDefault()
            carouselInstance.pause()
            setTimeout(() => carouselInstance.cycle(), 2000)
            break
        }
      }
    }
  })
})

// ===== FUNCIÓN PARA CREAR CAROUSEL DINÁMICO =====
function createFastCarousel(containerId, images, speed = 1500) {
  const container = document.getElementById(containerId)
  if (!container) return

  // Crear HTML del carousel
  const carouselHTML = `
        <div id="${containerId}Carousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                ${images
                  .map(
                    (img, index) => `
                    <div class="carousel-item ${index === 0 ? "active" : ""}">
                        <img src="${img.src}" alt="${img.alt}" class="d-block w-100 img-fluid rounded">
                        ${img.caption ? `<div class="carousel-caption d-none d-md-block"><h5>${img.caption}</h5></div>` : ""}
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `

  container.innerHTML = carouselHTML

  // Inicializar carousel
  const carouselElement = container.querySelector(".carousel")
  new window.bootstrap.Carousel(carouselElement, {
    interval: speed,
    wrap: true,
    pause: "hover",
  })
}
