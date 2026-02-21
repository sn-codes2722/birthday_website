let noCount = 0;
let currentL1Step = "invite";
let wishTime = 45;
let wishInterval = null;
let audioContext;
let analyser;

/* ================= TYPEWRITER EFFECT ================= */

function typeText(element, text, speed = 55) {
  element.textContent = "";
  let index = 0;

  const typingInterval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;

    if (index === text.length) {
      clearInterval(typingInterval);
    }
  }, speed);
}

/* ================= INITIAL TEXT (PAGE 1) ================= */

window.onload = () => {
  const tanjiroText = document.getElementById("tanjiroText");
  typeText(tanjiroText, "Are you ready to enter this new realm?");
};

/* ================= PAGE SWITCH HELPERS ================= */

function showPage(pageId) {
  const currentPage = document.querySelector(".page.active");
  const nextPage = document.getElementById(pageId);

  if (!currentPage || currentPage === nextPage) return;

  currentPage.classList.add("fade-out");

  setTimeout(() => {
    currentPage.classList.remove("active", "fade-out");
    nextPage.classList.add("active");

    if (pageId === "page2") {
      startPage2Dialogue();
    }

    if (pageId === "page3") {
      startPage3Dialogue();
    }

    if (pageId === "page4") {
      startPage4Dialogue();
    }

    if (pageId === "level2") {
      startLevel2VideoLogic();
    }

    if (pageId === "page6") {
      startPartyVideo();
    }

    if (pageId === "level3") {
      startLevel3Logic();
    }
  }, 600);
}

/* ================= PAGE 1 → PAGE 2 ================= */

function handleYes() {
  showPage("page2");
}

/* ================= TANJIRO INTERACTION (PAGE 1) ================= */

function handleNo() {
  const tanjiroImage = document.getElementById("tanjiroImage");
  const tanjiroText = document.getElementById("tanjiroText");
  const buttonGroup = document.getElementById("buttonGroup");

  noCount++;

  fadeOut(tanjiroImage, () => {
    if (noCount === 1) {
      tanjiroImage.src = "images/tanjiro/tanjiro-warning.png";

      typeText(
        tanjiroText,
        "Are you sure? I feel that you are prepared for this journey 😊"
      );

      buttonGroup.innerHTML = `
        <button onclick="handleYes()">Yes, I Am Ready</button>
        <button onclick="handleNo()">No, I am not sure</button>
      `;
    } else {
      tanjiroImage.src = "images/tanjiro/tanjiro-trapped.png";

      typeText(
        tanjiroText,
        "You cannot leave. You are TRAPPED."
      );

      buttonGroup.innerHTML = `
        <button onclick="handleYes()">Go Forward</button>
      `;
    }

    fadeIn(tanjiroImage);
  });
}

/* ================= PAGE 2 DIALOGUE ================= */

let page2Typing = null;

function startPage2Dialogue() {
  const dialogue = document.getElementById("page2Dialogue");

  if (page2Typing) {
    clearInterval(page2Typing);
    page2Typing = null;
  }

  dialogue.textContent = "";

  const text =
    "Login with your Name and Date of Beginning to Enter the Realm";

  let index = 0;

  page2Typing = setInterval(() => {
    dialogue.textContent += text.charAt(index);
    index++;

    if (index === text.length) {
      clearInterval(page2Typing);
      page2Typing = null;
    }
  }, 40);
}

/* ================= PAGE 3 DIALOGUE ================= */

function startPage3Dialogue() {
  const text =
    "Okay. My job was to guide you till here.\n" +
    "I will take your leave now.\n" +
    "All the Best for your Future Endeavors.";

  const paragraph = document.getElementById("page3Text");
  const button = document.querySelector(".page3-btn");

  // hide button initially
  button.style.display = "none";

  paragraph.textContent = "";
  let index = 0;

  const typing = setInterval(() => {
    paragraph.textContent += text.charAt(index);
    index++;

    if (index === text.length) {
      clearInterval(typing);

      // show button AFTER dialogue finishes
      setTimeout(() => {
        button.style.display = "inline-block";
        button.classList.add("show");
      }, 500);
    }
  }, 45);
}

/* ================= PAGE 4 DIALOGUE ================= */

function startPage4Dialogue() {
  const text =
    "Greetings Sweet Child.\n" +
    "I will be your companion from here.\n" +
    "Hope that Our journey from here will be a Memorable One.";

  const paragraph = document.getElementById("page4Text");
  const button = document.querySelector(".page4-btn");

  button.style.display = "none";
  paragraph.textContent = "";

  let index = 0;

  const typing = setInterval(() => {
    paragraph.textContent += text.charAt(index);
    index++;

    if (index === text.length) {
      clearInterval(typing);

      setTimeout(() => {
        button.style.display = "inline-block";
        button.classList.add("show");
      }, 600);
    }
  }, 45);
}

/* ================= PAGE 2 LOGIN LOGIC ================= */

