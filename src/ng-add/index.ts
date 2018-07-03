import { chain, noop, Rule } from '@angular-devkit/schematics';

import { cucumberSteps } from '../cucumber';
import { typescriptSteps } from '../typescript';
import { moveFolderFiles } from '../utilities/files';
import { addPackageJson, installPackages } from '../utilities/packages';

interface NgAddOptions {
  typescript: boolean | 'false';
  cucumber: boolean | 'false';
}

const defaultSteps = [addPackageJson('cypress'), installPackages(), moveFolderFiles(__dirname + '/files', '/cypress')];

export default function ngAdd(options: NgAddOptions): Rule {
  const typescriptSupportSteps = options.typescript && options.typescript !== 'false' ? typescriptSteps() : [noop()];
  const cucumberSupportSteps = options.cucumber && options.cucumber !== 'false' ? cucumberSteps() : [noop()];
  return chain([...defaultSteps, ...typescriptSupportSteps, ...cucumberSupportSteps]);
}
