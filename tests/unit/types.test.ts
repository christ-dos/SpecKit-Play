import { describe, expect, it } from "vitest";
import { err, ok, type Result } from "../../packages/domain/src/types.js";

describe("domain results", () => {
  it("creates a successful result", () => {
    const result: Result<number> = ok(42);

    expect(result).toEqual({ ok: true, value: 42 });
  });

  it("creates a failed result with a stable error code", () => {
    const result = err("INVALID_SCOPE", "The path is outside the project");

    expect(result).toEqual({
      ok: false,
      error: { code: "INVALID_SCOPE", message: "The path is outside the project" },
    });
  });
});
