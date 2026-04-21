// extension/content.js

(function () {
  if (window.hasCodeLensScriptRun) return;
  window.hasCodeLensScriptRun = true;

  // --- STATE ---
  let inspectorActive = false;
  let hoveredElement = null;
  let multiSelectBatch = [];

  // --- HELPERS ---
  function rgbToHex(rgb) {
    if (!rgb || rgb.startsWith("#") || rgb === "transparent") return rgb;
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues || rgbValues.length < 3) return rgb;
    const hex = rgbValues
      .slice(0, 3)
      .map((x) => {
        const n = parseInt(x).toString(16);
        return n.length === 1 ? "0" + n : n;
      })
      .join("");
    return "#" + hex.toUpperCase();
  }

  function getElementData(el) {
    if (!el) return null;
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const hasText = el.innerText && el.innerText.trim().length > 0;

    // DEEP SEARCH FOR IMAGES/SVGS
    const img = el.tagName === "IMG" ? el : el.querySelector("img") || el.closest("img");
    const svg = el.tagName === "svg" || el.closest("svg") ? (el.tagName === "svg" ? el : el.closest("svg")) : el.querySelector("svg");

    const identifyAsset = (url, tag, outerHTML) => {
      const src = url?.toLowerCase() || "";
      if (tag === "svg" || outerHTML?.includes("<svg")) return "icons";
      if (src.includes("logo") || src.includes("brand")) return "logos";
      return "backgrounds";
    };

    let asset = null;
    if (img && img.src) {
      asset = {
        type: identifyAsset(img.src, "img"),
        url: img.src,
        name: img.src.split("/").pop().split("?")[0] || "captured-image",
      };
    } else if (svg) {
      asset = { type: "icons", content: svg.outerHTML, name: "vector-icon.svg" };
    } else if (style.backgroundImage && style.backgroundImage !== "none") {
      const urlMatch = style.backgroundImage.match(/url\(["']?([^"']+)["']?\)/);
      if (urlMatch) {
        asset = { type: identifyAsset(urlMatch[1], "bg"), url: urlMatch[1], name: "background-asset" };
      }
    }

    return {
      tag: el.tagName,
      text: hasText ? el.innerText.trim().slice(0, 60) : null,
      fontFamily: hasText ? style.fontFamily.split(",")[0].replace(/['"]+/g, "") : null,
      fontSize: hasText ? style.fontSize : null,
      fontWeight: style.fontWeight,
      color: rgbToHex(style.color),
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      textAlign: style.textAlign,
      backgroundColor: rgbToHex(style.backgroundColor),
      backgroundImage: style.backgroundImage !== "none" ? style.backgroundImage : null,
      border: style.border !== "0px none rgb(0, 0, 0)" ? style.border : null,
      borderRadius: style.borderRadius,
      opacity: style.opacity !== "1" ? style.opacity : null,
      boxShadow: style.boxShadow !== "none" ? style.boxShadow : null,
      display: style.display,
      flexDirection: style.flexDirection,
      padding: style.padding,
      margin: style.margin,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      url: window.location.href,
      domain: window.location.hostname,
      asset: asset,
    };
  }

  // --- UI ELEMENTS (CodeLens Purple Theme) ---
  const overlay = document.createElement("div");
  overlay.id = "codelens-overlay";
  overlay.style.cssText = `position: fixed; pointer-events: none; z-index: 2147483647; border: 2px solid #7b39fc; background: rgba(123, 57, 252, 0.15); display: none; border-radius: 4px; transition: all 0.05s ease;`;
  document.body.appendChild(overlay);

  const label = document.createElement("div");
  label.id = "codelens-label";
  label.style.cssText = `position: fixed; background: #7b39fc; color: white; padding: 2px 8px; font-size: 11px; font-family: sans-serif; font-weight: bold; border-radius: 4px; pointer-events: none; z-index: 2147483647; display: none; box-shadow: 0 2px 10px rgba(0,0,0,0.2); text-transform: lowercase;`;
  document.body.appendChild(label);

  const toast = document.createElement("div");
  toast.id = "codelens-toast";
  toast.style.cssText = `position: fixed; bottom: 20px; right: 20px; background: #10b981; color: white; padding: 12px 24px; border-radius: 12px; font-family: sans-serif; font-size: 14px; font-weight: bold; transform: translateY(150px); transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28); z-index: 2147483647; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);`;
  document.body.appendChild(toast);

  // --- EVENT HANDLERS ---
  function handleMouseMove(e) {
    if (!inspectorActive) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || el.id?.startsWith("codelens-")) return;

    hoveredElement = el;
    const rect = el.getBoundingClientRect();

    overlay.style.display = "block";
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
    overlay.style.top = `${rect.top}px`;
    overlay.style.left = `${rect.left}px`;

    label.style.display = "block";
    label.innerText = el.tagName.toLowerCase();
    const labelTop = rect.top - 25;
    label.style.top = `${labelTop < 5 ? rect.top + 5 : labelTop}px`;
    label.style.left = `${rect.left}px`;
  }

  function handleClick(e) {
    if (!inspectorActive || !hoveredElement) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const data = getElementData(hoveredElement);
    const isBatching = e.ctrlKey || e.metaKey || e.altKey;

    if (isBatching) {
      multiSelectBatch.push(data);
      toast.innerText = `✨ Batch: ${multiSelectBatch.length} items`;
      toast.style.background = "#7b39fc";
      toast.style.transform = "translateY(0)";
    } else {
      const payload = multiSelectBatch.length > 0 ? [...multiSelectBatch, data] : data;
      chrome.runtime.sendMessage({ action: "capture_element", data: payload });

      toast.innerText = multiSelectBatch.length > 0 ? `🚀 Sent ${multiSelectBatch.length + 1} elements!` : "✨ Sent to CodeLens!";
      toast.style.background = "#10b981";
      multiSelectBatch = [];

      toast.style.transform = "translateY(0)";
      setTimeout(() => {
        if (toast) toast.style.transform = "translateY(150px)";
      }, 2000);
    }
  }

  // --- 🔥 MESSAGING: THIS REMOVES THE LINES ON STOP 🔥 ---
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggle_inspect") {
      inspectorActive = request.state;
      
      // If we clicked STOP, hide everything immediately
      if (!inspectorActive) {
        overlay.style.display = "none";
        label.style.display = "none";
        multiSelectBatch = [];
        hoveredElement = null;
      }
      sendResponse({ status: "success" });
    }
  });

  // --- ATTACH LISTENERS ---
  document.addEventListener("mousemove", handleMouseMove, true);
  document.addEventListener("click", handleClick, {
    capture: true,
    passive: false,
  });
})();