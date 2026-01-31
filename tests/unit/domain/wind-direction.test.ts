import { describe, expect, it } from "vitest";
import {
  getWindDirectionLabel,
  getWindDirectionRotation,
} from "@/lib/domain/wind-direction";

describe("getWindDirectionLabel", () => {
  it("returns north for 0 degrees", () => {
    expect(getWindDirectionLabel(0)).toBe("北");
  });

  it("returns east for 90 degrees", () => {
    expect(getWindDirectionLabel(90)).toBe("東");
  });

  it("returns south for 180 degrees", () => {
    expect(getWindDirectionLabel(180)).toBe("南");
  });

  it("normalizes negative degrees", () => {
    expect(getWindDirectionLabel(-10)).toBe("北");
  });
});

describe("getWindDirectionRotation", () => {
  it("normalizes degrees to 0-359", () => {
    expect(getWindDirectionRotation(360)).toBe(0);
    expect(getWindDirectionRotation(450)).toBe(90);
  });
});
