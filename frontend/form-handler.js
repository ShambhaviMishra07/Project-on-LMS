document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        console.log("Form submitted:", data);
  
        alert("Form submitted successfully!");
        form.reset();
      });
    }
  });
  