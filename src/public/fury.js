// Only run this script on the homepage (check if body has class 'home-page')
if (document.body.classList.contains('home-page')) {
  const element = document.querySelector("h1[data-value]");

  if (element) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;

    // Check if we're already animating to prevent multiple triggers
    let isAnimating = false;

    function animateText(event) {
      if (isAnimating) return; // Prevent multiple animations

      isAnimating = true;
      let iteration = 0;
      clearInterval(interval);

      // Add visual effect to the element during animation
      event.target.style.transform = "scale(1.05)";
      event.target.style.textShadow = "0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)";

      interval = setInterval(() => {
        // Only update the text that's not yet revealed
        const currentText = event.target.innerText;
        const targetValue = event.target.dataset.value;

        event.target.innerText = currentText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetValue[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= targetValue.length) {
          clearInterval(interval);
          // Reset visual effects after animation completes
          setTimeout(() => {
            event.target.style.transform = "scale(1)";
            event.target.style.textShadow = "0 0 70px rgba(255,255,255,0.35)";
            isAnimating = false;
          }, 300);
        }

        iteration += 1 / 3;
      }, 30);
    }

    // Add additional visual effect on mouse enter
    element.addEventListener('mouseenter', (e) => {
      // Only apply hover effect if not animating
      if (!isAnimating) {
        e.target.style.transform = "scale(1.03)";
      }
    });

    // Reset when mouse leaves
    element.addEventListener('mouseleave', (e) => {
      if (!isAnimating) { // Only reset if not currently animating
        e.target.style.transform = "scale(1)";
      }
    });

    // Add click and hover effects - remove duplicate event
    element.addEventListener('mouseover', animateText);
    element.addEventListener('click', animateText);
  }
}
