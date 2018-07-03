import { apply, branchAndMerge, mergeWith, move, url } from '@angular-devkit/schematics';

export function moveFolderFiles(from: string, to: string) {
  const templateSource = apply(url(from), [move(to)]);
  return branchAndMerge(mergeWith(templateSource));
}
