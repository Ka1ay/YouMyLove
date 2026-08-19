const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const size = Math.min(window.innerWidth - 40, window.innerHeight - 40, 600);
    canvas.width = size;
    canvas.height = size;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const scale = 15;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function getHeartPoints() {
    const points = [];
    const steps = 120;
    
    for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * 2 * Math.PI;
        
        const x = 16 * Math.pow(Math.sin(angle), 3) * scale;
        const y = (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * scale;
        
        points.push({ x: centerX + x, y: centerY - y }); // -y для переворота
    }
    
    return points;
}

function drawHeart() {
    const points = getHeartPoints();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(255, 107, 107, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    
    const heartGradient = ctx.createLinearGradient(
        centerX - 100, centerY - 100,
        centerX + 100, centerY + 100
    );
    heartGradient.addColorStop(0, '#ff6b6b');
    heartGradient.addColorStop(0.5, '#ff1493');
    heartGradient.addColorStop(1, '#ff0055');
    
    ctx.fillStyle = heartGradient;
    ctx.fill();
    ctx.strokeStyle = '#ffb6c1';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = 'white';
    ctx.font = `bold ${canvas.width / 15}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.shadowColor = 'rgba(255, 107, 107, 0.8)';
    ctx.shadowBlur = 20;
    ctx.fillText('❤️ I love you ❤️', centerX, centerY + canvas.height / 3);
    ctx.shadowBlur = 0;
}

function animate() {
    drawHeart();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    resizeCanvas();
    drawHeart();
});
