import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";

export class JsonStore {
  private readonly root: string;

  constructor(root: string) {
    this.root = resolve(root);
  }

  async read<T>(relativePath: string): Promise<T> {
    const filePath = this.resolveSafe(relativePath);
    return JSON.parse(await readFile(filePath, "utf8")) as T;
  }

  async write<T>(relativePath: string, value: T): Promise<void> {
    const filePath = this.resolveSafe(relativePath);
    await mkdir(dirname(filePath), { recursive: true });
    const temporaryPath = `${filePath}.${process.pid}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
    await rename(temporaryPath, filePath);
  }

  private resolveSafe(relativePath: string): string {
    if (isAbsolute(relativePath)) {
      throw new Error("Path is outside the JSON store root");
    }

    const candidate = resolve(join(this.root, relativePath));
    const pathFromRoot = relative(this.root, candidate);
    if (pathFromRoot.startsWith("..") || isAbsolute(pathFromRoot)) {
      throw new Error("Path is outside the JSON store root");
    }

    return candidate;
  }
}
