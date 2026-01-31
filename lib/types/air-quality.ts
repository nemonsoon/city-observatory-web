export type AirQualityHourly = {
  time: string[];
  pm10: number[];
  pm2_5: number[];
  nitrogen_dioxide: number[];
  ozone: number[];
};

export type AirQualityHourlyRaw = {
  time: string[];
  pm10: Array<number | null>;
  pm2_5: Array<number | null>;
  nitrogen_dioxide: Array<number | null>;
  ozone: Array<number | null>;
};

export type AirQualityResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: AirQualityHourly;
};

export type AirQualityResponseRaw = {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: AirQualityHourlyRaw;
};
