import { describe, expect, it } from "vitest";
import {
  getWeatherClassification,
  getWeatherCondition,
} from "@/lib/domain/weather-classification";

describe("getWeatherCondition", () => {
  it("returns clear for code 0", () => {
    expect(getWeatherCondition(0)).toBe("clear");
  });

  it("returns rain for range 61-65", () => {
    expect(getWeatherCondition(61)).toBe("rain");
    expect(getWeatherCondition(63)).toBe("rain");
    expect(getWeatherCondition(65)).toBe("rain");
  });

  it("returns snow-showers for 85-86", () => {
    expect(getWeatherCondition(85)).toBe("snow-showers");
    expect(getWeatherCondition(86)).toBe("snow-showers");
  });

  it("returns thunderstorm for 95-99", () => {
    expect(getWeatherCondition(95)).toBe("thunderstorm");
    expect(getWeatherCondition(99)).toBe("thunderstorm");
  });

  it("returns unknown for unsupported code", () => {
    expect(getWeatherCondition(999)).toBe("unknown");
  });
});

describe("getWeatherClassification", () => {
  it("returns label and icon for known code", () => {
    const classification = getWeatherClassification(2);
    expect(classification.label).toBe("薄曇り");
    expect(classification.iconKey).toBe("cloud-sun");
  });
});
