import { describe, expect, it } from "vitest";
import {
  getSunPhase,
  getSunPhaseLabel,
  getSunProgress,
} from "@/lib/domain/sun-path";

describe("getSunProgress", () => {
  it("returns 0 before sunrise", () => {
    const sunrise = new Date("2025-01-01T06:00:00Z");
    const sunset = new Date("2025-01-01T18:00:00Z");
    const now = new Date("2025-01-01T05:00:00Z");
    expect(getSunProgress(now, sunrise, sunset)).toBe(0);
  });

  it("returns 1 after sunset", () => {
    const sunrise = new Date("2025-01-01T06:00:00Z");
    const sunset = new Date("2025-01-01T18:00:00Z");
    const now = new Date("2025-01-01T19:00:00Z");
    expect(getSunProgress(now, sunrise, sunset)).toBe(1);
  });

  it("returns mid progress at midday", () => {
    const sunrise = new Date("2025-01-01T06:00:00Z");
    const sunset = new Date("2025-01-01T18:00:00Z");
    const now = new Date("2025-01-01T12:00:00Z");
    expect(getSunProgress(now, sunrise, sunset)).toBeCloseTo(0.5, 2);
  });
});

describe("getSunPhase", () => {
  it("returns night before sunrise", () => {
    const sunrise = new Date("2025-01-01T06:00:00Z");
    const sunset = new Date("2025-01-01T18:00:00Z");
    const now = new Date("2025-01-01T05:30:00Z");
    expect(getSunPhase(now, sunrise, sunset)).toBe("night");
  });

  it("returns dawn just after sunrise", () => {
    const sunrise = new Date("2025-01-01T06:00:00Z");
    const sunset = new Date("2025-01-01T18:00:00Z");
    const now = new Date("2025-01-01T06:30:00Z");
    expect(getSunPhase(now, sunrise, sunset)).toBe("dawn");
  });

  it("returns day in the middle", () => {
    const sunrise = new Date("2025-01-01T06:00:00Z");
    const sunset = new Date("2025-01-01T18:00:00Z");
    const now = new Date("2025-01-01T12:00:00Z");
    expect(getSunPhase(now, sunrise, sunset)).toBe("day");
  });

  it("returns dusk before sunset", () => {
    const sunrise = new Date("2025-01-01T06:00:00Z");
    const sunset = new Date("2025-01-01T18:00:00Z");
    const now = new Date("2025-01-01T17:30:00Z");
    expect(getSunPhase(now, sunrise, sunset)).toBe("dusk");
  });
});

describe("getSunPhaseLabel", () => {
  it("returns label for each phase", () => {
    expect(getSunPhaseLabel("night")).toBe("夜");
    expect(getSunPhaseLabel("dawn")).toBe("朝焼け");
    expect(getSunPhaseLabel("day")).toBe("日中");
    expect(getSunPhaseLabel("dusk")).toBe("夕焼け");
  });
});
