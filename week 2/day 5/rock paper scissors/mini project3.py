import os


PARIS_ID = 2988507


def get_owm():
    try:
        from pyowm import OWM
    except ImportError as error:
        raise RuntimeError("Install PyOWM with: pip install pyowm") from error
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise RuntimeError("Set OPENWEATHER_API_KEY before running the app.")
    return OWM(api_key)


def get_weather_by_id(city_id):
    weather_manager = get_owm().weather_manager()
    observation = weather_manager.weather_at_id(city_id)
    weather = observation.weather
    return observation, weather


def display_weather(city_name, observation):
    weather = observation.weather
    temperature = weather.temperature("celsius").get("temp")
    wind = weather.wind()
    sunrise = weather.sunrise_time(timeformat="date")
    sunset = weather.sunset_time(timeformat="date")
    print(f"\nWeather in {city_name}")
    print(f"Condition: {weather.detailed_status.title()}")
    print(f"Temperature: {temperature} C")
    print(f"Humidity: {weather.humidity}%")
    print(f"Wind: {wind.get('speed', 'unknown')} m/s, direction {wind.get('deg', 'unknown')} degrees")
    print(f"Sunrise: {sunrise:%Y-%m-%d %H:%M}")
    print(f"Sunset: {sunset:%Y-%m-%d %H:%M}")


def display_forecast(forecast):
    print("\nFive-day forecast:")
    for weather in forecast.get_weathers():
        timestamp = weather.reference_time(timeformat="date")
        temperature = weather.temperature("celsius").get("temp")
        print(f"{timestamp:%Y-%m-%d %H:%M}: {weather.detailed_status}, {temperature} C, humidity {weather.humidity}%")


def get_air_pollution(latitude, longitude):
    pollution_manager = get_owm().airpollution_manager()
    return pollution_manager.air_quality_at_coords(latitude, longitude).get_air_quality()


def init_plot(axis):
    axis.set_ylabel("Humidity (%)")
    axis.set_title("Three-Day Humidity Forecast")
    axis.set_ylim(0, 100)
    axis.grid(axis="y", alpha=0.3)


def write_humidity_on_bar_chart(axis, bars, values):
    for bar, value in zip(bars, values):
        axis.text(bar.get_x() + bar.get_width() / 2, value + 2, f"{value:.0f}%", ha="center")


def plot_temperatures(forecast, axis):
    daily_values = {}
    for weather in forecast.get_weathers():
        date = weather.reference_time(timeformat="date").date()
        if len(daily_values) >= 3 and date not in daily_values:
            continue
        daily_values.setdefault(date, []).append(weather.humidity)
    dates = list(daily_values)[:3]
    values = [sum(daily_values[date]) / len(daily_values[date]) for date in dates]
    bars = axis.bar([date.strftime("%a") for date in dates], values, color="#e76f51")
    write_humidity_on_bar_chart(axis, bars, values)


def show_humidity_chart(forecast):
    try:
        import matplotlib.pyplot as plt
    except ImportError as error:
        raise RuntimeError("Install Matplotlib with: pip install matplotlib") from error
    figure, axis = plt.subplots(figsize=(8, 5))
    init_plot(axis)
    plot_temperatures(forecast, axis)
    figure.tight_layout()
    plt.show()


def main():
    try:
        paris_observation, _ = get_weather_by_id(PARIS_ID)
        display_weather("Paris", paris_observation)
        location = paris_observation.location
        print(f"Air pollution index: {get_air_pollution(location.lat, location.lon)}")
        weather_manager = get_owm().weather_manager()
        display_forecast(weather_manager.forecast_at_id(PARIS_ID, "3h"))

        city_id = input("Enter another city ID, or press Enter to use Paris: ").strip()
        city_id = int(city_id) if city_id else PARIS_ID
        observation, _ = get_weather_by_id(city_id)
        display_weather(f"city ID {city_id}", observation)
        show_humidity_chart(weather_manager.forecast_at_id(city_id, "3h"))
    except (ValueError, RuntimeError, OSError) as error:
        print(f"Weather app error: {error}")


if __name__ == "__main__":
    main()
