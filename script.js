document.addEventListener("DOMContentLoaded", function() {

    // 1. FAQ Accordion Functionality
    const faqItems = document.querySelectorAll(".faq-item");

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");

            question.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                
                // Toggle the active class on the clicked item
                if (isActive) {
                    item.classList.remove("active");
                } else {
                    item.classList.add("active");
                }
            });
        });
    }

    // 2. Mobile Menu (Hamburger) Functionality
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            // Toggle icon between bars and 'X'
            const icon = menuToggle.querySelector("i");
            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
        
        // Close menu when a link is clicked (for single-page navigation)
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("active")) {
                    navLinks.classList.remove("active");
                    menuToggle.querySelector("i").classList.remove("fa-times");
                    menuToggle.querySelector("i").classList.add("fa-bars");
                }
            });
        });
    }

    // 3. Auth Page Role Selector
    const roleOptions = document.querySelectorAll(".role-option");

    if (roleOptions.length > 0) {
        roleOptions.forEach(option => {
            option.addEventListener("click", () => {
                // Remove 'active' class from all options
                roleOptions.forEach(opt => opt.classList.remove("active"));
                
                // Add 'active' class to the clicked option
                option.classList.add("active");
            });
        });
    }

    // 4. Login Form Success Modal & Redirect
    const loginForm = document.getElementById("login-form");
    const loginSuccessModal = document.getElementById("login-success-modal");

    if (loginForm && loginSuccessModal) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop the form from submitting normally
            loginSuccessModal.classList.add("show");
            setTimeout(() => {
                window.location.href = "index.html"; // Redirect to homepage
            }, 2500); 
        });
    }

    // 5. Sign-up Form Success Modal & Redirect
    const signupForm = document.getElementById("signup-form");
    const signupSuccessModal = document.getElementById("signup-success-modal");

    if (signupForm && signupSuccessModal) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop the form from submitting normally
            signupSuccessModal.classList.add("show");
            setTimeout(() => {
                window.location.href = "index.html"; // Redirect to homepage
            }, 2500);
        });
    }

    // 6. NEW: Plan Details Page Logic
    if (document.body.classList.contains('plan-details-page')) {
        
        // Data for all our plans
        const planData = {
            'veg-weekly': {
                title: 'Veg Weekly',
                description: 'Perfect for short-term vegetarian meals, giving you a taste of home without a long commitment.',
                price: '₹1,200',
                priceUnit: '/week',
                features: [
                    '7 vegetarian meals',
                    'Lunch or dinner',
                    'Dedicated mom chef',
                    'Fresh ingredients',
                    'Free delivery',
                    'Cancel anytime'
                ]
            },
            'veg-monthly-1x': {
                title: 'Veg Monthly (1x/day)',
                description: 'Our most affordable monthly plan for delicious, hygienic vegetarian meals once a day.',
                price: '₹1,500',
                priceUnit: '/month',
                features: [
                    '30 vegetarian meals',
                    'Lunch or dinner',
                    'Dedicated mom chef',
                    'Dietary customization',
                    'Free delivery',
                    '24/7 support'
                ]
            },
            'veg-monthly-2x': {
                title: 'Veg Monthly (2x/day)',
                description: 'The "Most Popular" complete solution. Get delicious, home-cooked vegetarian meals for both lunch and dinner.',
                price: '₹3,000',
                priceUnit: '/month',
                features: [
                    '60 vegetarian meals',
                    'Lunch & dinner',
                    'Premium mom chef',
                    'Full customization',
                    'Free delivery',
                    'Weekend specials',
                    '24/7 support'
                ]
            },
            'non-veg-monthly': {
                title: 'Non-Veg Monthly',
                description: 'Our premium non-vegetarian subscription, focused on high-quality ingredients and high protein.',
                price: '₹3,800',
                priceUnit: '/month',
                features: [
                    '30 non-veg meals',
                    'Served once daily',
                    'Premium ingredients',
                    'Chicken, fish & eggs',
                    'Free delivery',
                    'Priority support',
                    'High protein focus'
                ]
            }
        };

        // Function to get URL parameters
        const getPlanFromURL = () => {
            const params = new URLSearchParams(window.location.search);
            return params.get('plan');
        };

        // Function to update the page
        const loadPlanDetails = () => {
            const planId = getPlanFromURL();
            const plan = planData[planId] || planData['veg-monthly-2x']; // Default to popular plan if invalid

            // --- Update Main Content ---
            document.getElementById('plan-title').textContent = plan.title;
            document.getElementById('plan-description').textContent = plan.description;

            // --- Update Features List ---
            const featuresList = document.getElementById('plan-features');
            featuresList.innerHTML = ''; // Clear loading text
            plan.features.forEach(feature => {
                featuresList.innerHTML += `<li><i class="fas fa-check"></i> ${feature}</li>`;
            });

            // --- Update Payment Summary ---
            document.getElementById('summary-plan-name').textContent = `${plan.title} (${plan.priceUnit})`;
            document.getElementById('summary-plan-price').textContent = plan.price;
            document.getElementById('summary-total-price').textContent = plan.price;
        };

        // --- Handle Payment Form Submission ---
        const paymentForm = document.getElementById('payment-form');
        const paymentSuccessModal = document.getElementById('payment-success-modal');

        if (paymentForm && paymentSuccessModal) {
            paymentForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Stop form submission
                
                // Show success modal
                paymentSuccessModal.classList.add('show');

                // Redirect after 2.5 seconds
                setTimeout(() => {
                    window.location.href = "index.html"; // Back to home
                }, 2500);
            });
        }

        // Load the details when the page opens
        loadPlanDetails();
    }

});