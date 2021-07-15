export class LocalStorage<TType> {
    constructor(private storageKey: string) {}

    /**
     * Returns the of the value `TType` if it exists or null
     */
    get(): TType {
        const cached = window.localStorage.getItem(this.storageKey);
        if (!cached) {
            return null;
        }

        try {
            return JSON.parse(cached) as TType;
        } catch (err) {
            // make sure we clear the invalid item so that the next time we try we won't get the same issue
            window.localStorage.removeItem(this.storageKey);
            throw err;
        }
    }

    set(value: TType) {
        if (value) {
          window.localStorage.setItem(this.storageKey, JSON.stringify(value));
        }
    }

    clear() {
        if (this.get()) {
          window.localStorage.removeItem(this.storageKey);
        }
    }
}