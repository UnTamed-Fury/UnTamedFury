const container = document.querySelector("#container"),
      tile = document.querySelector(".tile");

// Create tiles with random opacity for a more dynamic effect
for (let i = 0; i < 1599; i++) {
  const newTile = tile.cloneNode();
  // Add subtle random opacity variation for a more dynamic grid
  newTile.style.opacity = 0.15 + Math.random() * 0.1;
  container.appendChild(newTile);
}

// Throttle function to limit mousemove events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Optimized mouse move effect to create a ripple effect
let animationFrameId = null;
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;

document.addEventListener('mousemove', throttle((e) => {
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;

  if (!isMouseMoving) {
    isMouseMoving = true;
    applyTileTransforms();
  }
}, 16)); // ~60fps

function applyTileTransforms() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  animationFrameId = requestAnimationFrame(() => {
    const tiles = document.querySelectorAll('.tile');
    const speedX = (0.5 - mouseX) * 0.5;
    const speedY = (0.5 - mouseY) * 0.5;

    // Apply transforms in batches for better performance
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      const delay = (i % 40) * 0.01; // Add subtle delay for wave effect

      // Apply subtle movement to tiles for a parallax effect
      tile.style.transform = `translate(${speedX * 2}px, ${speedY * 2}px)`;
    }

    // Continue animation if mouse is still moving
    if (isMouseMoving) {
      applyTileTransforms();
    }
  });
}

// Reset tile positions when mouse stops moving
let mouseMoveTimeout;
document.addEventListener('mousemove', () => {
  clearTimeout(mouseMoveTimeout);

  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.style.transition = 'transform 0.1s ease';
  });

  mouseMoveTimeout = setTimeout(() => {
    isMouseMoving = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
      tile.style.transform = 'translate(0, 0)';
      tile.style.transition = 'transform 0.5s ease';
    });
  }, 100);
});
