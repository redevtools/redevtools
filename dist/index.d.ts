declare type JSONPrimitive = string | number | boolean | null;
declare type JSONValue = JSONPrimitive | Json | JSONArray;
declare type Json = {
    [member: string]: JSONValue | any;
};
declare type JSONArray = JSONValue[];
declare global {
    interface Window {
        re: (ReDevTools & Json & {
            hooks: ReDevToolsHookRegistry;
            registry: ReDevToolsMethodRegistry;
            methods: any;
        });
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
    registry: ReDevToolsMethodRegistry;
    hooks: ReDevToolsHookRegistry;
    constructor();
    init(): Promise<void>;
    get methods(): {
        [name: string]: {
            name: string;
            method: any;
            original: any;
            instance: any;
        };
    };
}
export declare const redevtools: {
    init: () => void;
};
declare class ReDevToolsMethodRegistry {
    methods: {
        [name: string]: {
            name: string;
            method: any;
            original: any;
            instance: any;
        };
    };
    has(name: string): boolean;
    setMethod(name: string, method: any, original: any, instance: any): void;
}
declare type HookData = {
    functionName: string;
    functionReference: Function;
    arguments: any[];
    callMethodWithCurrentArgs: <T>() => T;
    target: any;
    skipExecution: boolean;
    replaceReturned: boolean;
};
declare class ReDevToolsHookRegistry {
    hooks: {
        [name: string]: (hookData: HookData) => unknown;
    };
    has(name: string): boolean;
    register(name: string, hook: (hookData: HookData) => unknown): void;
    fireHookEvent(hookData: any): any;
}
/**
 *
 * The method gets registered and is available at re.methods.methodName(...)
 * Every time the method is called in the code, any registered hook is called.
 * To register a hook use re.hooks.register(yourHook) in your plugin code
 *
 */
export declare function Re(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export {};
