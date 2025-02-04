document.addEventListener("DOMContentLoaded", function () {
    // Adiciona o botão do WhatsApp
    const whatsappButton = document.createElement("a");
    whatsappButton.href = "https://wa.me/5554996451336";
    whatsappButton.target = "_blank";
    whatsappButton.classList.add("whatsapp-button");

    const whatsappImg = document.createElement("img");
    whatsappImg.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
    whatsappImg.alt = "WhatsApp";
    whatsappImg.setAttribute("aria-hidden", "true");

    whatsappButton.appendChild(whatsappImg);
    document.body.appendChild(whatsappButton);

    // Captura o envio do formulário de contato
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();

            if (name && email && phone) {
                // Exibe uma mensagem de sucesso
                const successMessage = document.createElement("p");
                successMessage.textContent = "Mensagem enviada com sucesso! Logo entraremos em contato com você. Aguarde!";
                successMessage.classList.add("form-success");
                contactForm.appendChild(successMessage);

                // Limpa o formulário após 2 segundos
                setTimeout(() => {
                    contactForm.reset();
                    successMessage.remove();
                }, 10000);
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }

    // Função de geolocalização
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
        } else {
            document.getElementById("location").innerHTML = "Geolocalização não suportada por este navegador.";
        }
    }

    function showPosition(position) {
        const lat = position.coords.latitude.toFixed(6);
        const lon = position.coords.longitude.toFixed(6);
        document.getElementById("location").innerHTML = `Sua localização: Latitude: ${lat}, Longitude: ${lon}`;
    }

    function handleLocationError(error) {
        let errorMessage = "Erro ao obter localização.";
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = "Permissão de geolocalização negada pelo usuário.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = "Informações de localização indisponíveis.";
                break;
            case error.TIMEOUT:
                errorMessage = "A solicitação de geolocalização expirou.";
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = "Ocorreu um erro desconhecido.";
                break;
        }
        document.getElementById("location").innerHTML = errorMessage;
    }

    // Rolagem suave para os links do menu
    const links = document.querySelectorAll(".menu a");
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Animação ao rolar para seções
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Para de observar após a animação
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });

    // Adiciona um botão de "Voltar ao Topo"
    const backToTopButton = document.createElement("button");
    backToTopButton.textContent = "↑";
    backToTopButton.classList.add("back-to-top");
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Mostra ou esconde o botão "Voltar ao Topo" ao rolar
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Menu retrátil
    const mobileMenu = document.getElementById('mobile-menu');
    const menu = document.querySelector('.navbar .menu');

    mobileMenu.addEventListener('click', () => {
        menu.classList.toggle('active');  // Alterna a classe 'active' que mostra/oculta o menu
    });
});
