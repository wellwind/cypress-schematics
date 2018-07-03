import { SchematicsException } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';

export function addPluginToCypress(requireStatement: string, mainStatement: string) {
  return (tree: Tree) => {
    const tragetFilePath = '/cypress/plugins/index.js';
    if (!tree.exists(tragetFilePath)) {
      throw new SchematicsException(`The plugin configuration file not exists. (${tragetFilePath})`);
    }

    const fileContent = tree.read(tragetFilePath)!.toString('utf-8');

    const regExp = /(module\.exports.*){(.*?)}(.*?)/s;
    const overwriteContent = fileContent.replace(regExp, (_match, p0, p1, p2) => {
      return `${requireStatement}\n${p0}{${p1}\n    ${mainStatement}\n}\n${p2}`;
    });

    tree.overwrite(tragetFilePath, overwriteContent);

    return tree;
  };
}
