function createParticles(slot) {
    const particlesContainer = slot.querySelector('.particles');
    const numParticles = 20; // Jumlah partikel yang ingin ditambahkan

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesContainer.appendChild(particle);

        // Remove particle after animation ends
        particle.addEventListener('animationend', () => {
            particle.remove();
        }, { once: true });
    }
}

function spinSlots() {
    // Define slot symbols
    const slotSymbols = ['⭐', '🍒', '🍋', '🍉', '🔔', '🍓', '🍀', '💎'];
    const numColumns = 7;
    const numRows = 9;

    // Randomly determine if the spin results in a win (8% chance)
    const isWin = Math.random() < 0.08;
    
    // Generate a random result for each slot
    const results = [];
    for (let i = 0; i < numColumns; i++) {
        const column = [];
        for (let j = 0; j < numRows; j++) {
            const randomIndex = Math.floor(Math.random() * slotSymbols.length);
            column.push(slotSymbols[randomIndex]);
        }
        results.push(column);
    }

    // If it’s a win, adjust the results so all columns are the same
    if (isWin) {
        const winSymbol = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        for (let i = 0; i < numColumns; i++) {
            results[i] = Array(numRows).fill(winSymbol);
        }
    }

    const slots = document.querySelectorAll('.slot');
    
    // Initialize slot content for animation
    slots.forEach((slot, columnIndex) => {
        const slotContent = slot.querySelector('.slot-content');
        slotContent.innerHTML = results[columnIndex].map(symbol => `<div class="slot-item">${symbol}</div>`).join('');
        
        // Create particles effect
        createParticles(slot);

        // Add animation class
        slot.classList.add('spin-animation');

        // Remove animation class after animation ends
        slot.addEventListener('animationend', () => {
            slot.classList.remove('spin-animation');
            slot.classList.remove('spin-win'); // Remove win animation if it was applied
            if (isWin) {
                slot.classList.add('spin-win');
                slot.addEventListener('animationend', () => {
                    slot.classList.remove('spin-win');
                }, { once: true });
            }
        }, { once: true });
    });

    // Display the result and win message
    const resultText = results.map(column => column[0]).join(' | '); // Show first item of each column
    const winMessage = document.getElementById('win-message');
    if (isWin) {
        winMessage.innerText = `Selamat! Anda menang!`;
    } else {
        winMessage.innerText = `Coba lagi!`;
    }
    document.getElementById('result').innerText = `Hasil: ${resultText}`;
}
