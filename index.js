document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor effect
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: "power1.out"
        });
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    // Create floating hearts
    function createHearts() {
        const container = document.querySelector('.floating-hearts');
        const heartCount = 15;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 10 + 's';
            heart.style.fontSize = (15 + Math.random() * 15) + 'px';
            heart.style.opacity = 0.5 + Math.random() * 0.5;
            container.appendChild(heart);
        }
    }
    
    // Create sparkles
    function createSparkles() {
        const container = document.querySelector('.sparkles');
        const sparkleCount = 20;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.innerHTML = '✦';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDelay = Math.random() * 5 + 's';
            sparkle.style.fontSize = (10 + Math.random() * 10) + 'px';
            container.appendChild(sparkle);
        }
    }
    
    createHearts();
    createSparkles();
    
    // Music player functionality
    const birthdaySong = document.getElementById('birthdaySong');
    const playButton = document.getElementById('playButton');
    const visualizer = document.getElementById('visualizer');
    
    let isPlaying = false;
    
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            birthdaySong.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            visualizer.style.display = 'none';
        } else {
            birthdaySong.play()
                .then(() => {
                    playButton.innerHTML = '<i class="fas fa-pause"></i>';
                    visualizer.style.display = 'flex';
                    setupAudioVisualizer();
                })
                .catch(e => {
                    console.log("Audio playback failed:", e);
                    // Fallback - show play button and instructions
                    playButton.innerHTML = 'Click to Play';
                    playButton.style.width = 'auto';
                    playButton.style.padding = '0 15px';
                });
        }
        isPlaying = !isPlaying;
    });
    
    // Audio visualizer setup
    function setupAudioVisualizer() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(birthdaySong);
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 64;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        function updateVisualizer() {
            if (!isPlaying) return;
            
            analyser.getByteFrequencyData(dataArray);
            const bars = document.querySelectorAll('.bar');
            
            for (let i = 0; i < bars.length; i++) {
                const value = dataArray[i % bufferLength] / 255;
                const height = value * 40;
                bars[i].style.height = `${height}px`;
            }
            
            requestAnimationFrame(updateVisualizer);
        }
        
        updateVisualizer();
    }
    
    // Scroll animations for paragraphs
    gsap.registerPlugin(ScrollTrigger);
    
    document.querySelectorAll('.paragraph').forEach((para, index) => {
        gsap.from(para, {
            scrollTrigger: {
                trigger: para,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });
    
    // Photo hover effects
    document.querySelectorAll('.photo-frame').forEach(frame => {
        frame.addEventListener('mouseenter', () => {
            gsap.to(frame.querySelector('.polaroid'), {
                rotationY: 10,
                rotationX: 5,
                y: -10,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        frame.addEventListener('mouseleave', () => {
            gsap.to(frame.querySelector('.polaroid'), {
                rotationY: 0,
                rotationX: 0,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
});
