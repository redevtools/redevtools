# A simple Hello World Plugin
This is the 'hello world' plugin to show how simple it is to create plugins with **redevtools**

Just export a function (preferably using the same name as the plugin):

```typescript
/**
* Author: Buglink.com Team
* URL: https://github.com/redevtools/redevtools/plugins/hello 
*/
export async function hello(name:string){

    console.log("hello " + name)

}
```

Plugins are written in **TypeScript** or JavaScript.

Each plugin includes a README.md file that describes what the plugin does and a 
`snapshot.gif` file as a preview of the plugin in action. We suggest to use animated 
gif files to show the plugin in action.

##Publish a plugin

To publish a plugin make a pull request with the plugin files directly to this repository.

The plugin will be evaluated and possibly included in the official plugins.
