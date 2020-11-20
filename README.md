# redevtools
Extends the browser devtools with custom plugins directly from your localhost:

Some examples:
- browse and edit requests from the console
- hook into methods and debug them easily
- transform JSON object to TypeScript interfaces
- Show in page Web Components and their status

Every plugin is available in the plugins directory of this repo

## Getting started

### Step 1
To install ReDevTools

```npm install redevtools```

This command install just the base tool without any plugin (just few KB). 

### Step 2
Then in your project:

```typescript
import {redevtools} from "redevtools";
redevtools.init()
```

The *init* method will download the [plugins/plugins.json](https://github.com/redevtools/redevtools/blob/main/plugins/plugins.json).

You can see every available plugin by typing `re.` into the console.

**ReDevTools is lazy**: When you call a plugin for the first time, only then the plugin gets downloaded.

## Hooks
Some plugins are hooks into your source code class methods.
To install a ReDevTools Hook add the following decorator:

```typescript
@Re("logMethod")
myMethod(args) {
...
}
```

Every hooked method can be called anytime in the console by using:

```re.functions.myMethod(args)```

The `this` inside the method is the same `this` of the class instance. 


