/*!
 * ------------------------------
 * anasnakawa.com site's main js
 * http://anasnakawa.com
 * license: MIT license (http://opensource.org/licenses/MIT)
 * ------------------------------
 */

// ------------------------------
// table of content
// ------------------------------
// stretching background
// bootstrap tooltip
// equal height columns
// format dates
// ------------------------------

(function( $ ) {
  
  // es5 strict mode
  'use strict';
  
  // bootstrap tooltip
  // -----------------
  $('.js-tooltip').tooltip();
  
  // equal height columns
  // --------------------
  $(window).load(function() {

  	var $article = $('#appArticle')
  	, $sidebar = $('#appSidebar')
  	, articleHeight = $article.height()
  	, sidebarHeight = $sidebar.height();

  	if( articleHeight < sidebarHeight ) {
  		$article.height( sidebarHeight + 10 );
  	}

  });

  // format dates
  // ------------
  $('.js-format-date').formatDate();
  
  // github repos
  $('.repos [data-repo]').github();
  
})( jQuery );