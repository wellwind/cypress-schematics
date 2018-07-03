import { chain, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';

import { addPackageJson, installPackages } from '../utilities/packages';

function createCypressFolderAndFiles() {
  return (tree: Tree, context: SchematicContext) => {
    const targetFileName = '/cypress/plugins/index.js';
    const basicPluginsFile = url('./files')(context) as Tree;
    const pluginFileContent = basicPluginsFile.read('index.js')!.toString('utf-8');
    if (!tree.exists(targetFileName)) {
      tree.create(targetFileName, pluginFileContent);
    }
    return tree;
  };
}

export default function ngAdd(): Rule {
  return chain([addPackageJson('cypress'), installPackages(), createCypressFolderAndFiles()]);
}
