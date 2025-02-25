const symbols = [
    "apple.png",
    "banana.png",
    "bar.png",
    "blueberry.png",
    "cherry.png",
    "crown.png",
    "diamond.png",
    "grape.png",
    "orange.png",
    "raspberry.png",
    "seven.png",
    "sheet.png",
    "watermelon.png"
];

const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];

function spinReel(reel) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    const randomOffset = -100 * randomIndex;

    // Анимация прокрутки
    reel.style.transition = 'transform 1s cubic-bezier(0.33, 1, 0.68, 1)';
    reel.style.transform = `translateY(${randomOffset}px)`;

    // Сбрасываем анимацию после завершения
    setTimeout(() => {
        reel.style.transition = 'none';
        reel.style.transform = 'translateY(0)';

        // Перемешиваем символы
        for (let i = 0; i < symbols.length; i++) {
            const img = reel.children[i];
            img.src = `assets/images/symbols/${symbols[(randomIndex + i) % symbols.length]}`;
        }
    }, 1000);
}

document.getElementById("spinButton").addEventListener("click", () => {
    reels.forEach(reel => spinReel(reel));
});
