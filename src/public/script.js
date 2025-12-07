const container = document.querySelector("#container"),
      tile = document.querySelector(".tile");

// Create tiles with random opacity for a more dynamic effect
for (let i = 0; i < 1599; i++) {
  const newTile = tile.cloneNode();
  // Add subtle random opacity variation for a more dynamic grid
  newTile.style.opacity = 0.15 + Math.random() * 0.1;
  container.appendChild(newTile);
}

// Add mouse move effect to create a ripple effect
document.addEventListener('mousemove', (e) => {
  const tiles = document.querySelectorAll('.tile');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  // Move tiles based on mouse position for a parallax effect
  tiles.forEach((tile, index) => {
    const speedX = (0.5 - x) * 0.5;
    const speedY = (0.5 - y) * 0.5;
    const delay = (index % 40) * 0.01; // Add subtle delay for wave effect

    // Apply subtle movement to tiles for a parallax effect
    setTimeout(() => {
      tile.style.transform = `translate(${speedX * 2}px, ${speedY * 2}px)`;
    }, delay * 1000);
  });
});

// Reset tile positions when mouse stops moving
let mouseMoveTimeout;
document.addEventListener('mousemove', () => {
  clearTimeout(mouseMoveTimeout);
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.style.transition = 'transform 0.1s ease';
  });

  mouseMoveTimeout = setTimeout(() => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
      tile.style.transform = 'translate(0, 0)';
      tile.style.transition = 'transform 0.5s ease';
    });
  }, 100);
});
