/**
 * Author: Buglink.com Team
 * URL: https://github.com/redevtools/redevtools/plugins/json2ts
 *
 * This script is adapted from https://github.com/GregorBiswanger/json2ts and removes the dependencies from external libraries
 *
 *
 */
declare var copy: any;
declare function isObject(x: any): boolean;
declare function isDate(x: any): boolean;
declare function isNumber(n: any): boolean;
declare function isString(s: any): boolean;
declare function isBoolean(b: any): boolean;
declare class Json2Ts {
    convert(jsonContent: any): string;
    private convertObjectToTsInterfaces;
    private detectMultiArrayTypes;
    private isMultiArray;
    private isAllEqual;
    private getMultiArrayBrackets;
    private formatCharsToTypeScript;
    private removeMajority;
    private toUpperFirstLetter;
    private toLowerFirstLetter;
    isJson(stringContent: any): boolean;
}
declare function copyToClipboard(text: any): boolean;
