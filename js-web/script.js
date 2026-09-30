function showMessage() {
	 alert("Green Computing encourages smart and eco-friendly use of technology!");
}

document.getElementById("learnBtn").addEventListener("click", function() {
	 document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});
const tips = [
     "Unplug chargers when not in use to save energy.",
	 "Use power-saving mode on your devices.",
	 "Avoid buying necessary gadgets.",
	 "Donate or sell old devices insted of throwing them.",
	 "Set automatic sleep timers on your computer."
];

document.getElementById("tipBtn").addEventListener("click", function() {
	  const randomTip = tips[Math.floor(Math.random() * tips.length)];
	  document.getElementById("tipDisplay").textContent = randomTip;
});