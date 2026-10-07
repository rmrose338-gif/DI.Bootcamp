import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight, Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain,
  CloudSun, Droplets, Heart, MapPin, Search, Snowflake, Sun, Wind, X,
} from 'lucide-react';
import { describeWeather, fetchWeather, formatHour, formatWeekday, getStoredFavorites, searchCities } from './weather.js';

const defaultCity = {
  id: '2643743', name: 'London', region: 'England', country: 'United Kingdom',
  latitude: 51.5072, longitude: -0.1276, timezone: 'Europe/London',
};

function WeatherIcon({ code, size = 28 }) {
  const Icon = code === 0 ? Sun
    : code === 1 || code === 2 ? CloudSun
      : code === 45 || code === 48 ? CloudFog
        : code >= 51 && code <= 57 ? CloudDrizzle
          : (code >= 61 && code <= 67) || (code >= 80 && code <= 82) ? CloudRain
            : (code >= 71 && code <= 77) || code === 85 || code === 86 ? Snowflake
              : code >= 95 ? CloudLightning : Cloud;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}

function CitySearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    if (query.trim().length < 2) {
      setMatches([]);
      setSearchError('');
      setSearching(false);
      return undefined;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSearching(true);
      setSearchError('');
      try {
        setMatches(await searchCities(query.trim(), controller.signal));
      } catch (error) {
        if (error.name !== 'AbortError') {
          setSearchError('Search is unavailable. Try again shortly.');
          setMatches([]);
        }
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 300);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  function chooseCity(city) {
    setQuery('');
    setMatches([]);
    onSelect(city);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (matches[0]) chooseCity(matches[0]);
  }

  return (
    <form className="city-search" onSubmit={handleSubmit} role="search">
      <Search size={17} aria-hidden="true" />
      <label className="sr-only" htmlFor="city-search">Search for a city</label>
      <input
        id="city-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search a city"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={matches.length > 0}
      />
      {query.length > 0 && <button className="search-clear" type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}
      {query.trim().length >= 2 && (
        <div className="search-results" role="listbox" aria-label="City search results">
          {searching && <p className="search-message">Finding places...</p>}
          {!searching && searchError && <p className="search-message">{searchError}</p>}
          {!searching && !searchError && matches.length === 0 && <p className="search-message">No cities found.</p>}
          {matches.map((city) => (
            <button className="search-result" type="button" role="option" key={city.id} onClick={() => chooseCity(city)}>
              <MapPin size={15} aria-hidden="true" />
              <span>{city.name}{city.region ? `, ${city.region}` : ''}</span>
              <small>{city.country}</small>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}

function Header({ onSelectCity }) {
  const navigate = useNavigate();
  function selectCity(city) {
    onSelectCity(city);
    navigate('/');
  }
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Isobar weather home">
        <span className="brand-mark"><Sun size={19} strokeWidth={1.8} /></span>
        <span>isobar<span className="brand-period">.</span></span>
      </Link>
      <CitySearch onSelect={selectCity} />
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}>Weather</NavLink>
        <NavLink to="/favorites" className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}><Heart size={15} /> Favorites</NavLink>
      </nav>
    </header>
  );
}

function LoadingState() {
  return <div className="loading-state" role="status"><span className="loading-indicator" /> Reading the sky...</div>;
}

function WeatherPage({ city, favorites, onToggleFavorite }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryKey, setRetryKey] = useState(0);
  const isFavorite = favorites.some((favorite) => favorite.id === city.id);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetchWeather(city, controller.signal)
      .then(setWeather)
      .catch((fetchError) => { if (fetchError.name !== 'AbortError') setError(fetchError.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [city, retryKey]);

  const cityLine = [city.region, city.country].filter(Boolean).join(', ');
  const currentHourIndex = weather
    ? Math.max(0, weather.hourly.time.findIndex((time) => time >= weather.current.time))
    : 0;

  return (
    <main className="page-content">
      <div className="page-heading">
        <div><p className="eyebrow">Local forecast</p><h1>Weather</h1></div>
        <span className="updated-label"><span className="live-dot" /> LIVE CONDITIONS</span>
      </div>
      {loading ? <LoadingState /> : error ? (
        <section className="error-state" role="alert">
          <Cloud size={30} /><p>{error}</p>
          <button className="text-button" type="button" onClick={() => setRetryKey((key) => key + 1)}>Try again</button>
        </section>
      ) : weather ? (
        <>
          <section className="current-weather" aria-label={`Current weather in ${city.name}`}>
            <div className="current-weather__main">
              <div className="location-line"><MapPin size={15} /> {city.name}{cityLine ? `, ${cityLine}` : ''}</div>
              <div className="current-reading">
                <WeatherIcon code={weather.current.weather_code} size={58} />
                <span className="temperature">{Math.round(weather.current.temperature_2m)}°</span>
              </div>
              <p className="condition-label">{describeWeather(weather.current.weather_code)}</p>
              <p className="feels-like">Feels like {Math.round(weather.current.apparent_temperature)}°</p>
            </div>
            <div className="current-weather__aside">
              <button className={`favorite-button${isFavorite ? ' favorite-button--saved' : ''}`} type="button" onClick={() => onToggleFavorite(city)} aria-pressed={isFavorite}>
                <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
                {isFavorite ? 'Saved to favorites' : 'Add to favorites'}
              </button>
              <div className="today-range">
                <span className="today-range__label">TODAY</span>
                <div><span>High</span><strong>{Math.round(weather.daily.temperature_2m_max[0])}°</strong></div>
                <div><span>Low</span><strong>{Math.round(weather.daily.temperature_2m_min[0])}°</strong></div>
              </div>
              <p className="current-date">{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric', timeZone: weather.timezone }).format(new Date(weather.current.time))}</p>
            </div>
          </section>

          <section className="conditions" aria-label="Current conditions">
            <div className="condition-stat"><Droplets size={19} /><span>Humidity</span><strong>{weather.current.relative_humidity_2m}%</strong></div>
            <div className="condition-stat"><Wind size={19} /><span>Wind</span><strong>{Math.round(weather.current.wind_speed_10m)} km/h</strong></div>
            <div className="condition-stat"><CloudRain size={19} /><span>Rain today</span><strong>{weather.daily.precipitation_probability_max[0] ?? 0}%</strong></div>
          </section>

          <section className="forecast-section" aria-labelledby="hourly-title">
            <div className="section-heading"><div><p className="eyebrow">The next few hours</p><h2 id="hourly-title">Hourly forecast</h2></div><span className="section-note">LOCAL TIME</span></div>
            <div className="hourly-list">
              {weather.hourly.time.slice(currentHourIndex, currentHourIndex + 12).map((time, index) => {
                const hourIndex = currentHourIndex + index;
                return (
                  <div className={`hour-item${index === 0 ? ' hour-item--now' : ''}`} key={time}>
                    <span className="hour-item__time">{index === 0 ? 'Now' : formatHour(time, weather.timezone)}</span>
                    <WeatherIcon code={weather.hourly.weather_code[hourIndex]} size={22} />
                    <strong>{Math.round(weather.hourly.temperature_2m[hourIndex])}°</strong>
                    <span className="hour-item__rain"><Droplets size={11} /> {weather.hourly.precipitation_probability[hourIndex] ?? 0}%</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="forecast-section week-section" aria-labelledby="week-title">
            <div className="section-heading"><div><p className="eyebrow">A little further out</p><h2 id="week-title">6-day outlook</h2></div><span className="section-note">HIGH / LOW</span></div>
            <div className="week-list">
              {weather.daily.time.map((date, index) => (
                <div className="day-row" key={date}>
                  <span className="day-row__name">{index === 0 ? 'Today' : formatWeekday(date)}</span>
                  <WeatherIcon code={weather.daily.weather_code[index]} size={21} />
                  <span className="day-row__condition">{describeWeather(weather.daily.weather_code[index])}</span>
                  <span className="day-row__rain"><Droplets size={12} /> {weather.daily.precipitation_probability_max[index] ?? 0}%</span>
                  <strong>{Math.round(weather.daily.temperature_2m_max[index])}°</strong>
                  <span className="day-row__low">{Math.round(weather.daily.temperature_2m_min[index])}°</span>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
      <footer className="data-note">Weather data by Open-Meteo <ArrowUpRight size={12} aria-hidden="true" /></footer>
    </main>
  );
}

function FavoriteCity({ city, onSelect, onRemove }) {
  const [weather, setWeather] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetchWeather(city, controller.signal).then(setWeather).catch(() => setFailed(true));
    return () => controller.abort();
  }, [city]);

  return (
    <article className="favorite-city">
      <button className="favorite-city__open" type="button" onClick={() => onSelect(city)}>
        <span className="favorite-city__pin"><MapPin size={17} /></span>
        <span className="favorite-city__name"><strong>{city.name}</strong><small>{[city.region, city.country].filter(Boolean).join(', ')}</small></span>
        {weather ? <span className="favorite-city__weather"><WeatherIcon code={weather.current.weather_code} size={24} /><strong>{Math.round(weather.current.temperature_2m)}°</strong></span> : <span className="favorite-city__loading">{failed ? 'Unavailable' : 'Loading'}</span>}
        <span className="favorite-city__condition">{weather ? describeWeather(weather.current.weather_code) : ''}</span>
        <ArrowUpRight className="favorite-city__arrow" size={17} />
      </button>
      <button className="favorite-remove" type="button" onClick={() => onRemove(city.id)} aria-label={`Remove ${city.name} from favorites`} title="Remove favorite"><X size={17} /></button>
    </article>
  );
}

function FavoritesPage({ favorites, onRemove, onSelectCity }) {
  const navigate = useNavigate();
  function selectCity(city) {
    onSelectCity(city);
    navigate('/');
  }
  return (
    <main className="page-content favorites-page">
      <div className="page-heading">
        <div><p className="eyebrow">Your saved places</p><h1>Favorites</h1></div>
        <span className="favorites-count">{String(favorites.length).padStart(2, '0')} CITIES</span>
      </div>
      {favorites.length === 0 ? (
        <section className="favorites-empty">
          <span className="favorites-empty__icon"><Heart size={22} /></span>
          <h2>No favorite cities yet</h2>
          <p>Search for a city and save it to keep its forecast close.</p>
          <Link className="browse-button" to="/">Explore weather <ArrowUpRight size={15} /></Link>
        </section>
      ) : (
        <section className="favorites-list" aria-label="Favorite cities">
          <div className="favorites-list__header"><span>CITY</span><span>NOW</span><span>CONDITIONS</span></div>
          {favorites.map((city) => <FavoriteCity key={city.id} city={city} onSelect={selectCity} onRemove={onRemove} />)}
        </section>
      )}
      <footer className="data-note">Favorites are saved on this device <Heart size={12} aria-hidden="true" /></footer>
    </main>
  );
}

export default function App() {
  const [city, setCity] = useState(defaultCity);
  const [favorites, setFavorites] = useState(getStoredFavorites);
  useEffect(() => {
    try { localStorage.setItem('isobar-favorites', JSON.stringify(favorites)); } catch { /* Storage can be disabled by the browser. */ }
  }, [favorites]);

  function toggleFavorite(selectedCity) {
    setFavorites((current) => current.some((favorite) => favorite.id === selectedCity.id)
      ? current.filter((favorite) => favorite.id !== selectedCity.id)
      : [...current, selectedCity]);
  }
  const removeFavorite = (cityId) => setFavorites((current) => current.filter((cityItem) => cityItem.id !== cityId));

  return (
    <div className="app-shell">
      <Header onSelectCity={setCity} />
      <Routes>
        <Route path="/" element={<WeatherPage city={city} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} onRemove={removeFavorite} onSelectCity={setCity} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}