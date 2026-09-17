import { describe, expect, it } from "vitest";
import { pm25Level } from "@/lib/domain/observation-level";

describe("pm25Level", () => {
  it("maps each range to the level shared with the air quality label", () => {
    expect(pm25Level(15)).toBe(1);
    expect(pm25Level(15.1)).toBe(3);
    expect(pm25Level(35)).toBe(3);
    expect(pm25Level(35.1)).toBe(4);
    expect(pm25Level(70)).toBe(4);
    expect(pm25Level(70.1)).toBe(5);
  });
});
