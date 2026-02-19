document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const responseDiv = document.getElementById("response");
  const API_URL = "https://ajm-judo.onrender.com";

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    responseDiv.innerText = "";
    responseDiv.className = "";

    const recaptchaToken = grecaptcha.getResponse();

    if (!recaptchaToken) {
      responseDiv.innerText = "Veuillez valider le reCAPTCHA.";
      responseDiv.classList.add("text-danger");
      return;
    }

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      recaptchaToken
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      responseDiv.innerText = "Message envoyé avec succès !";
      responseDiv.classList.add("text-success");

      form.reset();
      grecaptcha.reset();

    } catch (error) {
      console.error("Erreur :", error);
      responseDiv.innerText = error.message || "Erreur lors de l'envoi.";
      responseDiv.classList.add("text-danger");
    }

  });

});

