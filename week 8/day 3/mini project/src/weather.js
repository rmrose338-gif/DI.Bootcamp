const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export async function searchCities(query, signal) {
  const params = new URLSearchParams({ name: query, count: '6', language: 'en', format: 'json' });
  const response = await fetch(`${GEOCODING_URL}?${params}`, { signal });
  if (!response.ok) throw new Error('City search is unavailable right now.');
  const result = await response.json();
  return (result.results ?? []).map((city) => ({
    id: String(city.id),
    name: city.name,
    region: city.admin1 ?? '',
    country: city.country ?? '',
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone ?? 'auto',
  }));
}

export async function fetchWeather(city, signal) {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,precipitation_probability,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    forecast_days: '6',
    timezone: city.timezone || 'auto',
  });
  const response = await fetch(`${FORECAST_URL}?${params}`, { signal });
  if (!response.ok) throw new Error('Weather data could not be loaded. Please try again.');
  return response.json();
}

export function describeWeather(code) {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mostly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code === 85 || code === 86) return 'Snow showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Variable clouds';
}

export function getStoredFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem('isobar-favorites') ?? '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function formatWeekday(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en', { weekday: 'short' });
}

export function formatHour(date, timezone) {
  return new Intl.DateTimeFormat('en', { hour: 'numeric', timeZone: timezone || 'UTC' }).format(new Date(date));
}