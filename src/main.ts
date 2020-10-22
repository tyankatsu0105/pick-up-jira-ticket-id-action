import { Jira } from './jira';
import dotenv from 'dotenv';
dotenv.config();

import * as core from '@actions/core';
// import { wait } from './wait';

const isProduction = process.env.NODE_ENV === 'production';

async function run(): Promise<void> {
  // const JIRA_CLIENT_PROTOCOL = core.getInput('JIRA_CLIENT_PROTOCOL');
  // const JIRA_CLIENT_HOST = core.getInput('JIRA_CLIENT_HOST');
  // const JIRA_CLIENT_USERNAME = core.getInput('JIRA_CLIENT_USERNAME');
  // const JIRA_CLIENT_PASSWORD = core.getInput('JIRA_CLIENT_PASSWORD');
  // const JIRA_CLIENT_API_VERSION = core.getInput('JIRA_CLIENT_API_VERSION');
  // const JIRA_CLIENT_STRICT_SSL =
  //   core.getInput('JIRA_CLIENT_STRICT_SSL') === 'true';

  const JIRA_CLIENT_PROTOCOL =
    core.getInput('JIRA_CLIENT_PROTOCOL') || process.env.JIRA_CLIENT_PROTOCOL;
  const JIRA_CLIENT_HOST =
    core.getInput('JIRA_CLIENT_HOST') ||
    (process.env.JIRA_CLIENT_HOST as string);
  const JIRA_CLIENT_USERNAME =
    core.getInput('JIRA_CLIENT_USERNAME') || process.env.JIRA_CLIENT_USERNAME;
  const JIRA_CLIENT_PASSWORD =
    core.getInput('JIRA_CLIENT_PASSWORD') || process.env.JIRA_CLIENT_PASSWORD;
  const JIRA_CLIENT_API_VERSION =
    core.getInput('JIRA_CLIENT_API_VERSION') ||
    process.env.JIRA_CLIENT_API_VERSION;

  const JIRA_CLIENT_STRICT_SSL =
    core.getInput('JIRA_CLIENT_STRICT_SSL') === 'true' ||
    process.env.JIRA_CLIENT_STRICT_SSL === 'true';

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

    if (isProduction) {
      core.debug(JSON.stringify(issue, null, 2));
    } else {
      console.log(issue);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
