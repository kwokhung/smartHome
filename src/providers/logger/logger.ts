import { Injectable } from '@angular/core';

@Injectable()
export class LoggerProvider {

  logs: Array<string>;

  constructor() {
    this.logs = [];
  }

  addLog(log: string) {
    this.logs.concat(log);
  }

  getLogs() {
    return this.logs;
  }

}
