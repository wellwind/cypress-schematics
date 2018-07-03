import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import { addPackageJsonDependency, NodeDependencyType } from './dependencies';

export function addPackageJson(name: string, version = '*') {
  return (tree: Tree) => {
    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Dev,
      name: name,
      version: version
    });
    return tree;
  };
}

export function installPackages() {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
