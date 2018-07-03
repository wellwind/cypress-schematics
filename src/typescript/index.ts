import { chain, Rule, Tree } from '@angular-devkit/schematics';

import { moveFolderFiles } from '../utilities/files';
import { addPackageJson, installPackages } from '../utilities/packages';

function addTypescriptSupport() {
  return (tree: Tree) => {
    const tragetFilePath = '/cypress/plugins/index.js';
    const fileContent = tree.read(tragetFilePath)!.toString('utf-8');

    const regExp = /(module\.exports.*){(.*?)}(.*?)/s;
    const overwriteContent = fileContent.replace(regExp, (_match, p0, p1, p2) => {
      const requireStatement = `const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')`;
      const mainStatement = `on('file:preprocessor', cypressTypeScriptPreprocessor)`;
      return `${requireStatement}\n${p0}{${p1}\n    ${mainStatement}\n}\n${p2}`;
    });

    tree.overwrite(tragetFilePath, overwriteContent);

    return tree;
  };
}

export default function typescript(): Rule {
  return chain([
    addPackageJson('@bahmutov/add-typescript-to-cypress'),
    installPackages(),
    addTypescriptSupport(),
    moveFolderFiles('./files', '/cypress')
  ]);
}
