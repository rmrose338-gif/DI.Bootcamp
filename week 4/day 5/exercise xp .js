// ==========================================
// Exercise 1: Giphy API (Hilarious GIFs)

async function getHilariousGifs() {
  try {
    const response = await fetch("https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My");
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log("Exercise 1 Output:", data);
  } catch (error) {
    console.error("Exercise 1 Error:", error.message);
  }
}


// Exercise 2: Giphy API (10 Sun GIFs, Offset 2)
async function getSunGifs() {
  try {
    const response = await fetch("https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My");
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log("Exercise 2 Output:", data);
  } catch (error) {
    console.error("Exercise 2 Error:", error.message);
  }
}
// Exercise 3: Async Starwars Starship Request
async function getStarship() {
  try {
    const response = await fetch("https://www.swapi.tech/api/starships/9/");
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const objectStarWars = await response.json();
    console.log("Exercise 3 Output:", objectStarWars.result);
  } catch (error) {
    console.error("Exercise 3 Error:", error.message);
  }
}


// Exercise 4: Analyze Output

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  let result = await resolveAfter2Seconds();
  console.log(result);
}

// Execute all exercises sequentially
(async () => {
  await getHilariousGifs();
  await getSunGifs();
  await getStarship();
  console.log("--- Exercise 4 Starting ---");
  await asyncCall();
})();