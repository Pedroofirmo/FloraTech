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

document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector(".input-email").value;
    const senha = document.querySelector(".input-password").value;

    const resposta = await fetch("http://localhost:3333/entrar/entrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });

    const data = await resposta.json();
    console.log(data);

    if (data.usuario) {
        window.location.href = "../index.html";
    } else {
        alert("Email ou senha incorretos.");
    }
});
