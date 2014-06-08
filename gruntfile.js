module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/css/app.css': 'public/libs/dz-assets/scss/sdk.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/css/app.css': 'public/libs/dz-assets/scss/sdk.scss'
        }
      }
    },

    cssmin: {
      dev: {
        files: {
          'public/css/app.min.css': [
            'public/css/app.css'
          ]
        }
      },
      dist: {
        files: {
          'public/css/app.min.css': [
            'public/css/style.css'
          ]
        }
      }
    },

    watch: {
      sass: {
        files: 'public/libs/dz-assets/scss/{,*/}*.{scss,sass}',
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