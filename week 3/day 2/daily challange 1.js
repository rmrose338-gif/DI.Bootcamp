const planets = [
  { name: 'Mercury', color: 'gray', moons: 0 },
  { name: 'Venus', color: 'orange', moons: 0 },
  { name: 'Earth', color: 'blue', moons: 1 },
  { name: 'Mars', color: 'red', moons: 2 },
  { name: 'Jupiter', color: 'brown', moons: 4 },
  { name: 'Saturn', color: 'gold', moons: 3 },
  { name: 'Uranus', color: 'lightblue', moons: 2 },
  { name: 'Neptune', color: 'darkblue', moons: 1 }
];

const section = document.querySelector('.listPlanets');

const planetColorClasses = {
  Mercury: 'mercury',
  Venus: 'venus',
  Earth: 'earth',
  Mars: 'mars',
  Jupiter: 'jupiter',
  Saturn: 'saturn',
  Uranus: 'uranus',
  Neptune: 'neptune'
};

const style = document.createElement('style');
style.textContent = `
  .planet {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    text-align: center;
    padding: 10px;
    position: relative;
    border: 2px solid white;
    display: inline-block;
    margin: 20px;
    color: white;
    font-weight: bold;
    line-height: 100px;
  }

  .moon {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgb(237, 237, 237);
    border: 2px solid red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .mercury { background-color: gray; }
  .venus { background-color: orange; }
  .earth { background-color: blue; }
  .mars { background-color: red; }
  .jupiter { background-color: brown; }
  .saturn { background-color: gold; }
  .uranus { background-color: lightblue; }
  .neptune { background-color: darkblue; }
`;
document.head.appendChild(style);

planets.forEach((planet) => {
  const planetDiv = document.createElement('div');
  planetDiv.classList.add('planet', planetColorClasses[planet.name]);
  planetDiv.textContent = planet.name;

  for (let i = 0; i < planet.moons; i++) {
    const moon = document.createElement('div');
    moon.classList.add('moon');

    const angle = (Math.PI * 2 * i) / Math.max(planet.moons, 1);
    const radius = 40;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    moon.style.left = `${50 + x}px`;
    moon.style.top = `${50 + y}px`;
    planetDiv.appendChild(moon);
  }

  section.appendChild(planetDiv);
});
