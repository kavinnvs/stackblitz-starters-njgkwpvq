// Function to compute SHA256 hash
async function computeSHA256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input.toString());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
}

// Function to check user input against the target hash
async function checkGuess() {
  const targetHash = "YOUR_TARGET_HASH_HERE"; // Replace with the actual hash
  const userInput = document.getElementById("numberInput").value;

  if (userInput.length !== 3 || isNaN(userInput)) {
      document.getElementById("result").innerText = "Please enter a valid 3-digit number!";
      return;
  }

  const userHash = await computeSHA256(userInput);
  
  if (userHash === targetHash) {
      document.getElementById("result").innerText = "✅ Correct! You cracked the hash!";
  } else {
      document.getElementById("result").innerText = "❌ Incorrect, try again!";
  }
}

// Event Listener for button click
document.getElementById("checkButton").addEventListener("click", checkGuess);
