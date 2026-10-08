import { useEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Bird, Camera, Image, Mountain, Search, Utensils, Waves } from 'lucide-react';

const categories = [
  { name: 'Mountain', path: '/mountain', icon: Mountain },
  { name: 'Beaches', path: '/beaches', icon: Waves },
  { name: 'Birds', path: '/birds', icon: Bird },
  { name: 'Food', path: '/food', icon: Utensils },
];

async function fetchPhotos(query, offset = 0, signal) {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: '6',
    gsrlimit: '30',
    prop: 'imageinfo',
    iiprop: 'url|size',
    iiurlwidth: '900',
    format: 'json',
    origin: '*',
  });
  if (offset > 0) params.set('gsroffset', String(offset));

  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { signal });
  if (!response.ok) throw new Error('The photo service is having trouble. Please try again.');
  const data = await response.json();
  if (data.error) throw new Error('The photo search could not be completed. Try a different search.');

  const images = Object.values(data.query?.pages ?? [])
    .filter((page) => page.imageinfo?.[0]?.mime?.startsWith('image/'))
    .map((page) => {
      const info = page.imageinfo[0];
      return {
        id: page.pageid,
        title: page.title.replace(/^File:/, '').replaceAll('_', ' ').replace(/\.[^.]+$/, ''),
        image: info.thumburl ?? info.url,
        source: info.descriptionurl,
        width: info.width,
        height: info.height,
      };
    });

  return { images, nextOffset: data.continue?.gsroffset ?? null };
}

function Header() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const term = search.trim();
    if (term) navigate(`/search/${encodeURIComponent(term)}`);
  }

  return (
    <header className="site-header">
      <NavLink className="brand" to="/mountain" aria-label="SnapScout home">
        <span className="brand-icon"><Camera size={17} strokeWidth={1.9} /></span>
        <span>snap<span>scout</span></span>
      </NavLink>
      <nav className="category-nav" aria-label="Photo categories">
        {categories.map(({ name, path, icon: Icon }) => (
          <NavLink className={({ isActive }) => `category-link${isActive ? ' is-active' : ''}`} key={path} to={path}>
            <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
            {name}
          </NavLink>
        ))}
      </nav>
      <form className="search-form" role="search" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="photo-search">Search photos</label>
        <Search size={16} aria-hidden="true" />
        <input id="photo-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a subject" />
        <button type="submit" aria-label="Search photos"><ArrowUpRight size={17} /></button>
      </form>
    </header>
  );
}

function PhotoCard({ photo, index }) {
  const ratio = Math.min(1.5, Math.max(0.78, photo.width / photo.height));
  return (
    <a className="photo-card" href={photo.source} target="_blank" rel="noreferrer" style={{ '--photo-ratio': ratio }}>
      <img src={photo.image} alt={photo.title} loading={index < 8 ? 'eager' : 'lazy'} />
      <span className="photo-overlay">
        <span className="photo-title">{photo.title}</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </span>
    </a>
  );
}

function GalleryPage({ title, query }) {
  const [photos, setPhotos] = useState([]);
  const [nextOffset, setNextOffset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setPhotos([]);
    setNextOffset(null);
    fetchPhotos(query, 0, controller.signal)
      .then(({ images, nextOffset: offset }) => {
        setPhotos(images);
        setNextOffset(offset);
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') setError(fetchError.message || 'Could not load photos.');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [query, retryCount]);

  async function loadMore() {
    if (nextOffset === null || loadingMore) return;
    setLoadingMore(true);
    setError('');
    try {
      const { images, nextOffset: offset } = await fetchPhotos(query, nextOffset);
      setPhotos((current) => {
        const knownIds = new Set(current.map((photo) => photo.id));
        return [...current, ...images.filter((photo) => !knownIds.has(photo.id))];
      });
      setNextOffset(offset);
    } catch (fetchError) {
      setError(fetchError.message || 'Could not load more photos.');
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <main className="gallery-main">
      <section className="gallery-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" /> The open image atlas</p>
          <h1>{title}</h1>
        </div>
        <p className="heading-note">A collection of moments, places, and details<br />from photographers around the world.</p>
      </section>

      <div className="results-bar">
        <span>{loading ? 'Gathering photographs' : `${photos.length} photographs`}</span>
        <span className="results-source"><Image size={14} /> Wikimedia Commons</span>
      </div>

      {loading ? (
        <div className="status-panel" role="status"><span className="loader" />Finding images of {query}...</div>
      ) : error && photos.length === 0 ? (
        <div className="status-panel error-panel" role="alert"><p>{error}</p><button className="outline-button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button></div>
      ) : photos.length === 0 ? (
        <div className="status-panel empty-panel"><Image size={26} /><p>No photographs found for “{query}”.</p><span>Try a broader subject or one of the collections above.</span></div>
      ) : (
        <>
          <section className="photo-grid" aria-label={`${title} photographs`}>
            {photos.map((photo, index) => <PhotoCard key={photo.id} photo={photo} index={index} />)}
          </section>
          {error && <p className="more-error" role="alert">{error}</p>}
          {nextOffset !== null && (
            <div className="load-more-wrap">
              <button className="load-more" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Finding more' : 'Load 30 more'}
                {!loadingMore && <ArrowDown size={16} aria-hidden="true" />}
              </button>
            </div>
          )}
        </>
      )}

      <footer className="site-footer">Images via Wikimedia Commons <span aria-hidden="true">·</span> Select a photograph to view its source</footer>
    </main>
  );
}

function SearchGallery() {
  const { query = '' } = useParams();
  const searchTerm = query.trim();
  return <GalleryPage key={searchTerm} query={searchTerm} title={searchTerm} />;
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/mountain" replace />} />
        <Route path="/mountain" element={<GalleryPage title="Mountain" query="mountain" />} />
        <Route path="/beaches" element={<GalleryPage title="Beaches" query="beaches" />} />
        <Route path="/birds" element={<GalleryPage title="Birds" query="birds" />} />
        <Route path="/food" element={<GalleryPage title="Food" query="food" />} />
        <Route path="/search/:query" element={<SearchGallery />} />
        <Route path="*" element={<Navigate to="/mountain" replace />} />
      </Routes>
    </div>
  );
}