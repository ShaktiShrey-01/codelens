// extension/popup.js

async function initPopup() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // 🛑 Safety Check: Don't run on browser settings pages
  if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
    document.getElementById("statusText").innerText = "Can't inspect browser pages.";
    return;
  }

  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const statusText = document.getElementById("statusText");

  // Check if we are already inspecting this specific tab
  chrome.storage.local.get([`inspecting_${tab.id}`], (result) => {
    toggleUI(result[`inspecting_${tab.id}`] || false);
  });

  function toggleUI(isInspecting) {
    if (isInspecting) {
      startBtn.style.display = "none";
      stopBtn.style.display = "flex";
      statusText.innerText = "Inspector Active. Click elements on the page.";
    } else {
      startBtn.style.display = "flex";
      stopBtn.style.display = "none";
      statusText.innerText = "Ready to analyze.";
    }
  }

  // Safely send messages to content.js and execute a callback
  const sendMessageSafe = (state, callback) => {
    chrome.tabs.sendMessage(
      tab.id,
      { action: "toggle_inspect", state: state },
      (response) => {
        if (chrome.runtime.lastError) {
          statusText.innerText = "🔄 Re-linking... Please refresh the webpage.";
          // Try to forcefully reinject if the script disconnected
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"],
          }).catch(() => console.log("Execute failed"));
        } else {
          chrome.storage.local.set({ [`inspecting_${tab.id}`]: state });
          toggleUI(state);
          if (callback) callback(); // Run the close window command
        }
      }
    );
  };

  // 🔥 CLICK START: Turns on lines, CLOSES popup
  startBtn.addEventListener("click", () => {
    sendMessageSafe(true, () => {
      window.close(); 
    });
  });

  // 🔥 CLICK STOP: Turns off lines, CLOSES popup
  stopBtn.addEventListener("click", () => {
    sendMessageSafe(false, () => {
      window.close();
    });
  });
}

initPopup();