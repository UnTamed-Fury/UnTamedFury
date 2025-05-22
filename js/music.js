// js/music.js
async function initMusic() {
  const listEl  = document.getElementById('song-list');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  // Ensure audio element exists
  let audio = document.getElementById('audio');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'audio';
    audio.preload = 'metadata';
    document.body.appendChild(audio);
  }

  // Fetch song list
  const res = await fetch('/songs');
  const songs = await res.json();
  if (!songs.length) {
    listEl.innerHTML = '<div>No songs found.</div>';
    return;
  }

  let current = 0;

  // Highlight active track
  function highlight() {
    [...listEl.children].forEach((div, idx) => {
      div.classList.toggle('active', idx === current);
    });
  }

  // Play a specific track
  function playTrack(idx = current) {
    current = idx;
    audio.src = `/songs/${encodeURIComponent(songs[current])}`;
    audio.play().catch(() => {});
    highlight();
  }

  function next() {
    playTrack((current + 1) % songs.length);
  }

  function prev() {
    playTrack((current - 1 + songs.length) % songs.length);
  }

  // Populate the song list UI
  listEl.innerHTML = '';
  songs.forEach((song, idx) => {
    const div = document.createElement('div');
    div.textContent = song;
    div.onclick = () => playTrack(idx);
    listEl.appendChild(div);
  });

  // Initialize control icons
  prevBtn.textContent = '⏮';
  playBtn.textContent = '▶';
  nextBtn.textContent = '⏭';

  // Button handlers
  playBtn.onclick = () => {
    audio.paused ? audio.play() : audio.pause();
  };
  prevBtn.onclick = prev;
  nextBtn.onclick = next;
  audio.onended = next;

  // Sync icon with playback state
  audio.addEventListener('play',  () => playBtn.textContent = '❚❚');
  audio.addEventListener('pause', () => playBtn.textContent = '▶');

  // Auto-play first track
  playTrack(0);
}

initMusic();
