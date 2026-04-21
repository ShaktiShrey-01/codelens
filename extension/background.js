chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "capture_element") {
    // 1. Prepare the data payload
    const payload = Array.isArray(request.data) ? request.data : [request.data];
    const dataString = JSON.stringify(payload);
    const encodedData = encodeURIComponent(dataString);

    // 2. Point this to your Vite Frontend
    const targetBaseUrl = "http://localhost:5173";
    const finalUrl = `${targetBaseUrl}/liveaudit?data=${encodedData}`;

    // 3. Check if your Vite dashboard is already open
    chrome.tabs.query({ url: ["http://localhost:5173/*"] }, (tabs) => {
      if (tabs.length > 0) {
        // If a tab is open, update that specific tab and switch focus
        chrome.tabs.update(tabs[0].id, {
          url: finalUrl,
          active: true,
        });
      } else {
        // If NOT open, create a new tab pointing to Vite
        chrome.tabs.create({
          url: finalUrl,
          active: true,
        });
      }
    });
  }
  return true;
});
