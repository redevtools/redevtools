export declare const redevtools: {
    init: () => void;
};
/**
 *
 * @param hookName The name of your plugin hook
 * @constructor
 */
export declare function Re(hookName: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
