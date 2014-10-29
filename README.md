# United World Wrestling Styleguide

This is a Yeoman generated styleguide for unitedworldwrestling.

Website: [http://unitedworldwrestling.org](http://unitedworldwrestling.org)
Staging: [http://staging.unitedworldwrestling.org](http://staging.unitedworldwrestling.org)
Repo: [https://bitbucket.org/fila-wrestling/unitedworldwrestling-drupal7](https://bitbucket.org/fila-wrestling/unitedworldwrestling-drupal7)

This styleguide is published to Bower and needs to be installed on the main project as a dependency. This way we can update it easily through here.


### Installation

To setup your work environment, make sure you first have [NodeJS](http://nodejs.org/) and the [Hologram gem](https://github.com/trulia/hologram) installed globally.

```bash
# Install bower globally
$ npm install -g bower

# Install all npm dependencies
$ npm install

# Install all bower dependencies
$ bower install
```


### How to build the styleguide

(All tasks are available on their own, just type `$ gulp -T` to list them all.)

The default `$ gulp` command will clean all previously built folders, compile all `.scss` files, compile all `.js` files, concatenate all `.js` files, lint .js files, build the hologram styleguide.

```bash
$ gulp
```

### How to watch and compile files as you go

The `$ gulp serve` task will launch a Browser-Sync server and watch all changes in `.scss` files as you go.

```bash
$ gulp serve
```

### How to publish to GH Pages

Just use this to publish the styleguide to the [gh-pages](http://unitedworldwrestling.github.io/styleguide/). 

```bash
$ gulp deploy
```
