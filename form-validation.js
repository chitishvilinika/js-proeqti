    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    function validatePasswordsMatch(password, confirmPassword) {
        return password === confirmPassword;
    }

    document.getElementById("save-button").addEventListener("click", function(event) {
        event.preventDefault();
        clearAlerts()

        let messages = [];
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("cpassword").value.trim();
        const date = document.getElementById("date").value.trim();
        const firstName = document.getElementById("fname").value.trim();
        const lastName = document.getElementById("lname").value.trim();
        const country = document.getElementById("country").value.trim();
        const city = document.getElementById("city").value.trim();
        const phone = document.getElementById("phone").value.trim();

        const fields = {
            email,
            password,
            confirmPassword,
            date,
            firstName,
            lastName,
            country,
            city,
            phone
        };

        for (const [fieldName, value] of Object.entries(fields)) {
            if (!value) {
                messages.push(`Please fill in the ${fieldName} field.`);
            }
        }

        if (!validateEmail(email)) {
            messages.push("Please enter a valid email address.");
        }

        if (!validatePasswordsMatch(password, confirmPassword)) {
            messages.push("Passwords do not match.");
        }

        if (messages.length > 0) {
            displayAlerts(messages);
        } else {
            displayValidatedData(fields);
        }
    });

    function displayValidatedData(fields) {
        const validatedDataDiv = document.querySelector(".validated-data");
        validatedDataDiv.style.display = "block";
    
        // Populate fields
        document.querySelector(".email .entered-data").textContent = fields.email;
        const passwordStrength = getPasswordStrength(fields.password);
        document.querySelector(".password .entered-data").textContent = fields.password.replace(/./g, "*");
        document.querySelector(".password .pwd-strength").textContent = passwordStrength.strength;
        document.querySelector(".password .pwd-strength").style.color = passwordStrength.color;
        document.querySelector(".date .entered-data").textContent = fields.date;
        document.querySelector(".fname .entered-data").textContent = fields.firstName;
        document.querySelector(".lname .entered-data").textContent = fields.lastName;
        document.querySelector(".country .entered-data").textContent = fields.country;
        document.querySelector(".city .entered-data").textContent = fields.city;
        document.querySelector(".phone .entered-data").textContent = fields.phone;
    }

    function displayAlerts(messages) {
        const alertContainer = document.getElementById("alert-msg");
        clearAlerts()

        messages.forEach(message => {
            const alertElement = document.createElement("div");
            alertElement.classList.add("alert");
            alertElement.innerHTML = message;

            const closeButton = document.createElement("span");
            closeButton.classList.add("close-alert");
            closeButton.innerHTML = "X";

            closeButton.addEventListener("click", function() {
                alertElement.remove();
            });

            alertElement.appendChild(closeButton);
            alertContainer.appendChild(alertElement);
        });
    }

    function clearAlerts() {
        const alertContainer = document.getElementById("alert-msg");
        alertContainer.innerHTML = '';
    }

    document.getElementById("password").addEventListener("keyup", function () {
        const password = this.value;
        const strengthLabel = document.getElementById("strength");
    
        const passwordStrength = getPasswordStrength(password);
        strengthLabel.textContent = passwordStrength.strength;
        strengthLabel.style.color = passwordStrength.color;
    });

    function getPasswordStrength(password) {
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialOrNumber = /[\d\W]/.test(password);
        const conditionsMet = [hasLowercase, hasUppercase, hasSpecialOrNumber].filter(Boolean).length;
    
        if (conditionsMet === 1) return { strength: "Weak", color: "red" };
        if (conditionsMet === 2) return { strength: "Medium", color: "orange" };
        if (conditionsMet === 3) return { strength: "Strong", color: "green" };

        return { strength: "", color: "" };
    }