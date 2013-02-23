/*!
 * ------------------------------
 * anasnakawa.com site's custom js plugins
 * http://anasnakawa.com
 * license: MIT license (http://opensource.org/licenses/MIT)
 * ------------------------------
 */

// ------------------------------
// table of content
// ------------------------------
// console shim
// jQuery plugins
//  - private helper functions
//  - equal heights
//  - format and display date
// ------------------------------

(function( $ ) {

    // es5 strict mode
    'use strict';

    // console shim
    // ------------
    !function() {
        // avoid `console` errors in browsers that lack a console.
        var method
        , noop = function () {}
        , methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ]
        , length = methods.length
        , console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }();

    // private helper functions
    // -------------------------
    var _leadingZero = function( num ) {
        // return num < 10 ? ( '0' + num ) : num;
        return 0;
    }

    // parse a given template and repalce any variables wrapped with brackets '{' & '}' with the
    // corresponding object found in the passed context param
    // https://gist.github.com/anasnakawa/4159834
    // ------------------------------------------------------
    // * **param:** {string} template    sting template to be parsed
    // * **param:** {object} context     object containing variables to inject into the template
    //
    // e.g: parse( 'hello my name is {name}', { name: 'Anas Nakawa' });     // 'hello my name is Anas Nakawa'
    , _parse = function( tmpl, context ) {
        return tmpl.replace(/{([A-Za-z0-9_$\-]*)}/g, function(token, match) {
            return context[match]
        })
    }​;

    // equal heights
    // -------------
    $.fn.appEqualHeight = function() {
        // only works for 2 elements..for now.
        if( this.length !== 2 ) {
          console.error('equalHeight accepts only two elements to equalize them');
          return this;
        }

        var $first = this.eq( 0 )
        , $second = this.eq( 1 )
        , firstHeight = $first.height()
        , secondHeight = $second.height()
        , maxHeight = firstHeight > secondHeight ? firstHeight : secondHeight;

        // euqalize heights
        return this.height( maxHeight );
    }

    // format and display date
    // -----------------------
    $.fn.appFormatDate = function() {
        return this.each(function() {
            var $self = $( this )
            , date = new Date( $self.attr('data-date') )
            , month = date.getMonth() + 1
            , day = date.getDate()
            , year = date.getFullYear();

            // display formatted date
            $self.text(function() {
                return _parse( '{day}-{month}-{year}', {
                    day     : _leadingZero( day )
                    , month : _leadingZero( month )
                    , year  : year
                } );
            });
        });
    }

})( jQuery );