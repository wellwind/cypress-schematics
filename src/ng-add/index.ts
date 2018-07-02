import { chain, Rule, Tree } from '@angular-devkit/schematics';
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

export default function ngAdd(): Rule {
  return chain([addCypressToPackageJson()]);
}
