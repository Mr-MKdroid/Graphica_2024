function createConstitutionSlider() {
    const slider = document.querySelector('.constitution-slider');
    const parts = [
    { title: "Preamble", articles: "Preamble" },
{ title: "Article 1: Name and Territory of the Union", articles: "India's name is established.India is a Union of States.Territory includes States and Union Territories.Acquired territories may be added." },
{ title: "Part II: Citizenship", articles: "Articles 5 to 11" },
{ title: "Part III: Fundamental Rights", articles: "Articles 12 to 35" },
{ title: "Part IV: Directive Principles of State Policy", articles: "Articles 36 to 51" },
{ title: "Part IVA: Fundamental Duties", articles: "Article 51A" },
{ title: "Part V: The Union", articles: "Articles 52 to 151" },
{ title: "Part VI: The States", articles: "Articles 152 to 237" },
{ title: "Part VII: The States in Part B of the First Schedule", articles: "Article 238 (Repealed)" },
{ title: "Part VIII: The Union Territories", articles: "Articles 239 to 242" },
{ title: "Part IX: The Panchayats", articles: "Articles 243 to 243O" },
{ title: "Part IXA: The Municipalities", articles: "Articles 243P to 243ZG" },
{ title: "Part IXB: The Co-operative Societies", articles: "Articles 243ZH to 243ZT" },
{ title: "Part X: The Scheduled and Tribal Areas", articles: "Articles 244 to 244A" },
{ title: "Part XI: Relations between the Union and the States", articles: "Articles 245 to 263" },
{ title: "Part XII: Finance, Property, Contracts and Suits", articles: "Articles 264 to 300A" },
{ title: "Part XIII: Trade, Commerce and Intercourse within the Territory of India", articles: "Articles 301 to 307" },
{ title: "Part XIV: Services Under the Union and the States", articles: "Articles 308 to 323" },
{ title: "Part XIVA: Tribunals", articles: "Articles 323A to 323B" },
{ title: "Part XV: Elections", articles: "Articles 324 to 329A" },
{ title: "Part XVI: Special Provisions Relating to Certain Classes", articles: "Articles 330 to 342" },
{ title: "Part XVII: Official Language", articles: "Articles 343 to 351" },
{ title: "Part XVIII: Emergency Provisions", articles: "Articles 352 to 360" },
{ title: "Part XIX: Miscellaneous", articles: "Articles 361 to 367" },
{ title: "Part XX: Amendment of the Constitution", articles: "Article 368" },
{ title: "Part XXI: Temporary, Transitional and Special Provisions", articles: "Articles 369 to 392" },
{ title: "Part XXII: Short Title, Commencement, Authoritative Text in Hindi and Repeals", articles: "Articles 393 to 395" }

    ];

    parts.forEach((part, index) => {
        const slide = document.createElement('div');
        slide.className = 'constitution-slide';
        slide.innerHTML = `
            <h3>${part.title}</h3>
            <p>${part.articles}</p>
        `;
        slider.appendChild(slide);
    });

    // Add two clone slides at the beginning and end for smooth infinite scrolling
    const firstClone = slider.children[0].cloneNode(true);
    const lastClone = slider.children[slider.children.length - 1].cloneNode(true);
    slider.insertBefore(lastClone, slider.firstChild);
    slider.appendChild(firstClone);

    updateActiveSlide(1); // Set initial active slide
}

