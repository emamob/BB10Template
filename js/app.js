/*jslint devel: true, browser: true, white: true, nomen: true */

/* ===========================================================================
 * app.js
 *
 * Jim Ing (@jim_ing)
 * ===========================================================================
 *
 * Copyright 2012-2013 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

        // Initialize API
        // api.init();

        // Access properties and initialize events in WebWorks
        if (window.blackberry && blackberry.app) {
            this.name = blackberry.app.name;
            this.version = blackberry.app.version;

            document.getElementById('heading').innerHTML = this.name + ' ' + this.version;

            // Add bezel swipe down event
            if (blackberry.app && blackberry.app.event && blackberry.app.event.onSwipeDown) {
                blackberry.app.event.onSwipeDown(app.toggle); // PlayBook
            }
            blackberry.event.addEventListener("swipedown", app.toggle); // BB10
        }

        // Add click listeners
        var appMenu = document.getElementById('appMenu'),
            actionMore = document.getElementById('actionMore'),
            actionMenu = document.getElementById('actionMenu'),
            actionSidebar = document.getElementById('actionSidebar'),
            actionButtons = document.getElementById('actionButtons'),
            sidebarMenu = document.getElementById('sidebarMenu');

        // Add event delegation for all Application Menu items
        appMenu.addEventListener('click', function (ev) {
            console.log(ev.target.dataset.id, ev.target.innerText);
            app.update(ev.target.innerText);
            this.style.display = 'none';
        }, false);

        // Add button toggle for Sidebar Menu
        actionSidebar.addEventListener('click', function (ev) {
            ev.stopPropagation();
            document.getElementById('sidebarMenu').style.display = 'block';
            // Push content to the right
            if (window.orientation === 0) {
                document.getElementById('main').style.left = '75%';
            }
            else {
                document.getElementById('main').style.left = '45%';
            }
        }, false);

        // Add event delegation for all Sidebar Menu items
        sidebarMenu.addEventListener('click', function (ev) {
            //console.log(ev, ev.target.dataset.id, ev.target.innerText, sidebarMenu.children[0].children);
            app.update(ev.target.innerText);

            // Get list of tab IDs and hide all tabs
            var listId, tabElem;
            for (var i = 0, ii = sidebarMenu.children[0].children.length; i < ii; i++) {
                listItemId = sidebarMenu.children[0].children[i].dataset.id;
                //console.log(listItemId, document.getElementById(listItemId));
                if (document.getElementById(listItemId)) {
                    document.getElementById(listItemId).style.display = 'none';
                }
            }

            // Show selected tab
            document.getElementById(ev.target.dataset.id).style.display = 'block';

            // Hide Sidebar Menu
            this.style.display = 'none';
            document.getElementById('main').style.left = '0';
        }, false);

        // Add event delegation for all Action buttons
        actionButtons.addEventListener('click', function (ev) {
            ev.stopPropagation();
            console.log(ev.target.dataset.id, ev.target.innerText);
            app.update(ev.target.innerText);
        }, false);

        // Add button toggle for Action Menu
        actionMore.addEventListener('click', function (ev) {
            ev.stopPropagation();
            document.getElementById('actionMenu').style.display = 'block';
        }, false);

        // Add event delegation for all Action Menu items
        actionMenu.addEventListener('click', function (ev) {
            console.log(ev.target.dataset.id, ev.target.innerText);
            app.update(ev.target.innerText);

            this.style.display = 'none';
        }, false);

        // Close menu if user clicks outside of menu
        document.body.addEventListener('click', function (ev) {
            ev.stopPropagation();
            if (document.getElementById('actionMenu').style.display == 'block') {
                document.getElementById('actionMenu').style.display = 'none';
            }
            if (document.getElementById('sidebarMenu').style.display == 'block') {
                document.getElementById('sidebarMenu').style.display = 'none';
                document.getElementById('main').style.left = '0';
            }
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
    //console.log(appMenu);
    if (appMenu.style.display == 'block') {
        appMenu.style.display = 'none';
    }
    else {
        appMenu.style.display = 'block';
    }
};

/**
 *
 */
app.update = function (text) {
    var heading = document.getElementById('heading');

    heading.innerHTML = 'You clicked <span style="color: #C21E38">' + text + '</span>';
};
