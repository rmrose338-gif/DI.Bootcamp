import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const quotes = [
  { quote: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { quote: 'It always seems impossible until it is done.', author: 'Nelson Mandela' },
  { quote: 'Great things are done by a series of small things brought together.', author: 'Vincent van Gogh' },
  { quote: 'Nothing will work unless you do.', author: 'Maya Angelou' },
  { quote: 'Well done is better than well said.', author: 'Benjamin Franklin' },
  { quote: 'The journey of a thousand miles begins with one step.', author: 'Lao Tzu' },
  { quote: 'Turn your wounds into wisdom.', author: 'Oprah Winfrey' },
  { quote: 'Act as if what you do makes a difference. It does.', author: 'William James' },
  { quote: 'You miss 100% of the shots you do not take.', author: 'Wayne Gretzky' },
  { quote: 'Make each day your masterpiece.', author: 'John Wooden' },
  { quote: 'Wherever you go, go with all your heart.', author: 'Confucius' },
  { quote: 'The best way out is always through.', author: 'Robert Frost' },
  { quote: 'If there is no struggle, there is no progress.', author: 'Frederick Douglass' },
  { quote: 'Simplicity boils down to two steps: identify the essential, eliminate the rest.', author: 'Leo Babauta' },
  { quote: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt' },
  { quote: 'Nothing is worth more than this day.', author: 'Johann Wolfgang von Goethe' },
  { quote: 'The only way to have a friend is to be one.', author: 'Ralph Waldo Emerson' },
  { quote: 'How we spend our days is, of course, how we spend our lives.', author: 'Annie Dillard' },
  { quote: 'Happiness depends upon ourselves.', author: 'Aristotle' },
  { quote: 'Do not wait to strike till the iron is hot; but make it hot by striking.', author: 'William Butler Yeats' },
];

const palettes = [
  { page: '#f4efe5', ink: '#183f3a', accent: '#e56b4a' },
  { page: '#e8f1ed', ink: '#284f62', accent: '#d47c35' },
  { page: '#f1e8ed', ink: '#653c52', accent: '#317b73' },
  { page: '#e9edf5', ink: '#34436c', accent: '#bf5b48' },
  { page: '#f3edda', ink: '#3d5942', accent: '#ad523d' },
  { page: '#e4eff1', ink: '#244951', accent: '#bd693d' },
  { page: '#f3e5dd', ink: '#563e37', accent: '#3d7971' },
  { page: '#e9ecdf', ink: '#475132', accent: '#a74f55' },
];

function randomIndexExcept(length, excludedIndex) {
  const candidate = Math.floor(Math.random() * (length - 1));
  return candidate >= excludedIndex ? candidate + 1 : candidate;
}

export default function App() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [paletteIndex, setPaletteIndex] = useState(0);
  const currentQuote = quotes[quoteIndex];
  const palette = palettes[paletteIndex];

  function showAnotherQuote() {
    setQuoteIndex((currentIndex) => randomIndexExcept(quotes.length, currentIndex));
    setPaletteIndex((currentIndex) => {
      const nextIndex = Math.floor(Math.random() * (palettes.length - 1));
      return nextIndex >= currentIndex ? nextIndex + 1 : nextIndex;
    });
  }

  return (
    <main className="page" style={{ '--page-color': palette.page, '--quote-color': palette.ink, '--accent-color': palette.accent }}>
      <div className="page-grain" aria-hidden="true" />
      <header className="topline">
        <a className="wordmark" href="#top" aria-label="Little Wisdom home">
          <span className="wordmark-mark"><Sparkles size={15} strokeWidth={1.8} /></span>
          <span>little wisdom</span>
        </a>
        <span className="edition">A thought for today <span aria-hidden="true">/</span> No. 01</span>
      </header>

      <section className="quote-stage" id="top" aria-label="Random quote">
        <div className="eyebrow"><span className="eyebrow-line" /> A moment to reflect</div>
        <article className="quote-card" aria-live="polite" aria-atomic="true">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote key={quoteIndex}>{currentQuote.quote}</blockquote>
          <div className="attribution">
            <span className="attribution-rule" />
            <cite>{currentQuote.author}</cite>
          </div>
        </article>
        <button className="next-button" type="button" onClick={showAnotherQuote}>
          <span>Another thought</span>
          <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </section>

      <footer className="footer">
        <span>Keep what speaks to you.</span>
        <span className="footer-dot" aria-hidden="true" />
        <span>Pass the rest along.</span>
      </footer>
    </main>
  );
}