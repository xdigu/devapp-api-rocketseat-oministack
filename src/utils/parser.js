'use strict'

module.exports = {
    parseStringToArray: (arrayAsString, delimiter = ',') => {
        return arrayAsString
            .split(delimiter)
            .map(string => string.trim());
    }
}
