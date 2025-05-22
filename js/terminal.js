// js/terminal.js
let CMD_MAP = {};
const historyLog = [];
let historyIdx = -1;
const bootTime = window.__furyBootTime || Date.now();

const outEl = document.getElementById('terminal-output');
const inEl  = document.getElementById('terminal-input');

// Load commands
fetch('/cmd.json')
  .then(r => r.json())
  .then(cmds => { cmds.forEach(c => CMD_MAP[c.cmd]=c); initTerminal(); })
  .catch(() => initTerminal());

function appendOutput(html) {
  const d = document.createElement('div');
  d.className = 'box-output';
  d.innerHTML = html;
  outEl.append(d);
  outEl.scrollTop = outEl.scrollHeight;
}

// Box helper (still used by dynamic commands)
function createBox(title, lines) {
  const strip = s=>s.replace(/<[^>]+>/g,'');
  const w = Math.max(strip(title).length, ...lines.map(l=>strip(l).length)) + 4;
  const top = '╭'+'─'.repeat(w)+'╮';
  const hdr = `│ ${title}${' '.repeat(w-strip(title).length-1)}│`;
  const mids= lines.map(l=>`│ ${l}${' '.repeat(w-strip(l).length-1)}│`);
  const bot = '╰'+'─'.repeat(w)+'╯';
  return [top,hdr,...mids,bot].join('<br>');
}
function createMini(text) {
  const w = text.length+2;
  return ['┌'+'─'.repeat(w)+'┐',`│ ${text} │`,'└'+'─'.repeat(w)+'┘'].join('<br>');
}

// Dynamic commands
const DYN = {
  echo(args) {
    if (!args.length) {
      appendOutput(createBox('Usage',[CMD_MAP.echo.usage]));
    } else {
      appendOutput(createMini(args.join(' ')));
    }
  },
  whoami() {
    appendOutput('Fetching IP…');
    Promise.all([
      fetch('https://api.ipify.org?format=json').then(r=>r.json()).catch(()=>null),
      fetch('https://api64.ipify.org?format=json').then(r=>r.json()).catch(()=>null)
    ]).then(([v4,v6]) => {
      appendOutput(`IPv4: ${v4?.ip||'unavailable'}`);
      appendOutput(`IPv6: ${v6?.ip||'unavailable'}`);
    });
  },
  uptime() {
    const s = Math.floor((Date.now()-bootTime)/1000);
    const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), sec=s%60;
    appendOutput(`Uptime: ${h}h ${m}m ${sec}s`);
  },
  date() {
    appendOutput(new Date().toString());
  },
  history() {
    historyLog.forEach((c,i)=>appendOutput(`${i+1}. ${c}`));
  },
  clear() {
    outEl.innerHTML = '';
  },
  neofetch() {
    const lines = [
      'Fury Shell v1.0',
      `Uptime     : ${((Date.now()-bootTime)/1000|0)}s`,
      `Cores      : ${navigator.hardwareConcurrency||'N/A'}`,
      `Resolution : ${screen.width}x${screen.height}`,
      `Agent      : ${navigator.userAgent.split(' ')[0]}`,
      `Time       : ${new Date().toLocaleString()}`
    ];
    appendOutput(createBox('neofetch',lines));
  },
  buymecoffee() {
    appendOutput('<a href="https://buymeacoffee.com/untamedfury" target="_blank">☕ Buy me a coffee</a>');
  }
};

function initTerminal() {
  const allCmds = Object.keys(CMD_MAP).concat(Object.keys(DYN));
  const fuse = new Fuse(allCmds, { threshold: 0.3 });

  inEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const line = inEl.value.trim();
      if (!line) return;
      appendOutput(`$ ~ ${line}`);
      historyLog.push(line);
      historyIdx = historyLog.length;
      const [cmd, ...args] = line.split(/\s+/);

      const meta = CMD_MAP[cmd];
      if (meta && meta.type==='static') {
        // **static** commands now plain text
        meta.output.forEach(l => appendOutput(l));
      } else if (DYN[cmd]) {
        DYN[cmd](args);
      } else {
        appendOutput(createBox('Error',[`Unknown command: ${cmd}`]));
      }
      inEl.value = '';
    }
  });
}