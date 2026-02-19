document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const responseDiv = document.getElementById("response");
  const API_URL = 'https://ajm-judo.onrender.com';

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("Formulaire envoyé");

    const formData = {
      name: form.name.value,
      firstname: form.firstname.value,
      email: form.email.value,
      request: form.request.value,
      message: form.message.value
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if(!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`)
      }

      const data = await response.json();

      responseDiv.innerText = data.message || "Message envoyé !";
      responseDiv.classList.add("text-success");

      form.reset();

    } catch (error) {
      console.error("Détails de l'erreur :", error);
      responseDiv.innerText = "Erreur lors de l'envoi.";
      responseDiv.classList.add("text-danger");
    }

  });

});

