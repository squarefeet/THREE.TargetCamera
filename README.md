THREE.TargetCamera
==================
A dual-function perspective target camera for use with THREE.js. It can be used as both a third-person chase camera, or a first-person camera, or a static camera that follows a target.
Since this camera is a moving object, it needs to be updated on a per-frame basis. To to this, call the `update()` method from within your render loop.

**This README isn't finished yet. To see how it works, look in the `examples` folder.**



Usage
=====
You can use this camera almost as a drop-in replacement for a normal THREE camera.
**TODO**

Options
=======
In addition to the usual THREE.PerspectiveCamera settings, the following are also available:
**TODO*


Building
========
This project uses [Grunt](http://gruntjs.com/) to create the minimized build. If you make changes and want to build it, follow these steps:

If you don't have grunt installed, first make sure you've got [NodeJS](http://nodejs.org/) and NPM installed, then install Grunt CLI. You might have to do this as root:

```npm install -g grunt-cli```

Now you can install the local grunt package

```cd [projectFolder]```

```npm install```

```grunt```


The output of grunt will sit in the `build` folder.
