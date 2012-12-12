/*jslint devel: true, browser: true, white: true, nomen: true */

/* ===========================================================================
 * app.js
 *
 * @description
 *
 *
 * @author Jim Ing (jing@rim.com)
 * ===========================================================================
 */

/**
 *
 */
var app = {
    name: 'BB10 Template',
    version: '1.0',

    debug: false,
    lang: null
};

/**
 *
 */
app.init = function (lang) {
    console.info('app.init:');

    try {
        // Set default properties
        this.lang = lang || 'en';

        api.init();

        if (window.blackberry && blackberry.app) {
            this.name = blackberry.app.name;
            this.version = blackberry.app.version;

            document.getElementById('heading').innerHTML = this.name + ' ' + this.version;

            // Add bezel swipe down event
            if (blackberry.app && blackberry.app.event && blackberry.app.event.onSwipeDown) {
                blackberry.app.event.onSwipeDown(app.toggle);
            }

            blackberry.event.addEventListener("swipedown", app.toggle);
        }

        // Add click listeners
        var appMenu = document.getElementById('appMenu'),
            actionMore = document.getElementById('actionMore'),
            actionMenu = document.getElementById('actionMenu'),
            actionSidebar = document.getElementById('actionSidebar'),
            sidebarMenu = document.getElementById('sidebarMenu');

        appMenu.addEventListener('click', function () {
            this.style.display = 'none';
        }, false);

        actionMore.addEventListener('click', function () {
            document.getElementById('actionMenu').style.display = 'block';
        }, false);

        actionMenu.addEventListener('click', function () {
            this.style.display = 'none';
        }, false);

        actionSidebar.addEventListener('click', function () {
            document.getElementById('sidebarMenu').style.display = 'block';
            document.getElementById('main').style.left = '75%';
        }, false);

        sidebarMenu.addEventListener('click', function () {
            document.getElementById('sidebarMenu').style.display = 'none';
            document.getElementById('main').style.left = '0';
        }, false);
    }
    catch (ex) {
        console.error(ex); // ex.description
    }
};

/**
 *
 */
app.toggle = function () {
    var appMenu = document.getElementById('appMenu');
    console.log(appMenu);
    if (appMenu.style.display == 'block') {
        appMenu.style.display = 'none';
    }
    else {
        appMenu.style.display = 'block';
    }
};

app.update = function (text) {
    var heading = document.getElementById('heading');

    heading.innerHTML = 'You clicked <span style="color: red">' + text + '</span>';
};
