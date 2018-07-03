# Cypress Schematics

A schematics collection for installing [Cypress.io](https://www.cypress.io/)

This library is designed for Angular CLI project, however, you still can use this for any project you want to run e2e teseting.

## Using Angular CLI

### Requirements

Angular CLI 6.0.0+

### Usage

Just run the `ng add` command:

`ng add cypress-schematics`

You can also enable typescript and cucumber support by add following parameters.

- `--typescript`: Add typescript support .
- `--cucumber`: Add cucumber support.

If you don't enable typescript or cucumber support when `ng add`, you can still enable them after.

To enable typescript support:

`ng g cypress-schematics:typescript`

To enable cypress support:

`ng g cypress-schematics:cucumber`

## Without Angular CLI

### Requirements

Install `@angular-devkit/schematics-cli`

`npm i -g @angular-devkit/schematics-cli`

And install `cypress-schematics` in the folder you want to add cypress:

`npm i cypress-schematics`

### Usage

You can use schematics-cli to add cypress to any your project.

`schematics cypress-schematics:ng-add`

Also, just add `--typescript` or `--cucumber` to add another supports.

If you want to enable them later, you can still using schematics-cli.

To enable typescript support:

`schematics cypress-schematics:typescript`

To enable cypress support:

`schematics cypress-schematics:cucumber`
