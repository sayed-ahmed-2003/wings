
// main.js - shared interactivity for all pages

// 1. Dark / light mode toggle
(function () {
    const storedTheme = localStorage.getItem("wingman-theme");
    if (storedTheme) {
        document.documentElement.setAttribute("data-theme", storedTheme);
    }
    const btn = document.getElementById("themeToggle");
    if (btn) {
        btn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
            const next = current === "dark" ? "light" : "dark";
            if (next === "dark") {
                document.documentElement.setAttribute("data-theme", "dark");
            } else {
                document.documentElement.removeAttribute("data-theme");
            }
            localStorage.setItem("wingman-theme", next);
            btn.textContent = next === "dark" ? "Light mode" : "Dark mode";
        });

        const themeNow = document.documentElement.getAttribute("data-theme");
        btn.textContent = themeNow === "dark" ? "Light mode" : "Dark mode";
    }
})();

// 2. Mobile navigation toggle
(function () {
    const toggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }
})();

// 3. Simple cart counter shared between pages
(function () {
    const cartCountEl = document.getElementById("cartCount");
    let count = parseInt(localStorage.getItem("wingman-cart-count") || "0", 10);
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }

    function updateCart(delta) {
        count += delta;
        if (count < 0) count = 0;
        localStorage.setItem("wingman-cart-count", String(count));
        if (cartCountEl) {
            cartCountEl.textContent = count;
        }
    }

    document.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.classList && target.classList.contains("add-to-cart")) {
            e.preventDefault();
            updateCart(1);
            const original = target.textContent;
            target.textContent = "Added!";
            setTimeout(() => {
                target.textContent = original;
            }, 1000);
        }
    });
})();

// 4. Menu category filter (only active on menu page)
(function () {
    if (document.body.getAttribute("data-page") !== "menu") return;
    const filterButtons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".menu-item");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const category = btn.getAttribute("data-category");
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            items.forEach((item) => {
                const itemCat = item.getAttribute("data-category");
                if (category === "all" || itemCat === category) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
})();

// 5. Contact form validation
(function () {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");
    const successEl = document.getElementById("formSuccess");

    function setError(input, message) {
        const group = input.closest(".form-group");
        if (!group) return;
        input.classList.add("error");
        const small = group.querySelector(".error-message");
        if (small) small.textContent = message;
    }

    function clearError(input) {
        const group = input.closest(".form-group");
        if (!group) return;
        input.classList.remove("error");
        const small = group.querySelector(".error-message");
        if (small) small.textContent = "";
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;
        if (successEl) successEl.textContent = "";

        if (!nameInput.value.trim()) {
            setError(nameInput, "Please enter your name.");
            valid = false;
        } else {
            clearError(nameInput);
        }

        if (!emailInput.value.trim()) {
            setError(emailInput, "Please enter your email.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            setError(emailInput, "Please enter a valid email.");
            valid = false;
        } else {
            clearError(emailInput);
        }

        if (!messageInput.value.trim()) {
            setError(messageInput, "Please enter a message.");
            valid = false;
        } else {
            clearError(messageInput);
        }

        if (valid) {
            if (successEl) successEl.textContent = "Thank you! Your message has been sent (demo).";
            form.reset();
        }
    });
})();

// 6. Scroll-to-top button
(function () {
    const btn = document.getElementById("scrollTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 250) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
})();

// 7. Set current year in footer
(function () {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();