function updateActiveSlide(index) {
    const slides = document.querySelectorAll('.constitution-slide');
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    createConstitutionSlider();

    // Constitution Slider
    const constitutionSlider = document.querySelector('.constitution-slider');
    const constitutionSlides = document.querySelectorAll('.constitution-slide');
    let constitutionIndex = 1; // Start at 1 because of the cloned slide

    function moveConstitutionSlider() {
        const slideWidth = constitutionSlider.clientWidth / 3; // 3 slides visible at a time
        const maxIndex = constitutionSlides.length - 2; // -2 because of cloned slides

        constitutionIndex++;
        if (constitutionIndex > maxIndex) {
            constitutionIndex = 1;
            constitutionSlider.style.transition = 'none';
            constitutionSlider.style.transform = `translateX(0)`;
            setTimeout(() => {
                constitutionSlider.style.transition = 'transform 0.5s ease';
                moveConstitutionSlider();
            }, 50);
            return;
        }

        constitutionSlider.style.transform = `translateX(${-constitutionIndex * slideWidth}px)`;
        updateActiveSlide(constitutionIndex);
    }

    setInterval(moveConstitutionSlider, 2000);

    // Image Slider
    const imageSlider = document.querySelector('.image-slider');
    const imageSlides = document.querySelectorAll('.slider-image');
    let imageIndex = 0;

    function moveImageSlider() {
        const slideWidth = imageSlider.clientWidth; // Full width of the container
        const maxPosition = -(slideWidth * (imageSlides.length - 1));

        imageIndex++;
        if (imageIndex >= imageSlides.length) {
            imageIndex = 0;
            imageSlider.style.transition = 'none';
            imageSlider.style.transform = `translateX(0)`;
            setTimeout(() => {
                imageSlider.style.transition = 'transform 0.5s ease';
                moveImageSlider();
            }, 50);
            return;
        }

        imageSlider.style.transform = `translateX(${-imageIndex * slideWidth}px)`;
    }

    setInterval(moveImageSlider, 4000);

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Header animation
    gsap.from("header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Image slider animation
    gsap.from(".image-slider-container", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    });

    // Constitution title animation
    gsap.from("h2", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: "h2",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Constitution slider animation
    gsap.from(".constitution-slider-container", {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: {
            trigger: ".constitution-slider-container",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Shop items animation
    gsap.utils.toArray(".shop-item").forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Cart modal animation
    document.getElementById('cartIcon')?.addEventListener('click', function() {
        gsap.from("#cartModal > div", {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: "power3.out"
        });
    });

    // Shop modal animation
    document.getElementById('shopLink')?.addEventListener('click', function() {
        gsap.from("#shopModal > div", {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
    });

    // Add this new GSAP code
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
        toggleActions: "restart pause resume pause"
    });

    

    gsap.to(".image-slider-container.purple", {
        scrollTrigger: {
            trigger: ".image-slider-container.purple",
            toggleActions: "restart pause reverse pause"
        }, 
        duration: 1, 
        backgroundColor: "#800080", // Change to purple
        ease: "none"
    });

    gsap.to("main.yoyo", {
        scrollTrigger: "main.yoyo", 
        scale: 1.05, 
        repeat: -1, 
        yoyo: true, 
        ease: "power2"
    });
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(function() {
        preloader.style.display = 'none';
    }, 1000); // Changed to 1000 milliseconds (1 second)
});

const menuItems = [
    { id: 1, name: "Constitution Book", price: 10, image: "constitution-book" },
    { id: 2, name: "Indian Flag", price: 15, image: "indian-flag" },
    { id: 3, name: "Ashoka Emblem", price: 20, image: "ashoka-emblem" },
    { id: 4, name: "Tricolor Badge", price: 5, image: "tricolor-badge" },
    { id: 5, name: "Constitution Poster", price: 12, image: "constitution-poster" },
    { id: 6, name: "National Anthem CD", price: 8, image: "national-anthem-cd" }
];

let cart = []

function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCartCount();
        alert(`Added ${item.name} to cart!`);
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="https://source.unsplash.com/random/50x50?${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                </div>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });
    }

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function displayShop() {
    const shopItems = document.getElementById('shopItems');
    shopItems.innerHTML = '';

    menuItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item bg-white p-4 rounded shadow';
        itemElement.innerHTML = `
            <img src="https://source.unsplash.com/random/200x200?${item.image}" alt="${item.name}" class="w-full h-40 object-cover mb-2">
            <h4 class="font-bold">${item.name}</h4>
            <p class="text-gray-600">$${item.price}</p>
            <button onclick="addToCart(${item.id})" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add to Cart</button>
        `;
        shopItems.appendChild(itemElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // ... (keep existing slider code)

    // Shop and Cart functionality
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const shopLink = document.getElementById('shopLink');
    const shopModal = document.getElementById('shopModal');
    const closeShop = document.getElementById('closeShop');

    cartIcon.addEventListener('click', function() {
        displayCart();
        cartModal.classList.remove('hidden');
    });

    closeCart.addEventListener('click', function() {
        cartModal.classList.add('hidden');
    });

    shopLink.addEventListener('click', function(e) {
        e.preventDefault();
        displayShop();
        shopModal.classList.remove('hidden');
    });

    closeShop.addEventListener('click', function() {
        shopModal.classList.add('hidden');
    });
});