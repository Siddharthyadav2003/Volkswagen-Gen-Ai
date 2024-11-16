export interface WeatherData {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    icon: string;
    city: string;
    precipitation: number;
  }
  
  class WeatherService {
    private apiKey: string;
    private baseUrl: string;
  
    constructor() {
      this.apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';
      this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }
  
    async getCurrentLocationWeather(): Promise<WeatherData> {
      try {
        // Get current position using Promise
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        const { latitude, longitude } = position.coords;
        return this.getCurrentWeather(latitude, longitude);
      } catch (error) {
        console.error('Error getting location:', error);
        // Fallback to default location (Greater Noida)
        return this.getCurrentWeather(28.4744, 77.5040);
      }
    }
  
    async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
      try {
        const response = await fetch(
          `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`,
          { cache: 'no-store' }
        );
  
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.statusText}`);
        }
  
        const data = await response.json();
  
        return {
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6),
          feelsLike: Math.round(data.main.feels_like),
          icon: data.weather[0].icon,
          city: data.name,
          precipitation: data.rain?.['1h'] || 0
        };
      } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
      }
    }
  }
  
  export const weatherService = new WeatherService();