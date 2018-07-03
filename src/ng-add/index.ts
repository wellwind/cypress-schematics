import { chain, Rule } from '@angular-devkit/schematics';

import { moveFolderFiles } from '../utilities/files';
import { addPackageJson, installPackages } from '../utilities/packages';

export default function ngAdd(): Rule {
  return chain([addPackageJson('cypress'), installPackages(), moveFolderFiles('./files/', '/cypress')]);
}
