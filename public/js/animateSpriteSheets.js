const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const spriteSheet = new Image();
spriteSheet.src = 'img/Loading_Snail.webp';

const spriteWidth = 256;
const spriteHeight = 256;
const numFramesPerRow = 4;
const totalFrames = 8;
let currentFrame = 0;
const frameDelay = 10;
let frameCounter = 0;

/**
 * Met à jour la frame actuelle en fonction du compteur de frame
 */
function updateFrame() {
    frameCounter++;
    if (frameCounter >= frameDelay) {
        currentFrame = (currentFrame + 1) % totalFrames;
        frameCounter = 0;
    }
}

/**
 * Dessine la frame actuelle sur le canvas
 */
function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const row = Math.floor(currentFrame / numFramesPerRow);
    const col = currentFrame % numFramesPerRow;
    ctx.drawImage(
        spriteSheet,
        col * spriteWidth,
        row * spriteHeight,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
    );
}

/**
 * Fonction d'animation qui met à jour et dessine les frames en boucle
 */
function animate() {
    updateFrame();
    drawFrame();
    requestAnimationFrame(animate);
}

/**
 * Lance l'animation lorsque la sprite sheet est chargée
 */
spriteSheet.onload = function() {
    animate();
};
