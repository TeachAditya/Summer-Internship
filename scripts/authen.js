document.addEventListener('DOMContentLoaded', () => {
    const loginModule = document.getElementById('login-module');
    const signupModule = document.getElementById('signup-module');
    
    const toSignupBtn = document.getElementById('to-signup');
    const toLoginBtn = document.getElementById('to-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');

    toSignupBtn.addEventListener('click', () => {
        loginModule.classList.add('hidden');
        signupModule.classList.remove('hidden');
    });

    toLoginBtn.addEventListener('click', () => {
        signupModule.classList.add('hidden');
        loginModule.classList.remove('hidden');
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            loginMessage.textContent = data.message || 'Login failed';
            loginMessage.style.color = response.ok ? '#0d7a70' : '#d9534f';

            if (response.ok && data.user) {
                window.flavorshareAuth.saveCurrentUser(data.user);
                window.location.href = 'main_home.html';
            }
        } catch (error) {
            loginMessage.textContent = 'Unable to reach the server';
            loginMessage.style.color = '#d9534f';
        }
    });

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            signupMessage.textContent = data.message || 'Signup failed';
            signupMessage.style.color = response.ok ? '#0d7a70' : '#d9534f';

            if (response.ok && data.user) {
                window.flavorshareAuth.saveCurrentUser(data.user);
                window.location.href = 'main_home.html';
            }
        } catch (error) {
            signupMessage.textContent = 'Unable to reach the server';
            signupMessage.style.color = '#d9534f';
        }
    });
});
