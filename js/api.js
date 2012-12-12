/*jslint devel: true, browser: true, white: true, nomen: true */

/* ===========================================================================
 * api.js
 *
 * @description
 *
 *
 * @author Jim Ing (jing@rim.com)
 * ===========================================================================
 *
 * Copyright 2011-2012 Research In Motion Limited.
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
 * @description
 *
 */
var api = (function () {
    "use strict";

    var internal = function () {
            console.info("internal");
        },

        core = {
            name: "APIName",
            description: "Sample API",
            version: "1.0",

            debug: false,

            /**
             *
             */
            external: function (params) {
                console.info("external");
            },

            /**
             * Initialize
             */
            init: function (params) {
                console.info("Initializing " + this.name + " (" + this.description + ") " + this.version);

                internal();

                this.external();
            }
        };

    return core;
}());
