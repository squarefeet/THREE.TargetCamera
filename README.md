THREE.TargetCamera
==================
A dual-function perspective target camera for use with THREE.js. It can be used as both a third-person chase camera, or a first-person camera, or a static camera that follows a target.
Since this camera is a moving object, it needs to be updated on a per-frame basis. To do this, call the `update()` method from within your render loop.


Usage
=====
You can use this camera as a drop-in replacement for a normal THREE.PerspectiveCamera;
`var camera = new THREE.TargetCamera( fov, aspect, near, far );`

After creating the camera, add a target for the camera to track:
```javascript
    // For the sake of this example, here's an object to track
    var box = new THREE.Mesh(
        new THREE.CubeGeometry( 10, 10, 10 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );

    // Add the box as a camera target with the name of "myTarget".
    // The `cameraPosition` argument is an offset vector relative 
    // to the target object.
    camera.addTarget({
        name: 'myTarget',
        targetObject: box,
        cameraPosition: new THREE.Vector3(0, 30, 50),
        fixed: false,
        stiffness: 0.1,
        matchRotation: true
    });

    // Now tell this camera to track the target we just created.
    camera.setTarget( 'myTarget' );

    // ...

    // In your render loop:
    camera.update();
```

Options
=======
**`name`**: *String.* A unique identifier for the target.

**`targetObject`**: *THREE.Object3D.* Any instance of a `THREE.Object3D`.

**`cameraPosition`**: *THREE.Vector3.* The camera position. When the camera isn't fixed, this property is relative to the target object. When fixed, it's just a normal position vector.

**`cameraRotation`**: *THREE.Quaternion | THREE.Euler | undefined.* An optional parameter to describe the rotation of the camera. This rotation is added to the camera *before* any other movement. 

**`fixed`**: *Boolean.* Whether this camera is fixed, or whether it should "chase" the target.

**`stiffness`**: *Number, > 0 and <= 1.* How much should the camera "stick" to the target's position and rotation. A lower number gives more fluid movement.

**`matchRotation`**: *Boolean.* Whether to match the rotation of the target object when the camera is not fixed. 


Building
========
This project uses [Grunt](http://gruntjs.com/) to create the minimized build. If you make changes and want to build it, follow these steps:

If you don't have grunt installed, first make sure you've got [NodeJS](http://nodejs.org/) and NPM installed, then install Grunt CLI. You might have to do this as root:

`npm install -g grunt-cli`

Now you can install the local grunt package

`cd projectFolder`

`npm install`

`grunt`


The output of grunt will sit in the `build` folder.
