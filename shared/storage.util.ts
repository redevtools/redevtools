

interface RDTState<T> {
    local: T
    session: T
}

export class RDTStorage {

    constructor(private name: string, private version = 1) {
    }

    withStorage<T, X = void | T>(action: (s: RDTState<T>) => X): X {
        let ls = JSON.parse(localStorage.getItem(this.name) ?? JSON.stringify({version: this.version}))
        let ss = JSON.parse(sessionStorage.getItem(this.name) ?? "{}")
        let s = {local: ls, session: ss}
        let result = action(s)
        localStorage.setItem(this.name, JSON.stringify(s.local))
        sessionStorage.setItem(this.name, JSON.stringify(s.session))
        return result
    }

}
