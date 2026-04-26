const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const overlay = document.getElementById('startOverlay');
const song = document.getElementById('mySong');

let width, height, heartPointsCount = 80;
let points = [];

// স্ক্রিন সাইজ ঠিক করা
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// আপনার দেওয়া সেই ম্যাথমেটিক্যাল হার্ট লজিক
function initHeart() {
    for (let i = 0; i < heartPointsCount; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0, vy: 0, R: 2,
            speed: Math.random() * 2 + 1,
            q: Math.random() * heartPointsCount,
            D: 2 * Math.random() - 1,
            force: 0.2 * Math.random() + 0.7,
            f: "hsla(350, 70%, 60%, 0.8)",
            trace: Array.from({length: 10}, () => ({x: width/2, y: height/2}))
        });
    }
}

// হার্ট রেইন ফিচার (নতুন)
function createHeartRain() {
    const heart = document.createElement('div');
    heart.classList.add('heart-drop');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}

// টাইপিং ইফেক্ট (নতুন)
function typeEffect(element, text, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// মেইন অ্যানিমেশন লুপ
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    points.forEach(p => {
        // এখানে আপনার সেই কণা চলাচলের লজিক কাজ করবে
        ctx.beginPath();
        ctx.fillStyle = p.f;
        ctx.arc(p.x, p.y, p.R, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

// বাটন ক্লিক করলে যা হবে
startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    song.play();
    initHeart();
    animate();
    setInterval(createHeartRain, 400);

    // টাইপিং শুরু
    setTimeout(() => {
        typeEffect(document.getElementById('mainMessage'), "আই লাভ ইউ ঋতু", 150, () => {
            setTimeout(() => {
                typeEffect(document.getElementById('subMessage'), "তুমি আমার জীবনের শ্রেষ্ঠ উপহার...", 100);
            }, 1000);
        });
    }, 2000);
});
