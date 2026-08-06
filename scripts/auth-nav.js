(function () {
    const STORAGE_KEY = 'flavorshare-user';

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getCurrentUser() {
        try {
            const storedUser = localStorage.getItem(STORAGE_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            return null;
        }
    }

    function saveCurrentUser(user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }

    function clearCurrentUser() {
        localStorage.removeItem(STORAGE_KEY);
    }

    function renderAuthNav() {
        const navRight = document.querySelector('.nav-right');
        if (!navRight) return;

        const user = getCurrentUser();
        if (user) {
            navRight.innerHTML = `
                <span class="user-greeting">Hello, ${escapeHtml(user.name || 'there')}</span>
                <a href="#" class="signup-btn logout-link">Log out</a>
            `;
        } else {
            navRight.innerHTML = `
                <a href="authen.html" class="login-btn">Login</a>
                <a href="authen.html" class="signup-btn">Sign Up</a>
            `;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderAuthNav();

        if (window.location.pathname.toLowerCase().endsWith('/authen.html') || window.location.pathname.toLowerCase().endsWith('authen.html')) {
            if (getCurrentUser()) {
                window.location.replace('main_home.html');
            }
        }

        document.addEventListener('click', (event) => {
            const logoutLink = event.target.closest('.logout-link');
            if (!logoutLink) return;

            event.preventDefault();
            clearCurrentUser();
            renderAuthNav();
            if (window.location.pathname.toLowerCase().endsWith('/main_home.html') || window.location.pathname.toLowerCase().endsWith('main_home.html')) {
                window.location.reload();
            } else {
                window.location.href = 'main_home.html';
            }
        });
    });

    window.flavorshareAuth = {
        getCurrentUser,
        saveCurrentUser,
        clearCurrentUser,
        renderAuthNav
    };
})();
