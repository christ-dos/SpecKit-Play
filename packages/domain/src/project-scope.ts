import { isAbsolute, relative, resolve } from "node:path";

export function assertLocalFolder(folder: string): string {
  if (!isAbsolute(folder)) {
    throw new Error("A storage folder must be an absolute local path");
  }
  return resolve(folder);
}

export function isInsideProject(projectPath: string, candidatePath: string): boolean {
  const fromProject = relative(resolve(projectPath), resolve(candidatePath));
  return fromProject === "" || (!fromProject.startsWith("..") && !isAbsolute(fromProject));
}

export function assertStorageTarget(projectPath: string, storageTarget: string): string {
  const target = assertLocalFolder(storageTarget);
  if (!isInsideProject(projectPath, target)) {
    throw new Error("An external local storage folder requires explicit confirmation");
  }
  return target;
}
