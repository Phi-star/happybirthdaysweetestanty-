document.addEventListener('DOMContentLoaded', function() {
    // Add animation delays to paragraphs
    const paragraphs = document.querySelectorAll('.paragraph');
    paragraphs.forEach((para, index) => {
        para.style.setProperty('--order', index);
    });

    // Play music on first interaction
    const birthdaySong = document.getElementById('birthdaySong');
    let hasInteracted = false;

    function handleFirstInteraction() {
        if (!hasInteracted) {
            birthdaySong.play().catch(e => console.log("Auto-play prevented:", e));
            hasInteracted = true;
            // Remove event listeners after first interaction
            window.removeEventListener('scroll', handleFirstInteraction);
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        }
    }

    // Add multiple event listeners to ensure we catch the first interaction
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    // Create additional confetti elements
    function createConfetti() {
        const header = document.querySelector('.header');
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 5 + 's';
            confetti.style.animationDuration = 3 + Math.random() * 7 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
            header.appendChild(confetti);
        }
    }

    createConfetti();
});
