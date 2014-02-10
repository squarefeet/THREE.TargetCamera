function ObjectControls( opts ) {
    var options = {
        mousePos: null,
        targetObject: null,
        positionVelocityIncrement: 5,
        positionVelocityDecrement: 0.95,

        rotationDamping: 500,

        rollVelocityIncrement: 0.05,
        rollVelocityDecrement: 0.95,

        maxPositionVelocity: 200,
        maxRotationVelocity: 10,
        maxRollVelocity: 2
    };

    if( opts ) {
        for( var i in opts ) {
            options[i] = opts[i];
        }
    }


    var mousePos = options.mousePos,
        centerX = window.innerWidth/2,
        centerY = window.innerHeight/2,
        forward = false,
        back = false,
        left = false,
        right = false,
        rollLeft = false,
        rollRight = false,
        rollRotation = 0,
        yaw = 0,
        pitch = 0,
        rotationVector = new THREE.Vector3(),
        rotationVectorLerp = new THREE.Vector3(),
        rotationQuaternion = new THREE.Quaternion(),
        positionVector = new THREE.Vector3(),
        cameraQuaternion = new THREE.Quaternion();

    var updateRotation = function( dt ) {
        var inc = options.rollVelocityIncrement,
            dec = options.rollVelocityDecrement,
            max = options.maxRollVelocity;

        if( rollLeft ) {
            rollRotation += inc;
        }
        else if( rollRight ) {
            rollRotation -= inc;
        }
        else {
            rollRotation *= dec;
        }


        if( rollRotation > max ) {
            rollRotation = max;
        }
        else if( rollRotation < -max ) {
            rollRotation = -max;
        }

        rotationVector.y = -mousePos.x / options.rotationDamping;
        rotationVector.x = -mousePos.y / options.rotationDamping;
    };

    var updatePosition = function( dt ) {
        var inc = options.positionVelocityIncrement,
            dec = options.positionVelocityDecrement,
            max = options.maxPositionVelocity;

        if( forward ) {
            positionVector.z -= inc;
        }
        else if( back ) {
            positionVector.z += inc;
        }
        else {
            positionVector.z *= dec;
        }

        if( left ) {
            positionVector.x -= inc;
        }
        else if( right ) {
            positionVector.x += inc;
        }
        else {
            positionVector.x *= dec;
        }


        if( positionVector.z > max ) {
            positionVector.z = max;
        }
        else if( positionVector.z < -max ) {
            positionVector.z = -max;
        }

        if( positionVector.x > max ) {
            positionVector.x = max;
        }
        else if( positionVector.x < -max ) {
            positionVector.x = -max;
        }

        positionVector.y *= dec;
    };

    var updateCameras = function( dt ) {
        var velX = positionVector.x * dt,
            velY = positionVector.y * dt,
            velZ = positionVector.z * dt,
            roll = rollRotation * dt,
            obj = options.targetObject;

        rotationQuaternion.set(
            rotationVector.x * dt,
            rotationVector.y * dt,
            roll,
            1
        ).normalize();

        obj.quaternion.multiply( rotationQuaternion );

        obj.translateX( velX );
        obj.translateY( velY );
        obj.translateZ( velZ );
    };


    this.update = function( dt ) {
        updateRotation( dt );
        updatePosition( dt );
        updateCameras( dt );
    };



    this.set = function() {};

    this.setForward = function( state ) {
        forward = state;
    };
    this.setBackward = function( state ) {
        back = state;
    };
    this.setLeft = function( state ) {
        left = state;
    };
    this.setRight = function( state ) {
        right = state;
    };
    this.setRollLeft = function( state ) {
        rollLeft = state;
    };
    this.setRollRight = function( state ) {
        rollRight = state;
    };


    this.getCameraRotation = function() {
        return cameraQuaternion;
    };

    this.getVelocity = function() {
        return positionVector;
    };

    this.getForwardSpeedAsPercentage = function() {
        return positionVector.z / options.maxPositionVelocity;
    };

    this.getAbsoluteForwardSpeedAsPercentage = function() {
        return Math.abs(positionVector.z) / options.maxPositionVelocity;
    };
}