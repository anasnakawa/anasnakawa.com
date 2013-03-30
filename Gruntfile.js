module.exports = function(grunt) {

  // local variables
  var srcDir = 'src/files/'
    , cssDir = srcDir + 'css/'
    , jsDir = srcDir + 'js/'
    , componentsDir = srcDir + 'components/'
    , cssDist = cssDir + 'dist/'
    , jsDist = jsDir + 'dist/'
    , jsConcatFiles = { files: {} }
    , cssUglifyFiles = { files: {} }
    , jsUglifyFiles = { files: {} };
    
  // css uglifying
  cssUglifyFiles.files[ cssDist + 'bootstrap-custom.min.css' ] = [ cssDir + 'bootstrap-custom.css' ];
  cssUglifyFiles.files[ cssDist + 'bootstrap-responsive-custom.min.css' ] = [ cssDir + 'bootstrap-responsive-custom.css' ];
  cssUglifyFiles.files[ cssDist + 'main-ltr.min.css' ] = [ cssDir + 'main-ltr.css' ];
  
  // js concatination
  jsConcatFiles.files[ jsDist + 'site.js' ] = function() {
    var temp = [];
    
    temp.push( jsDir + 'vendor/modernizr.js' );
    temp.push( componentsDir + 'jquery/jquery.js' );
    temp.push( componentsDir + 'jquery-backstretch/jquery.backstretch.js' );
    temp.push( componentsDir + 'bootstrap-sass/js/bootstrap-tooltip.js' );
    temp.push( jsDir + '/plugins.js' );
    temp.push( jsDir + '/main.js' );
    
    return temp;
  }();
  
  jsUglifyFiles.files[ jsDist + 'site.min.js' ] = [ jsDist + 'site.js' ];
  
  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')
    , concat: {
      js: jsConcatFiles
    }
    , uglify: {
        options: {
          banner: '/*!\n'
              + ' * ================================= \n'
              + ' * <%= pkg.name %> <%= pkg.version %>\n'
              + ' * ================================= \n'
              + ' * Copyright ' + new Date().getFullYear() + ' Anas Nakawa \n'
              + ' * Released under the MIT License\n'
              + ' * ================================= \n'
              + ' * souce code can be found on https://github.com/anasnakawa/anasnakawa.com \n'
              + ' * ================================= \n'
              + ' */\n\n'
      }
      //, css: cssUglifyFiles
      , js: jsUglifyFiles
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};