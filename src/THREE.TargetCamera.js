/**
 * THREE.TargetCamera 0.1.0 
 * (c) 2013 Luke Moody (http://www.github.com/squarefeet)
 *
 * THREE.TargetCamera may be freely distributed under the MIT license 
 *  (See the LICENSE file at root of this repository.)
 */

THREE.TargetCamera = function( options ) {
    THREE.Camera.call( this );

    // The usual THREE.PerspectiveCamera settings.
    this.fov = options.fov !== undefined ? options.fov : 50;
    this.aspect = options.aspect !== undefined ? options.aspect : 1;
    this.near = options.near !== undefined ? options.near : 0.1;
    this.far = options.far !== undefined ? options.far : 2000;


    // This camera's target object. Must be instance of THREE.Object3D 
    // in one form or another.
    this.target = options.target;

    // Whether this camera will be in first-, or third-person mode.
    this.mode = options.mode !== undefined ? options.mode : 'third';

    // The stiffness of the movement of the camera. Must be
    // a value between 0 and 1.
    // Values closer to `0` will be smoother, values closer to `1` will be 
    // stiffer.
    // By default, the first-person mode will be stiff...
    this.firstPersonStiffness = options.firstPersonStiffness !== undefined ? 
        options.firstPersonStiffness : 1;

    // ...And also by default, the third-person mode will be smoothed.
    this.thirdPersonStiffness = options.thirdPersonStiffness !== undefined ? 
        options.thirdPersonStiffness : 0.1;

    // The stiffness of the transition between modes. Don't set it too low
    // or you might never transition fully, depending on how fast the target
    // is travelling.
    this.modeTransitionStiffness = options.modeTransitionStiffness !== undefined ?
        options.modeTransitionStiffness : 0.3;


    // Position of player's "eyes". Only used when this.type === 'first'.
    this.firstPersonPosition = options.firstPersonPosition !== undefined ? 
        options.firstPersonPosition : new THREE.Vector3();


    // Position of the chase camera. Only used when this.type === 'chase'.
    this.thirdPersonPosition = options.thirdPersonPosition !== undefined ? 
        options.thirdPersonPosition : new THREE.Vector3( 0, 50, 100 );


    // A helper Object3D. Used to help position the camera based on the 
    // two position settings above.
    this._idealObject = new THREE.Object3D();

    this._isTransitioning = false;

    this.updateProjectionMatrix();

    this.position.copy( 
        this.mode === 'first' ? this.firstPersonPosition : this.thirdPersonPosition 
    );
};

THREE.TargetCamera.prototype = Object.create( THREE.PerspectiveCamera.prototype );

THREE.TargetCamera.prototype._translateIdealObject = function( vec ) {
    var obj = this._idealObject;

    if( vec.x !== 0 ) {
        obj.translateX( vec.x );
    }

    if( vec.y !== 0 ) {
        obj.translateY( vec.y );
    }

    if( vec.z !== 0 ) {
        obj.translateZ( vec.z );
    }
};


THREE.TargetCamera.prototype.setMode = function( mode ) {
    if( mode === this.mode ) return;

    this.mode = mode;
    this._isTransitioning = true;
};



THREE.TargetCamera.prototype.update = function() {
    var target = this.target,
        mode = this.mode,
        ideal = this._idealObject,
        distance;

    if( !target ) return;

    ideal.position.copy( this.target.position );
    ideal.quaternion.copy( this.target.quaternion );

    if( mode === 'first' ) {
        this._translateIdealObject( this.firstPersonPosition );
    }
    else {
        this._translateIdealObject( this.thirdPersonPosition );
    }

    if( this._isTransitioning ) {
        this.position.lerp( ideal.position, this.modeTransitionStiffness );
        this.quaternion.slerp( ideal.quaternion, this.modeTransitionStiffness );

        if( this.position.distanceTo( ideal.position ) < 1 ) {
            this._isTransitioning = false;
        }
    }
    else if( mode === 'first' ) {
        this.position.lerp( ideal.position, this.firstPersonStiffness );
        this.quaternion.slerp( ideal.quaternion, this.firstPersonStiffness );
    }
    else { 
        this.position.lerp( ideal.position, this.thirdPersonStiffness );
        this.quaternion.slerp( ideal.quaternion, this.thirdPersonStiffness );  
    }
};