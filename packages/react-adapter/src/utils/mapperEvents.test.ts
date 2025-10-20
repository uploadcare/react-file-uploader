import { describe, expect, it } from "vitest";
import { mapEvents } from "./mapperEvents.ts";

describe("mapEvents", () => {
  it("converts kebab-case event types into camelCase event handler names", () => {
    const eventType = {
      click: "click",
      "key-up": "key-up",
    };
    const expected = {
      onClick: "click",
      onKeyUp: "key-up",
    };

    const result = mapEvents(eventType);
    expect(result).toEqual(expected);
  });

  it("handles empty input", () => {
    const result = mapEvents({});
    expect(result).toEqual({});
  });

  it("leaves non-kebab-case strings unchanged, except for prefixing", () => {
    const eventType = {
      scroll: "scroll",
    };
    const expected = {
      onScroll: "scroll",
    };

    const result = mapEvents(eventType);
    expect(result).toEqual(expected);
  });
});
