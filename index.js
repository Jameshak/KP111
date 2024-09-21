const count = document.getElementById('count');
const head = document.getElementById('head');
const giftbox = document.getElementById('merrywrap');
const canvasC = document.getElementById('c');

const config = {
  birthdate: 'November 11, 2024',
  name: 'Kyi Pyar'
};

function hideEverything() {
  head.style.display = 'none';
  count.style.display = 'none';
  giftbox.style.display = 'none';
  canvasC.style.display = 'none';
}

hideEverything();

const confettiSettings = { target: 'confetti' };
const confetti = new window.ConfettiGenerator(confettiSettings);
confetti.render();

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date(`${config.birthdate} 00:00:00`).getTime();
const intervalId = setInterval(function() {
  let now = new Date().getTime();
  let distance = countDown - now;

  document.getElementById('day').innerText = Math.floor(distance / day);
  document.getElementById('hour').innerText = Math.floor((distance % day) / hour);
  document.getElementById('minute').innerText = Math.floor((distance % hour) / minute);
  document.getElementById('second').innerText = Math.floor((distance % minute) / second);

  let w = (canvasC.width = window.innerWidth);
  let h = (canvasC.height = window.innerHeight);
  let ctx = canvasC.getContext('2d');
  let hw = w / 2, hh = h / 2;
  let letters = [];

  const opts = {
    strings: ['HAPPY', 'Birthday!', '', config.name, '', 'Wish', 'You', 'All', 'the Best'],
    charSize: 25,
    charSpacing: 20,
    lineHeight: 35,
    fireworkParams: {
      fireworkBaseLineWidth: 5,
      fireworkAddedLineWidth: 8,
      gravity: 0.1,
      upFlow: -0.1,
    }
  };

  // Letter class definition
  class Letter {
    constructor(char, x, y) {
      this.char = char;
      this.x = x;
      this.y = y;
      this.dx = -ctx.measureText(char).width / 2;
      this.dy = opts.charSize / 2;
      this.phase = 'firework';
      this.reset();
    }
    
    reset() {
      this.tick = 0;
      this.spawned = false;
      // Additional properties for animation...
    }

    step() {
      // Animation logic...
    }
  }

  // Initialize letters
  opts.strings.forEach((line, i) => {
    line.split('').forEach((char, j) => {
      letters.push(new Letter(char, j * opts.charSpacing, i * opts.lineHeight));
    });
  });

  // Resize handling
  window.addEventListener('resize', () => {
    w = canvasC.width = window.innerWidth;
    h = canvasC.height = window.innerHeight;
  });

  if (distance > 0) {
    head.style.display = 'initial';
    count.style.display = 'initial';
  } else {
    clearInterval(intervalId);
    head.style.display = 'none';
    count.style.display = 'none';
    giftbox.style.display = 'initial';
    canvasC.style.display = 'initial';

    // Giftbox logic...
    let step = 1;
    const stepMinutes = [2000, 2000, 1000, 1000];

    function openBox() {
      // Open giftbox logic...
    }

    function init() {
      const box = giftbox.getElementsByClassName('giftbox')[0];
      box.addEventListener('click', openBox);
    }

    init();
  }

  // Animation loop
  function anim() {
    window.requestAnimationFrame(anim);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    // Update letters...
  }

  anim();

}, second);
