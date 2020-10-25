import * as core from '@actions/core';

import * as IsProduction from './is-production';

export class Log {
  constructor(private isProduction: typeof IsProduction.isProduction) {}

  debug(message: string): void {
    return this.isProduction ? core.debug(message) : console.log(message);
  }

  warning(message: string): void {
    return this.isProduction ? core.warning(message) : console.warn(message);
  }

  error(message: string): void {
    return this.isProduction ? core.error(message) : console.error(message);
  }
}
