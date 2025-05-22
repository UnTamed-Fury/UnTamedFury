// js/terminal.js
const outEl   = document.getElementById('terminal-output');
const inEl    = document.getElementById('terminal-input');
const CMDS    = [
  'help','about','projects','social','connect',
  'skills','whoami','echo','history','clear',
  'buymecoffee','neofetch'
];
const hist    = [];
let histIdx   = -1;
const fuse    = new Fuse(CMDS, { threshold: 0.3 });

function appendOutput(txt) {
  const d = document.createElement('div');
  d.className = 'box-output';
  d.textContent = txt;
  outEl.append(d);
  outEl.scrollTop = outEl.scrollHeight;
}

function createBox(title, lines) {
  const el = document.createElement('div');
  el.className = 'box-output';
  const w = Math.max(title.length, ...lines.map(l => l.length)) + 4;
  const top = '╭' + '─'.repeat(w) + '╮';
  const hdr = `│ ${title}${' '.repeat(w - title.length - 1)}│`;
  const mids = lines.map(l => `│ ${l}${' '.repeat(w - l.length - 1)}│`);
  const bot = '╰' + '─'.repeat(w) + '╯';
  el.textContent = [top, hdr, ...mids, bot].join('\n');
  return el;
}

function createMiniBox(text) {
  const el = document.createElement('div');
  el.className = 'box-output';
  const w = text.length + 2;
  el.textContent = [
    '┌' + '─'.repeat(w) + '┐',
    `│ ${text} │`,
    '└' + '─'.repeat(w) + '┘'
  ].join('\n');
  return el;
}

function run(cmdLine) {
  if (!cmdLine) return;
  appendOutput(`$ ~ ${cmdLine}`);
  hist.push(cmdLine);
  histIdx = hist.length;
  const [cmd, ...args] = cmdLine.trim().split(/\s+/);
  let out;

  switch (cmd) {
    case 'help':
      out = createBox('Commands', CMDS);
      appendOutput(out);
      break;

    case 'about':
      out = createBox('About Me', ['Short about me here']);
      appendOutput(out);
      break;

    case 'projects':
      out = createBox('My Projects', ['Naiko', 'Phub']);
      appendOutput(out);
      break;

    case 'social':
      out = createBox('Social Media', ['Instagram: untamed_fury_']);
      appendOutput(out);
      break;

    case 'connect':
      out = createBox('Code Profiles', ['GitHub: UnTamed-Fury']);
      appendOutput(out);
      break;

    case 'skills':
      out = createBox('Learning Journey', ['Bash [███████░░░] 7/10']);
      appendOutput(out);
      break;

    case 'whoami':
      appendOutput('Fetching your IP addresses…');
      // Fetch IPv4 and IPv6 concurrently
      Promise.all([
        fetch('https://api.ipify.org?format=json').then(r => r.json()).catch(() => null),
        fetch('https://api64.ipify.org?format=json').then(r => r.json()).catch(() => null)
      ]).then(([v4, v6]) => {
        if (v4 && v4.ip) appendOutput(`User identity: IPv4 ${v4.ip}`);
        else appendOutput('User identity: IPv4 unavailable');

        if (v6 && v6.ip) appendOutput(`User identity: IPv6 ${v6.ip}`);
        else appendOutput('User identity: IPv6 unavailable');
      });
      break;

    case 'echo':
      out = args.length
        ? createMiniBox(args.join(' '))
        : createBox('Echo Command', ['Usage: echo [text]']);
      appendOutput(out);
      break;

    case 'history':
      out = createBox('Command History', hist.map((c, i) => `${i + 1}. ${c}`));
      appendOutput(out);
      break;

    case 'buymecoffee':
      out = createBox('Support', ['https://buymeacoffee.com/untamedfury']);
      appendOutput(out);
      break;

    case 'neofetch':
      out = [
        '            .---.        Fury Shell v1.0',
        "         .'_:___\".       ===========================",
        "         |__ --==|       OS: Ubuntu 24.04 LTS (64-bit)",
        "         [  ]  :[|       Host: fury.local",
        "         |__| I=[|       Uptime: 42 minutes (and counting)",
        "         / / ____|       Packages: 1337 (nice)",
        "        |-/ .____.'       Shell: /bin/fury",
        "       /___\\ /___\\       Resolution: 1920x1080 (terminal-chic)",
        "                         Terminal: Custom Web TTY",
        "                                                                             Fury Info        CPU: 4x Intel i7 @ 2.90GHz",
        "        ------------     RAM: 8192MB (42% hoarded by Fury)",
        "                         GPU: LOL integrated (do you even game?)",
        "                         IP: 192.168.1.42 (stealth mode)",
        "",
        '         “Booted faster than your brain on Monday”'
      ].join('\n');
      appendOutput(out);
      break;

    case 'clear':
      outEl.innerHTML = '';
      break;

    default:
      out = createBox('Error', [`Unknown command: ${cmd}`]);
      appendOutput(out);
  }
}

// Autocomplete
let dropdown;
function showAC(prefix) {
  if (dropdown) dropdown.remove();
  const matches = fuse.search(prefix).slice(0, 5).map(r => r.item);
  if (!matches.length) return;
  dropdown = document.createElement('div');
  dropdown.className = 'autocomplete-list';
  matches.forEach((m, i) => {
    const d = document.createElement('div');
    d.className = 'autocomplete-item' + (i === 0 ? ' active' : '');
    d.textContent = m;
    d.onclick = () => {
      inEl.value = m + ' ';
      dropdown.remove();
      inEl.focus();
    };
    dropdown.append(d);
  });
  document.body.append(dropdown);
  const { x, y, height } = inEl.getBoundingClientRect();
  dropdown.style.left = `${x}px`;
  dropdown.style.top = `${y + height}px`;
}

inEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    run(inEl.value.trim());
    inEl.value = '';
    if (dropdown) dropdown.remove();
  } else if (e.key === 'Tab') {
    e.preventDefault();
    showAC(inEl.value);
  } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && dropdown) {
    const items = [...dropdown.children];
    let i = items.findIndex(it => it.classList.contains('active'));
    items[i].classList.remove('active');
    i = (i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
    items[i].classList.add('active');
    e.preventDefault();
  }
});
