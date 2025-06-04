// Main JavaScript for EcoInnovate

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Ide Inovatif Input
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwd7ZyP8IRIf039-ioruXO29xSUHGubOFpERNT6Bf2UAEovZwydmfZZXmHmW8TzwHkMSA/exec'
    const form = document.forms['submit-to-google-sheet']
    const msg = document.getElementById("msg")
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Ide Anda berhasil dikirim"
            setTimeout(function(){
                msg.innerHTML=""
            },5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
    })

 
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Video Modal
    const playBtn = document.getElementById('play-video');
    const videoModal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('video-iframe');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // Replace with actual YouTube video ID
            videoIframe.src = 'https://www.youtube.com/embed/fc3EIAC--bU?si=YRLsR5d1X7NeU3h8';
            const modal = new bootstrap.Modal(videoModal);
            modal.show();
        });
    }

    videoModal?.addEventListener('hidden.bs.modal', function() {
        videoIframe.src = '';
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                const updateCount = () => {
                    count += increment;
                    
                    if (count < target) {
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Testimonials Slider
    const testimonialSlider = document.getElementById('testimonials-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (testimonialSlider && prevBtn && nextBtn) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.col-md-4');
        const maxSlides = slides.length;
        
        // Hide all slides except the first three
        for (let i = 3; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentSlide < maxSlides - 3) {
                currentSlide++;
                updateSlider();
            }
        });
        
        function updateSlider() {
            slides.forEach((slide, index) => {
                if (index >= currentSlide && index < currentSlide + 3) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
        }
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value;
            const privacyCheck = document.getElementById('privacy-check').checked;
            
            if (email && privacyCheck) {
                newsletterMessage.innerHTML = `
                    <div class="alert alert-success">
                        Terima kasih! Anda telah berlangganan newsletter kami.
                    </div>
                `;
                
                newsletterForm.reset();
                
                setTimeout(() => {
                    newsletterMessage.innerHTML = '';
                }, 5000);
            } else {
                newsletterMessage.innerHTML = `
                    <div class="alert alert-danger">
                        Mohon isi email dan setujui kebijakan privasi.
                    </div>
                `;
                
                setTimeout(() => {
                    newsletterMessage.innerHTML = '';
                }, 5000);
            }
        });
    }

    // Shopping Cart
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    let cart = [];
    
    // Load cart from localStorage
    if (localStorage.getItem('ecoInnovateCart')) {
        cart = JSON.parse(localStorage.getItem('ecoInnovateCart'));
        updateCartUI();
    }
    
    // Add to cart
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            let price = 0;
            let image = '';
            
            // Get product details based on name
            switch(productName) {
                case 'EcoBrick':
                    price = 15000;
                    image = 'img/product1.jpg';
                    break;
                case 'SolarPot':
                    price = 350000;
                    image = 'img/product2.jpg';
                    break;
                case 'BambuStraw':
                    price = 25000;
                    image = 'img/product3.jpg';
                    break;
                default:
                    price = 100000;
                    image = 'img/product1.jpg';
            }
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }
            
            // Save to localStorage
            localStorage.setItem('ecoInnovateCart', JSON.stringify(cart));
            
            // Update cart UI
            updateCartUI();
            
            // Show cart
            showCart();
        });
    });
    
    // Show cart
    function showCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    }
    
    // Hide cart
    function hideCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
    
    // Update cart UI
    function updateCartUI() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart-message">Keranjang belanja Anda kosong.</div>';
            cartTotalAmount.textContent = 'Rp 0';
            return;
        }
        
        let cartHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h5 class="cart-item-title">${item.name}</h5>
                        <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease-quantity" data-index="${index}">-</button>
                            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                            <button class="quantity-btn increase-quantity" data-index="${index}">+</button>
                            <span class="remove-item" data-index="${index}"><i class="fas fa-trash-alt"></i></span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        cartTotalAmount.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        
        // Add event listeners for quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    localStorage.setItem('ecoInnovateCart', JSON.stringify(cart));
                    updateCartUI();
                }
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity += 1;
                localStorage.setItem('ecoInnovateCart', JSON.stringify(cart));
                updateCartUI();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('ecoInnovateCart', JSON.stringify(cart));
                updateCartUI();
            });
        });
    }
    
    // Close cart
    closeCartBtn.addEventListener('click', hideCart);
    cartOverlay.addEventListener('click', hideCart);
});
