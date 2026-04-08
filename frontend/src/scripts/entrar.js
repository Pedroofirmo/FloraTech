document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.querySelector('.input-password');
    const togglePassword = document.querySelector('.toggle-password');
    const formLogin = document.getElementById('form-login');

    // --- 1. CONFIGURAÇÃO DE CREDENCIAIS ---
    const EMAIL_CORRETO = "admin@floratech.com";
    const SENHA_CORRETA = "123456";

    // --- 2. LÓGICA DE MOSTRAR/ESCONDER SENHA ---
    if (passwordInput && togglePassword) {
        const IMAGE_PATH_BASE = '../assets/img/'; // Ajustado para a pasta assets
        const VISIBLE_ICON = 'visivel.svg';
        const INVISIBLE_ICON = 'invisivel.svg'; 

        togglePassword.addEventListener('click', function() {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            const newType = isPassword ? 'text' : 'password';
            
            passwordInput.setAttribute('type', newType);
            
            // Troca a imagem de fundo do ícone
            if (isPassword) {
                togglePassword.style.backgroundImage = `url('${IMAGE_PATH_BASE}${VISIBLE_ICON}')`;
            } else {
                togglePassword.style.backgroundImage = `url('${IMAGE_PATH_BASE}${INVISIBLE_ICON}')`;
            }
            this.classList.toggle('active');
        });
    }

    // --- 3. LÓGICA DE LOGIN ---
    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o recarregamento da página

            const emailDigitado = document.querySelector('.input-email').value;
            const senhaDigitada = document.querySelector('.input-password').value;

            console.log("Tentativa de login com:", emailDigitado);

            // Validação manual
            if (emailDigitado === EMAIL_CORRETO && senhaDigitada === SENHA_CORRETA) {
                
                // --- AJUSTE DE CAMINHO ---
                // Se você está em src/pages/entrar.html e quer ir para src/pages/floratech.html:
                window.location.href = "https://www.figma.com/proto/gxKNThQlKO7dBDP7fHeX2L/Untitled?page-id=0%3A1&node-id=100-18&p=f&viewport=45%2C201%2C0.1&t=kyU1VRtzgq0SRSJs-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=100%3A531"; 

            } else {
                alert("Usuário não identificado. Verifique seu e-mail e senha.");
                document.querySelector('.input-password').value = "";
            }
        });
    }
});