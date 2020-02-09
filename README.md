# Yo generator for AGL application structure.

This is a [Yeoman generator](https://yeoman.io/) that will help you getting started with writing apps for [AGL platform](https://www.automotivelinux.org/).

## Prerequisites

[NodeJS](https://nodejs.org/en/)

## Installing Yo and AGL generator

For Yeoman:
```bash
npm install -g yo
```
and for agl generator:
```bash
npm install -g generator-agl
```
## Generating initial structure for an AGL app

Run a new terminal from the folder where you want your app to be generated and issue the following command for AGL native app:
```bash
yo agl:native
```
or for AGL HTML5 app:
```bash
yo agl:web
```
then answers to the questions regarding your new app and at the end you will have a new directory with the required structure created.

## License

[MIT](https://github.com/ene-ilies/agl-generator-app/blob/master/LICENSE)
