THREE.TargetCamera
==================
A dual-function perspective target camera for use with THREE.js. It can be used as both a third-person chase camera, or a first-person camera.

Each `mode` (first- or third-person) has a `stiffness` setting. A low stiffness setting denotes a smoother follow action, a higher stiffness setting means the camera will "stick" to it's target more closely.

Each `mode` also has a position associated with it. This is where the camera will try to stick to when following the target.A typical setting for the third-person mode would be behind and slightly above the target.

Since this camera is a moving object, it needs to be updated on a per-frame basis. To to this, call the `update()` method from within your render loop.


Usage
=====
You can use this camera almost as a drop-in replacement for a normal THREE camera. The only difference is the way the fov, aspect, near and far arguments are set:

```javascript

var camera = new THREE.TargetCamera( {
    // The usual THREE.PerspectiveCamera settings
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    target: myTargetObject
} );


// In your render loop:
camera.update();
```

Options
=======
In addition to the usual THREE.PerspectiveCamera settings, the following are also available:

**`target`**: An instance (in some form or another) of a THREE.Object3D

**`mode`**: `"first"` or `"third"`. Whether the camera should be in first- or third-person mode.

**`firstPersonStiffness`**: A number between `0` and `1`. 

**`thirdPersonStiffness`**: A number between `0` and `1`. 

**`modeTransitionStiffness`**: A number between `0` and `1`. Used when the `mode` is switched.

**`firstPersonPosition`**: An instance of `THREE.Vector3`. The chase position to aim for when in first-person mode.

**`thirdPersonPosition`**: An instance of `THREE.Vector3`. The chase position to aim for when in third-person mode.


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
