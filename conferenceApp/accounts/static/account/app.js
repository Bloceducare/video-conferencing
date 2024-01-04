function toggleMenu() {
    let menuButtons = document.querySelector('.menu-buttons');
    let toggleIcon = document.getElementById('toggleIcon');
    let cancelIcon = document.getElementById('cancelIcon');

    // menuButtons.classList.toggle('active');
    // toggleIcon.style.display = menuButtons.classList.contains('active') ? 'none' : 'block';
    // cancelIcon.style.display = menuButtons.classList.contains('active') ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.getElementById('signin-form');

    signinForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.querySelector('[name="remember-me"]').checked;

        const formData = {
            email: email,
            password: password,
            remember_me: rememberMe,
        };

        fetch('{% url "signin" %}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
    });
});
