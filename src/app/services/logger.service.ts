import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    constructor() {}

    debug(message: string, properties?: any): void {
        console.debug(message, properties);
    }

    info(message: string, properties?: any): void {
      console.log(message, properties);
    }

    warn(message: string, properties?: any): void {
      console.warn(message, properties);
    }

    error(message: string, err: Error, properties?: any) {
        console.error(message, err, properties);
    }

    event(event: string, properties?: any) {
      console.log("EVENT: " + event, properties);
    }
}
