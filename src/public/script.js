// Optimized tile creation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createTiles);
} else {
  createTiles();
}

function createTiles() {
  const container = document.querySelector("#container");
  const tile = document.querySelector(".tile");

  // Store a tile template to improve performance
  const tileTemplate = tile.cloneNode();
  container.removeChild(tile); // Remove the original tile since we will add it back programmatically

  // Use DocumentFragment to reduce DOM manipulations
  const fragment = document.createDocumentFragment();

  // Create tiles with random opacity for a more dynamic effect
  for (let i = 0; i < 1600; i++) { // Changed to 1600 to include the original tile
    const newTile = tileTemplate.cloneNode();
    // Add subtle random opacity variation for a more dynamic grid
    newTile.style.opacity = 0.15 + Math.random() * 0.1;
    fragment.appendChild(newTile);
  }

  container.appendChild(fragment);
}

// Optimized mouse move effect using passive event listener
let animationFrameId = null;
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;

// Use requestAnimationFrame to batch DOM updates
function handleMouseMove(e) {
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;

  if (!isMouseMoving) {
    isMouseMoving = true;
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(applyTileTransforms);
    }
  }
}

// Add passive option for better performance
document.addEventListener('mousemove', handleMouseMove, { passive: true });

function applyTileTransforms() {
  const speedX = (0.5 - mouseX) * 0.5;
  const speedY = (0.5 - mouseY) * 0.5;

  // Cache tile elements to avoid repeated DOM queries
  const tiles = document.querySelectorAll('.tile');

  // Use CSS transforms for better performance than changing other properties
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    // Apply subtle movement to tiles for a parallax effect
    tile.style.transform = `translate3d(${speedX * 2}px, ${speedY * 2}px, 0)`;
  }

  // Continue animation if mouse is still moving
  if (isMouseMoving) {
    animationFrameId = requestAnimationFrame(applyTileTransforms);
  }
}

// Reset tile positions when mouse stops moving
let mouseMoveTimeout;
const handleMouseMoveWithTimeout = (e) => {
  // Update mouse position immediately
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;

  clearTimeout(mouseMoveTimeout);

  // Add class to enable transitions only when needed
  if (!isMouseMoving) {
    isMouseMoving = true;
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(applyTileTransforms);
    }
  }

  mouseMoveTimeout = setTimeout(() => {
    isMouseMoving = false;

    // Reset transforms gradually using CSS transitions
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    const tiles = document.querySelectorAll('.tile');
    // Animate back to original position
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].style.transform = 'translate3d(0, 0, 0)';
    }
  }, 100);
};

// Use passive event listener
document.addEventListener('mousemove', handleMouseMoveWithTimeout, { passive: true });