document.addEventListener("DOMContentLoaded", () => {
  const verifyBtn = document.getElementById("verifyBtn");

  if (!verifyBtn) return;

  verifyBtn.addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const date = document.getElementById("dateInput").value;
    const tanjiro = document.getElementById("tanjiroAvatar");
    const dialogue = document.getElementById("page2Dialogue");

    if (name === "Aaho" && date === "2025-06-19") {
      tanjiro.src = "images/tanjiro/tanjiro-happy.png";

      typeText(
        dialogue,
        "We did it. Prepare yourself for what lies ahead ✨",
        40
      );

      setTimeout(() => {
        showPage("page3");
      }, 2200);
    } else {
      tanjiro.src = "images/tanjiro/tanjiro-angry.png";

      typeText(
        dialogue,
        "I won't forgive you.",
        40
      );
    }
  });
});

/* ================= FADE HELPERS ================= */

function fadeOut(element, callback) {
  element.style.transition = "opacity 0.4s ease";
  element.style.opacity = 0;

  setTimeout(() => {
    callback();
  }, 400);
}

function fadeIn(element) {
  element.style.opacity = 1;
}

/* ================= SAKURA PETALS (PAGE 1 ONLY) ================= */

function createSakura() {
  const page1 = document.getElementById("page1");
  if (!page1.classList.contains("active")) return;

  const sakura = document.createElement("img");
  sakura.src = "images/effects/sakura.png";
  sakura.classList.add("sakura");

  sakura.style.left = Math.random() * window.innerWidth + "px";
  sakura.style.animationDuration = 9 + Math.random() * 6 + "s";
  sakura.style.width = 30 + Math.random() * 18 + "px";
  sakura.style.opacity = 0.65 + Math.random() * 0.35;

  document.getElementById("sakura-container").appendChild(sakura);

  setTimeout(() => {
    sakura.remove();
  }, 14000);
}

setInterval(createSakura, 280);

/* ================= FIRE EMBERS (PAGE 2 ONLY) ================= */

function createEmber() {
  const page2 = document.getElementById("page2");
  if (!page2.classList.contains("active")) return;

  const ember = document.createElement("div");
  ember.classList.add("ember");

  ember.style.left = Math.random() * window.innerWidth + "px";
  ember.style.animationDuration = 10 + Math.random() * 10 + "s";
  ember.style.width = 4 + Math.random() * 4 + "px";
  ember.style.height = ember.style.width;
  ember.style.opacity = 0.4 + Math.random() * 0.6;

  page2.appendChild(ember);

  setTimeout(() => {
    ember.remove();
  }, 20000);
}

setInterval(createEmber, 350);

/* ================= PAGE 3 → PAGE 4 ================= */
function goToPage4() {
  showPage("page4");
}

/* ================= PAGE 4 → PAGE 5 ================= */

function goToPage5() {
  showPage("page5");
}

function startLevel(level) {
  if (level === 1) {
    resetLevel1();
    showPage("level1");

    setTimeout(() => {

      const inviteText = document.getElementById("l1InviteText");

      typeText(inviteText, "Ready to Make a Wish?");

      generateSparkles();

    }, 100);
  }
}

function generateSparkles() {
  const container = document.getElementById("sparkle-container");
  container.innerHTML = "";

  for (let i = 0; i < 40; i++) {
    const sparkle = document.createElement("img");
    sparkle.src = "images/effects/wish-sparkle.png";
    sparkle.classList.add("sparkle");

    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 2 + "s";

    container.appendChild(sparkle);
  }
}

function l1No() {

  document.getElementById("l1-invite").classList.add("hidden");
  document.getElementById("l1-plead").classList.remove("hidden");

  const pleadText = document.getElementById("l1PleadText");
  typeText(pleadText, "MAKE A WISH PLEASEEE 😚❤️");

}

function l1Yes() {
  goToWishPhase();
}

wishTime = 45;
wishInterval;

function goToWishPhase() {

  // Hide other phases
  document.getElementById("l1-invite").classList.add("hidden");
  document.getElementById("l1-plead").classList.add("hidden");

  // Show wish phase
  document.getElementById("l1-wish").classList.remove("hidden");

  startWishTimer();
}

function startWishTimer() {

  let wishTime = 45;
  const timerElement = document.getElementById("l1-timer");
  const nextBtn = document.getElementById("l1-wish-next");

  nextBtn.classList.add("hidden");
  timerElement.textContent = wishTime;

  const wishInterval = setInterval(() => {

    wishTime--;
    timerElement.textContent = wishTime;

    if (wishTime <= 0) {
      clearInterval(wishInterval);

      timerElement.style.display = "none";
      document.getElementById("l1-wish-title").style.display = "none";

      nextBtn.classList.remove("hidden");
    }

  }, 1350);
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("l1-wish-next")
    .addEventListener("click", goToCakePhase);
});

