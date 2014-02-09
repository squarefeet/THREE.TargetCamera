module.exports = function( grunt ) {
    var packageJSON = grunt.file.readJSON('package.json');

    var licenseBanner = '/**\n' +
                        ' * ' + packageJSON.name + ' ' + packageJSON.version + '\n' +
                        ' * (c) 2013 Luke Moody (http://www.github.com/squarefeet)\n' +
                        ' *\n' +
                        ' * THREE.TargetCamera may be freely distributed under the MIT license\n' +
                        ' *  (See the LICENSE file at root of this repository.)\n' +
                        ' */\n';

    // Specify input files and output paths
    grunt.initConfig({
        uglify: {
            min: {
                options: {
                    mangle: true,
                    compress: {
                        dead_code: true,
                    },
                    banner: licenseBanner
                },
                files: [ {
                    'build/THREE.TargetCamera.min.js': 'src/THREE.TargetCamera.js'
                } ]
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    grunt.registerTask( 'default', ['uglify'] );
};