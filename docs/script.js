document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS for animations
    AOS.init();

    // Query Selectors
    const orderButtonInstant = document.querySelector('.btn');
    const orderButtonSmooth = document.querySelector('#btnorder button');
    const contactSection = document.getElementById('contact');
    const messageField = document.getElementById('comment');
    const addCartButtons = document.querySelectorAll('.card-body button');
    const form = document.querySelector('#form');
    const messageDiv = document.getElementById('messageDiv');

    // Cart array to store added items
    const cartItems = [];

    // Function to scroll instantly to the contact section
    function scrollToContactInstant() {
        contactSection.scrollIntoView({ behavior: 'instant' });
    }

    // Function to scroll smoothly to the contact section
    function scrollToContactSmooth() {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }

    // Function to update the contact form message field
    function updateMessage() {
        messageField.value = `I would like to inquire about: ${cartItems.join(', ')}`;
    }

    // Function to show the "Item added" notification
    function showAddedMessage(itemName) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('added-message');
        messageDiv.textContent = `${itemName} added to cart`;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }

    // Add event listeners to buttons
    orderButtonInstant.addEventListener('click', function(event) {
        event.preventDefault();
        scrollToContactInstant();
    });

    orderButtonSmooth.addEventListener('click', function(event) {
        event.preventDefault();
        scrollToContactSmooth();
    });

    addCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.closest('.card-body').querySelector('h3').textContent;

            if (!cartItems.includes(itemName)) {
                cartItems.push(itemName);
                updateMessage();
                showAddedMessage(itemName);
            }

            scrollToContactSmooth();
        });
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from submitting the default way

        const formData = new FormData(this);

        fetch('https://script.google.com/macros/s/AKfycbzYZG73f6XglAC0-hEauZV2QL9UfSxlxV8QRaObBAbwXINWgxzF58Z_fYFGiGMbKO7wkA/exec', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.text())
        .then(result => {
            // Display success message
            messageDiv.innerText = 'YOUR ORDER IS PROCESSING';
            messageDiv.style.color = 'green';

            // Clear the form
            form.reset();
        })
        .catch(error => {
            // Display error message
            messageDiv.innerText = 'Error occurred while submitting the form!';
            messageDiv.style.color = 'red';
            console.error('Error:', error);
        });
    });
});
