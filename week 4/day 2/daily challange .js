class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

// 1. Instantiate first Video instance and call watch()
const video1 = new Video('JavaScript Basics', 'Alice', 300);
video1.watch();
// Output: Alice watched all 300 seconds of JavaScript Basics!

// 2. Instantiate second Video instance
const video2 = new Video('Advanced CSS', 'Bob', 600);
video2.watch();
// Output: Bob watched all 600 seconds of Advanced CSS!


// --- Bonus Section ---

// Best data structure: Array of objects storing the raw data
const videoData = [
  { title: 'HTML Essentials', uploader: 'Charlie', time: 180 },
  { title: 'React Guide', uploader: 'Dana', time: 900 },
  { title: 'Node.js Crash Course', uploader: 'Evan', time: 1200 },
  { title: 'Python for Beginners', uploader: 'Fiona', time: 450 },
  { title: 'SQL Queries 101', uploader: 'George', time: 240 }
];

// Loop through array to instantiate Video instances and call watch()
const videoInstances = videoData.map(data => new Video(data.title, data.uploader, data.time));

videoInstances.forEach(video => video.watch());