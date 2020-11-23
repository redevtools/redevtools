"use strict";
/**
 * Author: Buglink.com Team
 * URL: https://github.com/redevtools/redevtools/plugins/json2ts
 *
 * This script is adapted from https://github.com/GregorBiswanger/json2ts and removes the dependencies from external libraries
 *
 *
 */
;
(async (re) => {
    async function json2ts(json) {
        let ts = new Json2Ts().convert(json);
        console.log(ts);
        copy(ts);
        console.log("Code copied to clipboard!");
    }
    re.json2ts = json2ts;
    re.json2ts.version = "1.0";
})(window.re);
function isObject(x) {
    return Object.prototype.toString.call(x) === "[object Object]" && x !== null;
}
function isDate(x) {
    return x instanceof Date;
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function isString(s) {
    return typeof s === 'string' || s instanceof String;
}
function isBoolean(b) {
    return typeof b === "boolean";
}
class Json2Ts {
    convert(jsonContent) {
        if (Array.isArray(jsonContent)) {
            return this.convertObjectToTsInterfaces(jsonContent[0]);
        }
        return this.convertObjectToTsInterfaces(jsonContent);
    }
    convertObjectToTsInterfaces(jsonContent, objectName = "RootObject") {
        let optionalKeys = [];
        let objectResult = [];
        for (let key in jsonContent) {
            let value = jsonContent[key];
            if (isObject(value) && !Array.isArray(value)) {
                let childObjectName = this.toUpperFirstLetter(key);
                objectResult.push(this.convertObjectToTsInterfaces(value, childObjectName));
                jsonContent[key] = this.removeMajority(childObjectName) + ";";
            }
            else if (Array.isArray(value)) {
                let arrayTypes = this.detectMultiArrayTypes(value);
                if (this.isMultiArray(arrayTypes)) {
                    let multiArrayBrackets = this.getMultiArrayBrackets(value);
                    if (this.isAllEqual(arrayTypes)) {
                        jsonContent[key] = arrayTypes[0].replace("[]", multiArrayBrackets);
                    }
                    else {
                        jsonContent[key] = "any" + multiArrayBrackets + ";";
                    }
                }
                else if (value.length > 0 && isObject(value[0])) {
                    let childObjectName = this.toUpperFirstLetter(key);
                    objectResult.push(this.convertObjectToTsInterfaces(value[0], childObjectName));
                    jsonContent[key] = this.removeMajority(childObjectName) + "[];";
                }
                else {
                    jsonContent[key] = arrayTypes[0];
                }
            }
            else if (isDate(value)) {
                jsonContent[key] = "Date;";
            }
            else if (isString(value)) {
                jsonContent[key] = "string;";
            }
            else if (isBoolean(value)) {
                jsonContent[key] = "boolean;";
            }
            else if (isNumber(value)) {
                jsonContent[key] = "number;";
            }
            else {
                jsonContent[key] = "any;";
                optionalKeys.push(key);
            }
        }
        let result = this.formatCharsToTypeScript(jsonContent, objectName, optionalKeys);
        objectResult.push(result);
        return objectResult.join("\n\n");
    }
    detectMultiArrayTypes(value, valueType = []) {
        if (Array.isArray(value)) {
            if (value.length === 0) {
                valueType.push("any[];");
            }
            else if (Array.isArray(value[0])) {
                for (let index = 0, length = value.length; index < length; index++) {
                    let element = value[index];
                    let valueTypeResult = this.detectMultiArrayTypes(element, valueType);
                    valueType.concat(valueTypeResult);
                }
            }
            else if (this.isAllEqual(value.map(isString))) {
                valueType.push("string[];");
            }
            else if (this.isAllEqual(value.map(isNumber))) {
                valueType.push("number[];");
            }
            else if (this.isAllEqual(value.map(isBoolean))) {
                valueType.push("boolean[];");
            }
            else {
                valueType.push("any[];");
            }
        }
        return valueType;
    }
    isMultiArray(arrayTypes) {
        return arrayTypes.length > 1;
    }
    isAllEqual(array) {
        return [...new Set(array)].length == 1;
    }
    getMultiArrayBrackets(content) {
        let jsonString = JSON.stringify(content);
        let brackets = "";
        for (let index = 0, length = jsonString.length; index < length; index++) {
            let element = jsonString[index];
            if (element === "[") {
                brackets = brackets + "[]";
            }
            else {
                index = length;
            }
        }
        return brackets;
    }
    formatCharsToTypeScript(jsonContent, objectName, optionalKeys) {
        let result = JSON.stringify(jsonContent, null, "\t")
            .replace(new RegExp("\"", "g"), "")
            .replace(new RegExp(",", "g"), "");
        let allKeys = Object.keys(jsonContent);
        for (let index = 0, length = allKeys.length; index < length; index++) {
            let key = allKeys[index];
            if (optionalKeys.indexOf(key) >= 0) {
                result = result.replace(new RegExp(key + ":", "g"), this.toLowerFirstLetter(key) + "?:");
            }
            else {
                result = result.replace(new RegExp(key + ":", "g"), this.toLowerFirstLetter(key) + ":");
            }
        }
        objectName = this.removeMajority(objectName);
        return "export interface " + objectName + " " + result;
    }
    removeMajority(objectName) {
        if (objectName.toUpperCase().endsWith("IES")) {
            return objectName.substring(0, objectName.length - 3) + "y";
        }
        else if (objectName.toUpperCase().endsWith("S")) {
            return objectName.substring(0, objectName.length - 1);
        }
        return objectName;
    }
    toUpperFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    ;
    toLowerFirstLetter(text) {
        return text.charAt(0).toLowerCase() + text.slice(1);
    }
    ;
    isJson(stringContent) {
        try {
            JSON.parse(stringContent);
        }
        catch (e) {
            return false;
        }
        return true;
    }
}
