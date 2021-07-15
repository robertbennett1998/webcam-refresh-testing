export class CallError extends Error {
  constructor(public reason: string) {
    super(reason);
  }
}
