document.addEventListener('DOMContentLoaded', function() {
    // Music player functionality
    const birthdaySong = document.getElementById('birthdaySong');
    const playButton = document.getElementById('playButton');
    const headerPlayButton = document.getElementById('headerPlayButton');
    const visualizer = document.getElementById('visualizer');
    
    let isPlaying = false;
    
    function togglePlayback() {
        if (isPlaying) {
            birthdaySong.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            headerPlayButton.innerHTML = '<i class="fas fa-play"></i> Play Music';
            visualizer.style.display = 'none';
        } else {
            birthdaySong.play()
                .then(() => {
                    playButton.innerHTML = '<i class="fas fa-pause"></i>';
                    headerPlayButton.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
                    visualizer.style.display = 'flex';
                })
                .catch(e => {
                    console.log("Audio playback failed:", e);
                    // Fallback - show play button and instructions
                    playButton.innerHTML = 'Click to Play';
                    headerPlayButton.innerHTML = 'Click to Play Music';
                    playButton.style.width = 'auto';
                    playButton.style.padding = '0 15px';
                });
        }
        isPlaying = !isPlaying;
    }
    
    playButton.addEventListener('click', togglePlayback);
    headerPlayButton.addEventListener('click', togglePlayback);
    
    // Initialize paragraphs as visible (removed GSAP animations that might hide them)
    document.querySelectorAll('.paragraph').forEach(para => {
        para.style.opacity = '1';
        para.style.transform = 'translateY(0)';
    });
    
    // Simple equalizer animation for visualizer
    function animateEqualizer() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const randomHeight = 10 + Math.random() * 20;
            bar.style.height = `${randomHeight}px`;
        });
        if (isPlaying) {
            requestAnimationFrame(animateEqualizer);
        }
    }
    
    birthdaySong.addEventListener('play', () => {
        animateEqualizer();
    });
    
    birthdaySong.addEventListener('pause', () => {
        document.querySelectorAll('.bar').forEach(bar => {
            bar.style.height = '10px';
        });
    });
});
