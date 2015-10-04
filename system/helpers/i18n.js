"use strict";

var self = {

    setLanguage: function(language, cb) {

        if (global.config.application.langs.inArray(language)) {

            global.lang = require('../../languages/' + language);
           global.lang.current = language;

            var Messages = require('../../languages/' + language);
            return cb(null, Messages);

        } else {
            global.lang = require('../../languages/' + global.config.site.language);
            global.lang.current = global.config.site.language;


           // global.lang.current = global.config.language;
            global.lang.current = global.config.site.language;
            var Messages = require('../../languages/' + global.config.site.language);
            return cb(null, Messages);

        }
    }
};

module.exports = self;