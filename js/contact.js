// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate email
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you for your message, ${name}! I'll get back to you soon.</p>
    `;
    
    // Insert after the form
    this.parentNode.insertBefore(successMsg, this.nextSibling);
    
    // Reset form
    this.reset();
    
    // Scroll to success message
    successMsg.scrollIntoView({ behavior: 'smooth' });
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});