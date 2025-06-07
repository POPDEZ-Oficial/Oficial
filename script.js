document.addEventListener('DOMContentLoaded', function() {
    // Arrow navigation functionality
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            console.log('Navigate left');
            // Add slide functionality here if needed
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            console.log('Navigate right');
            // Add slide functionality here if needed
        });
    }
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 