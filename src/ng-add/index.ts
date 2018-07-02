import { chain, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import { addPackageJsonDependency, NodeDependencyType } from '../utilities/dependencies';

function addCypressToPackageJson() {
  return (tree: Tree) => {
    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Dev,
      name: 'cypress',
      version: '*'
    });
    return tree;
  };
}

function installPackages() {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

function createCypressFolder() {
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
  return chain([addCypressToPackageJson(), installPackages(), createCypressFolder()]);
}
