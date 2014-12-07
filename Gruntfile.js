module.exports = function(grunt) {
    // General
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // CSS
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'clean': {
            'build-and-release': ['build', 'release'],
            'build': ['build']
        },
        'less': {
            'compile': {
                'options': {
                    'banner': "/* <%= pkg.description %> - <%= pkg.version %> */"
                },
                'files': {
                    'release/<%= pkg.name %>.css': 'src/**/*.less'
                }
            }
        },
        'cssmin': {
            'combine': {
                'options': {
                    'banner': "/* <%= pkg.description %> - <%= pkg.version %> */",
                },
                'files': {
                    'release/<%= pkg.name %>.min.css': [
                        'release/<%= pkg.name %>.css'
                    ]
                }
            }
        },
        'watch': {
            'styles': {
                'files': [
                    'src/**/*.css',
                    'src/**/*.less',
                ],
                'tasks': ['css']
            },
        }
    });

    grunt.registerTask('css', ['less', 'cssmin', 'clean:build']);
    grunt.registerTask('default', ['clean', 'css', 'clean:build']);
};
