declare type JSONPrimitive = string | number | boolean | null;
declare type JSONValue = JSONPrimitive | Json | JSONArray;
declare type Json = {
    [member: string]: JSONValue | any;
};
declare type JSONArray = JSONValue[];
declare global {
    interface Window {
        re: (ReDevTools & Json);
    }
}
interface RDTState {
    local: {};
    session: {};
}
declare class RDTStorage {
    private name;
    private version;
    constructor(name: string, version?: number);
    withStorage<T>(action: (s: RDTState) => T): T;
    get storage(): RDTState;
}
declare class ReDevTools {
    state: RDTStorage;
    private profile;
    constructor();
    init(): Promise<void>;
}
export declare const redevtools: {
    init: () => void;
};
/**
 *
 * @param hookName The name of your plugin hook
 * @constructor
 */
export declare function Re(hookName: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export {};
