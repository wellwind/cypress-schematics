import { chain, Rule } from '@angular-devkit/schematics';

import { addPluginToCypress } from '../utilities/cypress';
import { moveFolderFiles } from '../utilities/files';
import { addPackageJson, installPackages } from '../utilities/packages';

export function cucumberSteps() {
  return [
    addPackageJson('cypress-cucumber-preprocessor'),
    installPackages(),
    addPluginToCypress(
      `const cucumber = require('cypress-cucumber-preprocessor').default`,
      `on('file:preprocessor', cucumber())`
    ),
    moveFolderFiles(__dirname + '/files', '/cypress')
  ];
}

export default function cucumber(): Rule {
  return chain(cucumberSteps());
}
