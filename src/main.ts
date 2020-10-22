import { Jira } from './jira';
import dotenv from 'dotenv';
dotenv.config();

// const isProduction = process.env.NODE_ENV === 'production';

import * as core from '@actions/core';
// import { wait } from './wait';

async function run(): Promise<void> {
  const JIRA_CLIENT_PROTOCOL = core.getInput('JIRA_CLIENT_PROTOCOL');
  const JIRA_CLIENT_HOST = core.getInput('JIRA_CLIENT_HOST');
  const JIRA_CLIENT_USERNAME = core.getInput('JIRA_CLIENT_USERNAME');
  const JIRA_CLIENT_PASSWORD = core.getInput('JIRA_CLIENT_PASSWORD');
  const JIRA_CLIENT_API_VERSION = core.getInput('JIRA_CLIENT_API_VERSION');
  const JIRA_CLIENT_STRICT_SSL = core.getInput('JIRA_CLIENT_STRICT_SSL');

  // const JIRA_CLIENT_PROTOCOL =
  //   (isProduction
  //     ? core.getInput('JIRA_CLIENT_PROTOCOL')
  //     : process.env.JIRA_CLIENT_PROTOCOL) || 'https';
  // const JIRA_CLIENT_HOST =
  //   (isProduction
  //     ? core.getInput('JIRA_CLIENT_HOST')
  //     : process.env.JIRA_CLIENT_HOST) || '';
  // const JIRA_CLIENT_USERNAME =
  //   (isProduction
  //     ? core.getInput('JIRA_CLIENT_USERNAME')
  //     : process.env.JIRA_CLIENT_USERNAME) || '';
  // const JIRA_CLIENT_PASSWORD =
  //   (isProduction
  //     ? core.getInput('JIRA_CLIENT_PASSWORD')
  //     : process.env.JIRA_CLIENT_PASSWORD) || '';
  // const JIRA_CLIENT_API_VERSION =
  //   (isProduction
  //     ? core.getInput('JIRA_CLIENT_API_VERSION')
  //     : process.env.JIRA_CLIENT_API_VERSION) || '2';
  // const JIRA_CLIENT_STRICT_SSL =
  //   ((isProduction
  //     ? core.getInput('JIRA_CLIENT_API_STRICT_SSL')
  //     : process.env.JIRA_CLIENT_API_STRICT_SSL) === '' &&
  //     true) ||
  //   ((isProduction
  //     ? core.getInput('JIRA_CLIENT_API_STRICT_SSL')
  //     : process.env.JIRA_CLIENT_API_STRICT_SSL) === 'true' &&
  //     true) ||
  //   ((isProduction
  //     ? core.getInput('JIRA_CLIENT_API_STRICT_SSL')
  //     : process.env.JIRA_CLIENT_API_STRICT_SSL) === 'false' &&
  //     false);

  const jira = new Jira({
    protocol: JIRA_CLIENT_PROTOCOL,
    host: JIRA_CLIENT_HOST,
    username: JIRA_CLIENT_USERNAME,
    password: JIRA_CLIENT_PASSWORD,
    apiVersion: JIRA_CLIENT_API_VERSION,
    strictSSL: JIRA_CLIENT_STRICT_SSL,
  });

  try {
    // const ms: string = core.getInput('milliseconds');
    // core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    // core.debug(new Date().toTimeString());
    // await wait(parseInt(ms, 10));
    // core.debug(new Date().toTimeString());

    // core.setOutput('time', new Date().toTimeString());

    const issue = await jira.getIssueInfo();
    core.debug(JSON.stringify(issue, null, 2));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
