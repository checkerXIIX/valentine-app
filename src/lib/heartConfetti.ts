import confetti from "canvas-confetti";

export const fireHeartConfetti = () => {
  const duration = 2000;
  const end = Date.now() + duration;

  const heartShape = confetti.shapeFromText({
    text: "❤️",
    scalar: 2,
  });

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      shapes: [heartShape],
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      shapes: [heartShape],
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  };

  frame();
};
