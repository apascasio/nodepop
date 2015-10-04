"use strict";


Array.prototype.inArray = function()
{
    for (var j in this) {
        if (this[j] == arguments[0]) {
            return true;
        }
    }

    return false;
}