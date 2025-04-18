document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribe-form");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = this.email.value.trim();

    if (!email) {
      Toastify({
        text: "Please enter your email.",
        backgroundColor: "#ff6b6b",
        duration: 3000,
      }).showToast();
      return;
    }

    // Disable the button while sending
    const button = this.querySelector("button");
    button.disabled = true;
    button.style.opacity = "0.5";

    try {
      const response = await fetch("http://localhost:5000/api/email/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (response.ok) {
        Toastify({
          text: "Subscribed successfully!",
          backgroundColor: "#4BB543",
          duration: 3000,
        }).showToast();
        this.reset();
      } else {
        Toastify({
          text: result.error || "Subscription failed.",
          backgroundColor: "#ff6b6b",
          duration: 3000,
        }).showToast();
      }
    } catch (error) {
      console.error(error);
      Toastify({
        text: "Something went wrong. Try again.",
        backgroundColor: "#ff6b6b",
        duration: 3000,
      }).showToast();
    }

    button.disabled = false;
    button.style.opacity = "1";
  });
});