function createSparkles(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let i = 0; i < 70; i++) {
    const sparkle = document.createElement("img");
    sparkle.src = "images/effects/wish-sparkle.png";
    sparkle.classList.add("sparkle");

    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 2 + "s";

    container.appendChild(sparkle);
  }
}

function goToCakePhase() {

  const wishSection = document.getElementById("l1-wish");
  const cakeSection = document.getElementById("l1-cake");

  // Fade out wish
  wishSection.classList.add("fade-out");

  setTimeout(() => {

    wishSection.classList.add("hidden");
    wishSection.classList.remove("fade-out");

    cakeSection.classList.remove("hidden");
    cakeSection.classList.add("fade-in");

    createSparkles("cake-sparkle-container");

  }, 500); // match CSS transition time
}

document.getElementById("cake-start-btn").addEventListener("click", function () {

  // Hide intro
  document.getElementById("cake-intro").style.display = "none";

});

function blowOutCandles() {
  const flames = document.querySelectorAll(".flame");

  flames.forEach(flame => {
    flame.classList.add("out");
  });

  // Hide OKAYYY button
  document.getElementById("cake-start-btn").style.display = "none";

  // Show flamingo unlock box after fade
  setTimeout(function() {
    document.getElementById("level2-unlock").classList.remove("hidden");
  }, 900);
}

function resetLevel1() {
  // Hide all Level 1 phases
  document.getElementById("l1-invite").classList.remove("hidden");
  document.getElementById("l1-plead").classList.add("hidden");
  document.getElementById("l1-wish").classList.add("hidden");
  document.getElementById("l1-cake").classList.add("hidden");

  // Reset invite text
  const inviteText = document.getElementById("l1InviteText");
  if (inviteText) {
    inviteText.innerText = "";
  }

  // Reset timer display
  const timer = document.getElementById("l1-timer");
  if (timer) {
    timer.innerText = "45";
  }

  // Hide cake unlock container
  const unlock = document.getElementById("level2-unlock");
  if (unlock) {
    unlock.classList.add("hidden");
  }
}

document.querySelectorAll(".flame").forEach(flame => {
  flame.addEventListener("click", function () {

    flame.classList.add("out");

    const rect = flame.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    createSparkleBurst(x, y);

    // 👇 ADD THIS
    document.getElementById("level2-unlock").classList.remove("hidden");

    document.querySelector(".cake-gold-btn").style.display = "none";
  });
});

function createSparkleBurst(x, y) {
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("burst-sparkle");

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    sparkle.style.setProperty("--randX", Math.random());
    sparkle.style.setProperty("--randY", Math.random());

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 800);
  }
}

function unlockLevel2() {
  const card = document.getElementById("level2-card");

  card.classList.remove("locked");
  card.classList.add("active");

  card.onclick = function () {
    showPage("level2");
  };

  document.getElementById("page5Text").innerText =
    "Level 2 is now unlocked! Let the party begin 🥳✨";
}

function unlockLevel3() {
  const card = document.getElementById("level3-card");

  card.classList.remove("locked");
  card.classList.add("active");

  card.onclick = function () {
    showPage("level3");
  };

  document.getElementById("page5Text").innerText =
    "Level 3 is now unlocked... Final Surprise Awaits 🎁✨";
}

/* ================= LEVEL 1 CAKE → UNLOCK LEVEL 2 ================= */

document.addEventListener("DOMContentLoaded", function () {

  const unlockBtn = document.getElementById("level2-btn");

  if (unlockBtn) {
    unlockBtn.addEventListener("click", function () {
      showPage("page5");
      unlockLevel2();
    });
  }

  const level3ProceedBtn = document.getElementById("proceedLevel3Btn");

  if (level3ProceedBtn) {
    level3ProceedBtn.addEventListener("click", function () {
      showPage("page5");
      unlockLevel3();
    });
  }

  const backHomeBtn = document.getElementById("backHomeBtn");

  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", function () {
      showPage("page5");
    });
  }
});

function startLevel2VideoLogic() {
  const video = document.getElementById("partyVideo");
  const button = document.getElementById("proceedLevel3Btn");

  video.currentTime = 0;
  video.play();
  button.style.display = "none";
  setTimeout(function () {
    button.style.display = "block";
  }, 20000);
}

/* ================= LEVEL 3 GIFT ================= */

function unlockLevel3() {
  const card = document.getElementById("level3-card");

  if (!card) return;

  // Remove locked styling
  card.classList.remove("locked");

  // Make it visually active (same as others)
  card.classList.add("active");

  // Make it clickable
  card.onclick = function () {
    showPage("level3");
  };

  // Change flamingo dialogue
  const message = document.getElementById("page5Text");
  if (message) {
    message.innerText = "Level 3 Unlocked!!!! 🎁✨";
  }
}

function startLevel3Logic() {
  const button = document.getElementById("backHomeBtn");

  button.style.opacity = "0";

  setTimeout(function () {
    button.style.opacity = "1";
  }, 15000); // 15 seconds
}
