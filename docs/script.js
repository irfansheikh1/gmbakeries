document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS for animations
    AOS.init();
});

document.addEventListener('DOMContentLoaded', function() {
    // Query Selectors
    var orderButtonInstant = document.querySelector('.btn');
    var orderButtonSmooth = document.querySelector('#btnorder button');
    var contactSection = document.getElementById('contact');
    var messageField = document.getElementById('comment');
    var addCartButtons = document.querySelectorAll('.card-body button');

    // Function to scroll instantly to the contact section
    orderButtonInstant.addEventListener('click', function(event) {
        event.preventDefault();
        contactSection.scrollIntoView({ behavior: 'instant' });
    });

    // Function to scroll smoothly to the contact section
    orderButtonSmooth.addEventListener('click', function(event) {
        event.preventDefault();
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    });

    // Cart array to store added items
    var cartItems = [];

    // Function to update the contact form message field
    function updateMessage() {
        messageField.value = `I would like to inquire about : ${cartItems.join(' , ')}`;
    }

    // Function to show the "Item added" notification
    function showAddedMessage(itemName) {
        var messageDiv = document.createElement('div');
        messageDiv.classList.add('added-message');
        messageDiv.textContent = `${itemName} added to cart`;

        document.body.appendChild(messageDiv);

        setTimeout(function() {
            document.body.removeChild(messageDiv);
        }, 3000);
    }

    // Function to scroll smoothly to the contact section
    function scrollToContact() {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }

    // Add click /event listeners to all "Add Cart" buttons
    addCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var itemName = this.closest('.card-body').querySelector('h3').textContent;

            if (!cartItems.includes(itemName)) {
                cartItems.push(itemName);
                updateMessage();
                showAddedMessage(itemName);
            }

            scrollToContact();
        });
    });
});
