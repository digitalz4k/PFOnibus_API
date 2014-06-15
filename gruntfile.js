module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/css/app.css': 'app/libs/dz-assets/scss/sdk.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'app/css/app.css': 'app/libs/dz-assets/scss/sdk.scss'
        }
      }
    },

    cssmin: {
      dev: {
        files: {
          'app/css/app.min.css': [
            'app/css/app.css'
          ]
        }
      },
      dist: {
        files: {
          'app/css/app.min.css': [
            'app/css/style.css'
          ]
        }
      }
    },

    watch: {
      sass: {
        files: 'app/libs/dz-assets/scss/{,*/}*.{scss,sass}',
        tasks: ['sass:dev', 'cssmin:dev'],
        options: { livereload: true }
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', [
    'sass:dev',
    'cssmin:dev',
    'watch'
  ]);

  grunt.registerTask('build', [
    'sass:dist'
  ]);
}