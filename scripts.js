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

------
muestra la cantidad de elementos en cada categoria en el item


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

      // Ocultar TODOS los elementos primero
      galleryItems.forEach((item) => {
        item.style.transition = "all 0.3s ease"
        item.style.opacity = "0"
        item.style.transform = "scale(0.8)"

        setTimeout(() => {
          item.style.display = "none"
        }, 300)
      })

      // Después de ocultar todo, mostrar solo la categoría seleccionada
      setTimeout(() => {
        let visibleIndex = 0

        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category")
          console.log(`Verificando item: categoría = ${itemCategory}, filtro = ${filter}`)

          // Solo mostrar si coincide con el filtro O si el filtro es "all"
          if (filter === "all" || itemCategory === filter) {
            item.style.display = "block"
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"

            // Animación de entrada escalonada
            setTimeout(() => {
              item.style.transition = "all 0.4s ease"
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, visibleIndex * 100) // Delay escalonado

            visibleIndex++
          }
        })

        // Actualizar contadores
        updateFilterCounts()
      }, 350) // Esperar a que termine la animación de salida
    })
  })

  // Función para actualizar contadores
  function updateFilterCounts() {
    const arteCount = document.querySelectorAll('[data-category="arte"]').length
    const decoCount = document.querySelectorAll('[data-category="deco"]').length
    const customCount = document.querySelectorAll('[data-category="custom"]').length
    const totalCount = galleryItems.length

    document.getElementById("count-all").textContent = totalCount
    document.getElementById("count-arte").textContent = arteCount
    document.getElementById("count-deco").textContent = decoCount
    document.getElementById("count-custom").textContent = customCount
  }

  // Mostrar todos los elementos al cargar la página
  galleryItems.forEach((item, index) => {
    item.style.display = "block"
    item.style.opacity = "1"
    item.style.transform = "scale(1)"
  })

  // Inicializar contadores
  updateFilterCounts()
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

/*prueba carrousel modal*/

// ===== CAROUSEL DINÁMICO Y LIVIANO =====
class DynamicCarousel {
  constructor(modalId, images) {
    this.modalId = modalId
    this.images = images
    this.currentIndex = 0
    this.modal = document.getElementById(modalId)
    this.carouselElement = null
    this.init()
  }

  init() {
    // Escuchar cuando se abre el modal
    this.modal.addEventListener("shown.bs.modal", () => {
      this.buildCarousel()
      this.setupEventListeners()
    })

    // Limpiar cuando se cierra el modal
    this.modal.addEventListener("hidden.bs.modal", () => {
      this.cleanup()
    })
  }

  buildCarousel() {
    const indicatorsContainer = document.getElementById("carouselIndicators")
    const slidesContainer = document.getElementById("carouselSlides")

    // Limpiar contenido previo
    indicatorsContainer.innerHTML = ""
    slidesContainer.innerHTML = ""

    // Crear indicadores
    this.images.forEach((image, index) => {
      const indicator = document.createElement("button")
      indicator.type = "button"
      indicator.setAttribute("data-bs-target", "#dynamicCarousel")
      indicator.setAttribute("data-bs-slide-to", index)
      if (index === 0) indicator.classList.add("active")
      indicatorsContainer.appendChild(indicator)
    })

    // Crear slides
    this.images.forEach((image, index) => {
      const slide = document.createElement("div")
      slide.className = `carousel-item ${index === 0 ? "active" : ""}`

      slide.innerHTML = `
        <div class="carousel-loading" style="display: none;">
          <div class="spinner"></div>
        </div>
        <img src="${image.src}" alt="${image.alt}" class="d-block w-100" 
             onload="this.previousElementSibling.style.display='none'"
             onerror="this.src='/placeholder.svg?height=400&width=600&text=Error+al+cargar'"
             loading="lazy">
      `

      slidesContainer.appendChild(slide)
    })

    // Actualizar contador
    this.updateCounter()

    // Inicializar carousel de Bootstrap
    this.carouselElement = new window.bootstrap.Carousel(document.getElementById("dynamicCarousel"), {
      interval: false, // No auto-play
      wrap: true,
      keyboard: true,
    })
  }

  setupEventListeners() {
    const carousel = document.getElementById("dynamicCarousel")

    // Escuchar cambios de slide
    carousel.addEventListener("slide.bs.carousel", (event) => {
      this.currentIndex = event.to
      this.updateCounter()
    })

    // Navegación con teclado
    document.addEventListener("keydown", this.handleKeyboard.bind(this))

    // Navegación táctil (swipe)
    this.setupTouchNavigation(carousel)
  }

  handleKeyboard(event) {
    if (!this.modal.classList.contains("show")) return

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault()
        this.carouselElement.prev()
        break
      case "ArrowRight":
        event.preventDefault()
        this.carouselElement.next()
        break
      case "Escape":
        window.bootstrap.Modal.getInstance(this.modal).hide()
        break
    }
  }

  setupTouchNavigation(element) {
    let startX = 0
    let endX = 0

    element.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
    })

    element.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      this.handleSwipe()
    })

    element.addEventListener("touchmove", (e) => {
      e.preventDefault() // Prevenir scroll
    })
  }

  handleSwipe() {
    const threshold = 50
    const diff = this.startX - this.endX

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.carouselElement.next() // Swipe left - siguiente
      } else {
        this.carouselElement.prev() // Swipe right - anterior
      }
    }
  }

  updateCounter() {
    const currentElement = document.getElementById("currentImage")
    const totalElement = document.getElementById("totalImages")

    if (currentElement && totalElement) {
      currentElement.textContent = this.currentIndex + 1
      totalElement.textContent = this.images.length
    }
  }

  cleanup() {
    document.removeEventListener("keydown", this.handleKeyboard.bind(this))
    if (this.carouselElement) {
      this.carouselElement.dispose()
      this.carouselElement = null
    }
  }

  // Método para actualizar imágenes dinámicamente
  updateImages(newImages) {
    this.images = newImages
    this.currentIndex = 0
    if (this.modal.classList.contains("show")) {
      this.buildCarousel()
    }
  }
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
  // Definir las imágenes para el carousel
  const onePieceImages = [
    {
      src: "/imagenes/One piece 1.jpeg",
      alt: "One Piece - Fruta del Demonio 1",
    },
    {
      src: "/imagenes/One piece 2.jpeg",
      alt: "One Piece - Fruta del Demonio 2",
    },
    {
      src: "/imagenes/One piece 3.jpeg",
      alt: "One Piece - Fruta del Demonio 3",
    },
  ]

  // Crear instancia del carousel dinámico
  const carousel = new DynamicCarousel("imageModal4", onePieceImages)

  // Ejemplo de cómo cambiar imágenes dinámicamente
  window.updateCarouselImages = (newImages) => {
    carousel.updateImages(newImages)
  }
})

// ===== FUNCIÓN PARA ABRIR MODAL CON IMÁGENES ESPECÍFICAS =====
function openImageCarousel(images, title = "Galería", description = "") {
  // Actualizar título y descripción
  document.querySelector("#imageModal4 .modal-title").textContent = title
  document.getElementById("modalDescription").textContent = description

  // Actualizar imágenes
  if (window.updateCarouselImages) {
    window.updateCarouselImages(images)
  }

  // Abrir modal
  const modal = new window.bootstrap.Modal(document.getElementById("imageModal4"))
  modal.show()
}
