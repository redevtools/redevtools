# redevtools
Extends the browser devtools with custom plugins directly from your localhost:

Some examples:
- transform JSON object to TypeScript interfaces
- convert a JWT token to plan JSON

Every plugin is available in the plugins directory of this repo

## Getting started

### Step 1
You don't have to install ReDevTools. Just type this code into your console

```javascript
import("//r8s.io")
```

That's all (6KB)

### Step 2 (optional)
If you want to have it ready into your project, save the line above somewhere:

```javascript
if(window.location.href.indexOf("localhost") >= 0)
    document.head.appendChild(document.createElement("script")).src = "//r8s.io"
```

