import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { spawnSync } from 'child_process';
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

function startCypress() {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('run');
    spawnSync('npx', ['cypress', 'run']);
    return tree;
  };
}

export default function ngAdd(): Rule {
  return chain([addCypressToPackageJson(), installPackages(), startCypress()]);
}
