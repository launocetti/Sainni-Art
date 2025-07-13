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
/*
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
*/

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-buttons .btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  console.log("Botones encontrados:", filterButtons.length)
  console.log("Items de galería encontrados:", galleryItems.length)

  filterButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")
      console.log("Filtro seleccionado:", filter)

      galleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute("data-category")
        console.log(`Item ${index}: categoría = ${itemCategory}`)

        if (filter === "all" || itemCategory === filter) {
          item.style.display = "block"
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"

          // Animación de entrada
          setTimeout(() => {
            item.style.transition = "all 0.3s ease"
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, index * 50)
        } else {
          item.style.transition = "all 0.3s ease"
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"

          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Mostrar todos los elementos al cargar la página
  galleryItems.forEach((item) => {
    item.style.display = "block"
    item.style.opacity = "1"
    item.style.transform = "scale(1)"
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
