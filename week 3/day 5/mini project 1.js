const colors = [
	"#20262c", "#ee704e", "#f4c84a", "#5db8a6", "#4d8edb", "#8767c7",
	"#ec8baf", "#f0a15d", "#8a6956", "#f3f0e9", "#ffffff", "#9aa4aa",
];

const palette = document.querySelector("#color-palette");
const grid = document.querySelector("#drawing-grid");
const selectedColorSwatch = document.querySelector("#selected-color");
const clearButton = document.querySelector("#clear-button");
let selectedColor = colors[1];
let isDrawing = false;

function selectColor(color, button) {
	selectedColor = color;
	selectedColorSwatch.style.backgroundColor = color;
	palette.querySelectorAll(".color-button").forEach((colorButton) => {
		colorButton.setAttribute("aria-checked", colorButton === button ? "true" : "false");
	});
}

function paintSquare(square) {
	square.style.backgroundColor = selectedColor;
}

colors.forEach((color, index) => {
	const colorButton = document.createElement("button");
	colorButton.type = "button";
	colorButton.className = "color-button";
	colorButton.style.backgroundColor = color;
	colorButton.setAttribute("role", "radio");
	colorButton.setAttribute("aria-label", `Select color ${index + 1}`);
	colorButton.setAttribute("aria-checked", "false");
	colorButton.addEventListener("click", () => selectColor(color, colorButton));
	palette.append(colorButton);
});

for (let index = 0; index < 24 * 24; index += 1) {
	const square = document.createElement("button");
	square.type = "button";
	square.className = "square";
	square.setAttribute("role", "gridcell");
	square.setAttribute("aria-label", `Drawing square ${index + 1}`);
	square.addEventListener("mousedown", () => {
		isDrawing = true;
		paintSquare(square);
	});
	square.addEventListener("mouseover", () => {
		if (isDrawing) paintSquare(square);
	});
	grid.append(square);
}

document.addEventListener("mouseup", () => {
	isDrawing = false;
});

clearButton.addEventListener("click", () => {
	grid.querySelectorAll(".square").forEach((square) => {
		square.style.backgroundColor = "#fffdf8";
	});
});

selectColor(selectedColor, palette.querySelector(".color-button:nth-child(2)"));
