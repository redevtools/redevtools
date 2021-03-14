import * as  chokidar from "chokidar";
import {Project} from "ts-morph"
import * as events from "events";

type ParameterInfo = { name: string, type: string, text: string }
type ImportInfo = { names: string[], path: string }
type MethodInfo = { name: string, returnType: string, decorators: { name: string, parameters: string[] }[], parameters: ParameterInfo[] }

export interface ClassInfo {
    name: string
    path: string
    imports: ImportInfo[]
    methods: MethodInfo[]
    constructorParameters: ParameterInfo[]
}

/**
 * Listen for typescript file changes and returns info about the classes inside that file.
 */
export class FileChangeClassInfoListener {
    private project: Project;

    private emitter = new events.EventEmitter();

    constructor(options = {sourcesPath: "**/*.ts", watchPath: '**/*.api.ts'}) {
        const project = new Project({});
        project.addSourceFilesAtPaths(options.sourcesPath);
        const watcher = chokidar.watch(options.watchPath, {
            ignored: ["node_modules"], // ignore dotfiles
            persistent: true
        });

        function fileDeleted(path) {
        }

        watcher
            .on('add', path => this.fileChanged(path))
            .on('change', path => this.fileChanged(path))
            .on('unlink', path => fileDeleted(path));

        this.project = project
    }

    private fileChanged(path: string) {

        let sf = this.project.getSourceFileOrThrow(path)

        const classes = sf.getClasses()

        let classesInfo: ClassInfo[] = []


        let imports: ImportInfo[] = sf.getImportDeclarations().map(i => {
            return {names: i.getNamedImports().map(id => id.getName()), path: i.getModuleSpecifierValue()}
        })

        for (let c of classes) {
            const className = c.getName() ?? ''
            const constructorParams = c.getConstructors().length > 0 ? c.getConstructors()[0].getParameters() : []
            const constructorParameters = constructorParams.map(p => ({
                text: p.getText(),
                name: p.getName(),
                type: p.getType().getText(p)
            }))

            const classInfo: ClassInfo = {name: className, path, methods: [], imports, constructorParameters}
            const methods = c.getMethods()
            for (let m of methods) {
                const methodName = m.getName()
                const method: MethodInfo = {
                    name: methodName,
                    decorators: [],
                    parameters: [],
                    returnType: m.getReturnType().getText(m)
                }
                classInfo.methods.push(method)
                for (let d of m.getDecorators()) {
                    let decoratorName = d.getName()
                    method.decorators.push({
                        name: decoratorName,
                        parameters: d.getCallExpression() ? d.getCallExpression()!.getArguments().map(p => p.getFullText()) : []
                    })
                }
                for (let p of m.getParameters()) {
                    method.parameters.push({
                        text: p.getText(),
                        name: p.getName(),
                        type: p.getType().getText(p)
                    })
                }
            }
            classesInfo.push(classInfo)
        }
        this.emitter.emit("class-change", {classes: classesInfo})
    }

    onClassChangeEvent(listener: (e: { classes: ClassInfo[] }) => void) {
        this.emitter.on("class-change", listener)
    }

}
