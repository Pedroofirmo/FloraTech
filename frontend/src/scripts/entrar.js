document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.querySelector('.input-password');
    const togglePassword = document.querySelector('.toggle-password');

    const IMAGE_PATH_BASE = 'src/assets/img/';
    const VISIBLE_ICON = 'visivel.svg';
    const INVISIBLE_ICON = 'invisivel.svg'; 

    if (passwordInput && togglePassword) {
        
        togglePassword.addEventListener('click', function() {
            
            const isPassword = passwordInput.getAttribute('type') === 'password';
            const newType = isPassword ? 'text' : 'password';
            
            passwordInput.setAttribute('type', newType);
            
            if (isPassword) {
                togglePassword.style.backgroundImage = `url('${IMAGE_PATH_BASE}${VISIBLE_ICON}')`;
            } else {
                togglePassword.style.backgroundImage = `url('${IMAGE_PATH_BASE}${INVISIBLE_ICON}')`;
            }
        });
    }
});