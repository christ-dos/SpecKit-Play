import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { JsonStore } from "../../packages/persistence/src/json-store.js";

describe("JsonStore", () => {
  it("writes and reads JSON atomically through the project store", async () => {
    const root = await mkdtemp(join(tmpdir(), "speckit-play-"));
    const store = new JsonStore(root);

    await store.write("context.json", { projectId: "project-1", status: "ready" });

    await expect(store.read("context.json")).resolves.toEqual({
      projectId: "project-1",
      status: "ready",
    });
    await expect(readFile(join(root, "context.json"), "utf8")).resolves.toContain("project-1");
  });

  it("rejects paths that escape the store root", async () => {
    const root = await mkdtemp(join(tmpdir(), "speckit-play-"));
    const store = new JsonStore(root);

    await expect(store.read("../outside.json")).rejects.toThrow("outside");
  });
});
