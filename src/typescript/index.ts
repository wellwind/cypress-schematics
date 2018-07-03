import { chain, Rule } from '@angular-devkit/schematics';

import { addPluginToCypress } from '../utilities/cypress';
import { moveFolderFiles } from '../utilities/files';
import { addPackageJson, installPackages } from '../utilities/packages';

export default function typescript(): Rule {
  return chain([
    addPackageJson('@bahmutov/add-typescript-to-cypress'),
    installPackages(),
    addPluginToCypress(
      `const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')`,
      `on('file:preprocessor', cypressTypeScriptPreprocessor)`
    ),
    moveFolderFiles('./files', '/cypress')
  ]);
}
