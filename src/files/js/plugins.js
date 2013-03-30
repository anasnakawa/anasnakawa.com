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
// ------------------------------

(function( $ ) {

    // es5 strict mode
    'use strict';

    // private helper functions
    // -------------------------
    var _leadingZero = function( num ) {
        return num < 10 ? ( '0' + num ) : num;
    };

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

    $.fn.formatDate = function() {
        return this.each(function() {
            var $self = $( this )
            , months = [
                  'Jan' // 1
                , 'Feb' // 2
                , 'Mar' // 3
                , 'Apr' // 4
                , 'May' // 5
                , 'Jun' // 6
                , 'Jul' // 7
                , 'Aug' // 8
                , 'Sep' // 9
                , 'Oct' // 10
                , 'Nov' // 11
                , 'Dec' // 12
            ]
            , date = new Date( $self.attr('data-date') )
            , month = date.getMonth()
            , day = date.getDate()
            , year = date.getFullYear();

            // display formatted date
            $self.text(function() {
                return '{day}-{month}-{year}'.replace( /{day}/,   _leadingZero( day ) )
                                             .replace( /{month}/, months[ month ] )
                                             .replace( /{year}/, year );
            });
        });
    }

})( jQuery );