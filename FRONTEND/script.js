// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Slider logic
function moveSlider(button, direction) {
    const container = button.closest('.slider-container');
    const images = container.querySelectorAll('.slider-window img');
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    
    images[activeIndex].classList.remove('active');
    images[activeIndex].style.display = 'none';
    
    activeIndex = (activeIndex + direction + images.length) % images.length;
    
    images[activeIndex].classList.add('active');
    images[activeIndex].style.display = 'block';
}

// Initialize sliders (ensuring only first image is visible)
document.querySelectorAll('.slider-window').forEach(window => {
    const images = window.querySelectorAll('img');
    images.forEach((img, index) => {
        if (index === 0) {
            img.classList.add('active');
            img.style.display = 'block';
        } else {
            img.classList.remove('active');
            img.style.display = 'none';
        }
    });
});

// Global Restaurant Card Navigation
document.addEventListener('click', (e) => {
    const card = e.target.closest('.restaurant-card');
    if (card && card.dataset.link) {
        // Capture details for dynamic page display
        const restaurantData = {
            name: card.querySelector('h3').innerText,
            rating: card.querySelector('.rating').innerText,
            cuisine: card.querySelector('.card-details span:first-child').innerText,
            price: card.querySelector('.card-details span:last-child').innerText,
            image: card.querySelector('img').src,
            location: card.dataset.location || "Hyderabad"
        };
        localStorage.setItem('selectedRestaurant', JSON.stringify(restaurantData));
        window.location.href = card.dataset.link;
    }
});
