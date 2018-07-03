import { chain, Rule } from '@angular-devkit/schematics';

import { addPluginToCypress } from '../utilities/cypress';
import { moveFolderFiles } from '../utilities/files';
import { addPackageJson, installPackages } from '../utilities/packages';

export default function typescript(): Rule {
  return chain([
    addPackageJson('cypress-cucumber-preprocessor'),
    installPackages(),
    addPluginToCypress(
      `const cucumber = require('cypress-cucumber-preprocessor').default`,
      `on('file:preprocessor', cucumber())`
    ),
    moveFolderFiles('./files', '/cypress')
  ]);
}
