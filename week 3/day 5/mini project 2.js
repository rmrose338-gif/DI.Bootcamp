const padDefinitions = [
	{ key: "a", name: "Heartbeat", type: "kick" },
	{ key: "s", name: "Snap", type: "snare" },
	{ key: "d", name: "Shimmer", type: "hat" },
	{ key: "f", name: "Sparkle", type: "clap" },
	{ key: "g", name: "Blush", type: "tom" },
	{ key: "h", name: "Twinkle", type: "openHat" },
	{ key: "j", name: "Bell", type: "cymbal" },
	{ key: "k", name: "Pop", type: "perc" },
];

const padsContainer = document.querySelector("#drum-pads");
const lastHit = document.querySelector("#last-hit");
let audioContext;

function getAudioContext() {
	if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
	return audioContext;
}

function playTone(type) {
	const context = getAudioContext();
	const now = context.currentTime;
	const oscillator = context.createOscillator();
	const gain = context.createGain();
	const noise = context.createBufferSource();
	const buffer = context.createBuffer(1, context.sampleRate * 0.5, context.sampleRate);
	const data = buffer.getChannelData(0);
	for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;

	const settings = {
		kick: [130, 48, 0.5, 0.8], snare: [220, 130, 0.22, 0.35], hat: [700, 1050, 0.08, 0.22], clap: [0, 0, 0.16, 0.24],
		tom: [240, 120, 0.3, 0.4], openHat: [900, 1350, 0.3, 0.2], cymbal: [660, 1320, 0.5, 0.22], perc: [520, 260, 0.18, 0.38],
	}[type];

	noise.buffer = buffer;
	oscillator.connect(gain);
	noise.connect(gain);
	gain.connect(context.destination);
	if (settings[0]) {
		oscillator.type = type === "kick" ? "sine" : type === "cymbal" ? "sine" : "triangle";
		oscillator.frequency.setValueAtTime(settings[0], now);
		oscillator.frequency.exponentialRampToValueAtTime(settings[1], now + settings[2]);
		oscillator.start(now);
		oscillator.stop(now + settings[2]);
	}
	noise.start(now);
	noise.stop(now + settings[2]);
	gain.gain.setValueAtTime(settings[3], now);
	gain.gain.exponentialRampToValueAtTime(0.001, now + settings[2]);
}

function triggerPad(pad, element) {
	playTone(pad.type);
	element.classList.add("active");
	lastHit.textContent = pad.name.toUpperCase();
	window.setTimeout(() => element.classList.remove("active"), 120);
}

padDefinitions.forEach((pad) => {
	const element = document.createElement("button");
	element.type = "button";
	element.className = "drum-pad";
	element.innerHTML = `<span class="pad-key">${pad.key.toUpperCase()}</span><span class="pad-name">${pad.name}</span>`;
	element.addEventListener("click", () => triggerPad(pad, element));
	padsContainer.append(element);
});

document.addEventListener("keydown", (event) => {
	if (event.repeat) return;
	const index = padDefinitions.findIndex((pad) => pad.key === event.key.toLowerCase());
	if (index !== -1) triggerPad(padDefinitions[index], padsContainer.children[index]);
});
