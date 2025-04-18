document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = this.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";

    const formData = {
      name: this.name.value,
      email: this.email.value,
      role: this.role.value,
      companyName: this.companyName.value,
      companyWebsite: this.companyWebsite.value,
      companySize: this.companySize.value,
      revenue: this.revenue.value,
      budget: this.budget.value,
      services: this.services.value,
      help: this.help.value
    };

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        Toastify({
          text: "Message sent successfully!",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#28a745",
        }).showToast();

        this.reset();
      } else {
        Toastify({
          text: "Failed: " + result.message,
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#dc3545",
        }).showToast();
      }
    } catch (error) {
      console.error("Error:", error);
      Toastify({
        text: "An error occurred. Please try again later.",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#dc3545",
      }).showToast();
    } finally {
      submitButton.disabled = false;
      submitButton.style.opacity = "1";
    }
  });
});
