/**
 * Dynamically loads the Razorpay checkout.js script on demand.
 * Returns a promise that resolves once the script is loaded.
 * Caches the promise so subsequent calls don't re-load the script.
 */
let razorpayPromise = null;

export function loadRazorpay() {
  if (razorpayPromise) return razorpayPromise;

  razorpayPromise = new Promise((resolve, reject) => {
    // Already loaded (e.g. if someone adds it back to index.html)
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => {
      razorpayPromise = null; // Allow retry on failure
      reject(new Error("Failed to load Razorpay SDK"));
    };
    document.body.appendChild(script);
  });

  return razorpayPromise;
}
