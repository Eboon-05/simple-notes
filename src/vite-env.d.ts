/// <reference types="vite/client" />
declare module 'travelerjs' {
    export class Traveler {
        register(route: Route)
        listen()
        go(route: string)
    }

    export class Route {
        constructor(path: string, callback: (params: string) => void)
    }
}