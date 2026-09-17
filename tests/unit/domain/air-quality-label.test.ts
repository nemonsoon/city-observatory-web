import { describe, expect, it } from "vitest";
import { classifyAirQualityLabel } from "@/lib/domain/air-quality-label";

describe("classifyAirQualityLabel", () => {
  it("classifies up to the annual environmental standard as good", () => {
    expect(classifyAirQualityLabel(0)).toBe("good");
    expect(classifyAirQualityLabel(10)).toBe("good");
    expect(classifyAirQualityLabel(15)).toBe("good");
  });

  it("classifies up to the daily environmental standard as moderate", () => {
    expect(classifyAirQualityLabel(15.1)).toBe("moderate");
    expect(classifyAirQualityLabel(35)).toBe("moderate");
  });

  it("classifies up to the advisory threshold as unhealthy", () => {
    expect(classifyAirQualityLabel(35.1)).toBe("unhealthy");
    expect(classifyAirQualityLabel(70)).toBe("unhealthy");
  });

  it("classifies above the advisory threshold as hazardous", () => {
    expect(classifyAirQualityLabel(70.1)).toBe("hazardous");
    expect(classifyAirQualityLabel(120)).toBe("hazardous");
  });
});
