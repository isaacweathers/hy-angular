/*global module:false*/
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    clean:{
      bin:{
        files:[{
          dot:true,
          src:[
            'bin/',
            '.temp/'
          ]
        }]
      }
    },
    ngmin:{
      bin:{
        files:[{
          expand: false,
          src:'.temp/<%= pkg.name %>.js',
          dest:'bin/<%= pkg.name %>.js'
        }]
      }
    },
    // banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    //   '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    //   '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    //   '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    //   ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        // banner: '<%= banner %>',
        // stripBanners: true
      },
      dist: {
        src: ['src/hyUI/hySplitPanel/*.js'],
        dest: '.temp/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        // banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'bin/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    bower:{
      install:{

      }
    },
    karma:{
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', ['bower:install']);

  grunt.registerTask('test', ['bower:install', 'karma:unit']);

  grunt.registerTask('build', ['clean',
    'bower:install',
    'concat',
    'ngmin',
    'uglify']);

};
