import { Carousel } from 'react-responsive-carousel'

const destinations = [
  {
    name: 'Hong Kong',
    country: 'China',
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg',
    description: 'A harbor city where the skyline meets the mountains.',
  },
  {
    name: 'Macao',
    country: 'China',
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp',
    description: 'Portuguese streets, layered history, and luminous nights.',
  },
  {
    name: 'Japan',
    country: 'East Asia',
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp',
    description: 'Find quiet gardens and bright city streets in one journey.',
  },
  {
    name: 'Las Vegas',
    country: 'United States',
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp',
    description: 'Desert horizons, vivid lights, and a city that stays awake.',
  },
]

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Waypoint home">
          <span className="wordmark-icon" aria-hidden="true">W</span>
          WAYPOINT
        </a>
        <span className="topbar-note">FIELD NOTES / 04 DESTINATIONS</span>
      </header>

      <section className="intro" id="top" aria-labelledby="page-title">
        <p className="eyebrow">THE CITY EDITION <span>—</span> 2026</p>
        <h1 id="page-title">A little further.</h1>
        <p className="intro-copy">
          Four places with their own rhythm. Take a look around, then choose your next stop.
        </p>
      </section>

      <section className="journey" aria-label="Featured destinations">
        <div className="journey-index" aria-hidden="true">
          <span>SELECTED PLACES</span>
          <span>01 <i /> 04</span>
        </div>
        <Carousel
          ariaLabel="Destination image carousel"
          autoPlay
          infiniteLoop
          interval={5000}
          showStatus={false}
          showThumbs={false}
          stopOnHover
          swipeable
          emulateTouch
        >
          {destinations.map((destination, index) => (
            <article className="destination-slide" key={destination.name}>
              <img
                src={destination.image}
                alt={`${destination.name}, ${destination.country}`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="slide-caption">
                <p>{destination.country} <span>·</span> DESTINATION {String(index + 1).padStart(2, '0')}</p>
                <h2>{destination.name}</h2>
                <span className="slide-description">{destination.description}</span>
              </div>
            </article>
          ))}
        </Carousel>
        <p className="carousel-hint">DRAG OR USE THE ARROWS TO EXPLORE</p>
      </section>

      <footer className="page-footer">
        <span>FOUR PLACES. NO WRONG TURNS.</span>
        <span>01 — 04</span>
      </footer>
    </main>
  )
}

export default App
