const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

const element = document.querySelector("h1");

function animateText(event) {
  let iteration = 0;
  clearInterval(interval);

  // Add visual effect to the element during animation
  event.target.style.transform = "scale(1.05)";
  event.target.style.textShadow = "0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)";

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
      // Reset visual effects after animation completes
      setTimeout(() => {
        event.target.style.transform = "scale(1)";
        event.target.style.textShadow = "0 0 70px rgba(255,255,255,0.35)";
      }, 300);
    }

    iteration += 1 / 3;
  }, 30);
}

// Add additional visual effect on mouse enter
element.addEventListener('mouseenter', (e) => {
  e.target.style.transform = "scale(1.03)";
  e.target.style.transition = "transform 0.3s ease, text-shadow 0.3s ease";
});

// Reset when mouse leaves
element.addEventListener('mouseleave', (e) => {
  if (!interval) { // Only reset if not currently animating
    e.target.style.transform = "scale(1)";
  }
});

// Add click and hover effects
element.onmouseover = animateText;
element.onclick = animateText;

// Add a subtle pulse effect to make it more alive
let pulseInterval = setInterval(() => {
  if (!interval) { // Only pulse when not animating
    element.style.transform = "scale(1.02)";
    setTimeout(() => {
      if (!interval) { // Reset only if still not animating
        element.style.transform = "scale(1)";
      }
    }, 500);
  }
}, 3000);
