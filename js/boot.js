// js/boot.js
async function boot() {
  const bootEl = document.getElementById('boot-text');
  bootEl.style.whiteSpace = 'pre-wrap';
  bootEl.style.textAlign = 'left';
  bootEl.textContent = '\n'.repeat(17); // simulate starting at line 18

  const lines = [
    '[BOOT]   Launching Fury Shell v1.32.52',
    '[INFO]   Waking up sleepy electrons...',
    '[OK]     Hostname: fury.local (still cooler than Jarvis)',
    '[OK]     OS: Fury OS 1.0.8 (pre-release)',
    '[INFO]   Counting cores... yep, still 2 of them',
    '[OK]     RAM: 4096 MB – half used by memes',
    '[INFO]   Summoning the network gods...',
    '[OK]     Internet: Connected (we stole the neighbor’s Wi-Fi)',
    '[INFO]   Mounting volumes... not emotionally',
    '[OK]     /home mounted – your secrets are safe. Probably.',
    '[INFO]   Setting system time... pretending it matters',
    '[OK]     Time synced: Not from a DeLorean',
    '[INFO]   Verifying user... user-temp detected (test mode activated)',
    '[OK]     Fans spinning like they’re at a rave',
    '[INFO]   Feeding caffeine to Fury modules...',
    '[OK]     Terminal UI booted with extra flair',
    '[OK]     Command engine: sass mode ON',
    '[WARN]   Talking to AI... it’s judging you silently',
    '[READY]  Fury Shell is ready to roll.'
  ];

  // Helper to type one character at a time
  async function typeLine(line, speed = 16) {
    for (const char of line) {
      bootEl.textContent += char;
      bootEl.scrollTop = bootEl.scrollHeight;
      await new Promise(r => setTimeout(r, speed));
    }
    bootEl.textContent += '\n';
  }

  // Type each line with occasional slowdowns
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const delay = [5, 8, 13].includes(i) ? 60
                : [2, 9, 14, 17].includes(i) ? 30
                : 16;
    await typeLine(line, delay);
  }

  // Pause before transition
  await new Promise(r => setTimeout(r, 700));

  // Fade out boot screen and fade in main UI with blur effect
  anime({
    targets: '#loading-screen',
    opacity: [1, 0],
    duration: 600,
    easing: 'easeInOutQuad',
    complete: () => {
      // Hide boot
      document.getElementById('loading-screen').style.display = 'none';
      // Show and trigger transition on main UI
      const main = document.getElementById('main-ui');
      main.style.display = '';
      main.classList.add('ready');
      // Focus the terminal input
      document.getElementById('terminal-input')?.focus();
    }
  });
}

boot();
