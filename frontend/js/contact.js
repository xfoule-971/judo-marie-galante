document.getElementById("contactForm")
.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    firstname: e.target.firstname.value,
    email: e.target.email.value,
    request: e.target.request.value,
    message: e.target.message.value
  };

  const response = await fetch("http://localhost:4000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const data = await response.json();
  document.getElementById("response").innerText =
    data.message || "Erreur lors de l'envoi.";
});
