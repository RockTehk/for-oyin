document.addEventListener("DOMContentLoaded", () => {
  const screens = document.querySelectorAll(".screen");
  const nextButtons = document.querySelectorAll("[data-next]");
  const choices = document.querySelectorAll(".choice");
  const backHome = document.getElementById("backHome");
  const soundToggle = document.getElementById("soundToggle");

  function showScreen(id) {
    screens.forEach(screen => {
      screen.classList.toggle("active", screen.id === id);
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  nextButtons.forEach(button => {
    button.addEventListener("click", () => {
      const next = button.dataset.next;
      if (next) showScreen(next);
    });
  });

  choices.forEach(button => {
    button.addEventListener("click", async () => {
      const choice = button.dataset.choice;

      localStorage.setItem("oyinResponse", choice);

      const title = document.getElementById("confirmationTitle");
      const text = document.getElementById("confirmationText");
      const pill = document.getElementById("selectedPill");
      const status = document.getElementById("sendStatus");

      pill.textContent = choice;

      if (choice === "Any day is fine 😂") {
        title.textContent = "Okayyy, I hear you 😂❤️";
        text.textContent =
          "Then I guess I'll just have to find a good time and come prepared. I'm looking forward to talking with you.";
      } else if (choice === "Another day") {
        title.textContent = "No worries at all. ❤️";
        text.textContent =
          "Whenever works for you, just let me know. I'll be here.";
      } else {
        title.textContent = "It's a plan. ❤️";
        text.textContent =
          "Thank you for choosing. I'll be looking forward to our conversation.";
      }

      showScreen("confirmation");

      if (
        typeof SITE_CONFIG !== "undefined" &&
        SITE_CONFIG.GAS_ENDPOINT
      ) {
        status.textContent = "Sending your response quietly…";

        try {
          await fetch(SITE_CONFIG.GAS_ENDPOINT, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
              choice: choice,
              page: window.location.href,
              time: new Date().toISOString()
            })
          });

          status.textContent = "Response sent. ❤️";
        } catch (error) {
          status.textContent = "Your choice has been saved. ❤️";
        }
      } else {
        status.textContent = "Your choice has been saved. ❤️";
      }
    });
  });

  if (backHome) {
    backHome.addEventListener("click", () => {
      showScreen("landing");
    });
  }

  // Soft ambient sound
  let audioContext;
  let oscillator;
  let gainNode;
  let soundOn = false;

  function startSound() {
    audioContext =
      audioContext ||
      new (window.AudioContext || window.webkitAudioContext)();

    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 220;

    gainNode.gain.value = 0.025;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    soundOn = true;
    soundToggle.innerHTML = "♫ <span>sound on</span>";
  }

  function stopSound() {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
    }

    soundOn = false;
    soundToggle.innerHTML = "♫ <span>sound</span>";
  }

  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      if (soundOn) {
        stopSound();
      } else {
        startSound();
      }
    });
  }
});
