import * as core from '@actions/core';
import * as ActionGithub from '@actions/github';

import dotenv from 'dotenv';
dotenv.config();

import { Jira } from './jira';
import { Github } from './github';

const isProduction = process.env.NODE_ENV === 'production';

// ================================================
// env
// ================================================
const JIRA_CLIENT_PROTOCOL = core.getInput('JIRA_CLIENT_PROTOCOL');
const JIRA_CLIENT_HOST = core.getInput('JIRA_CLIENT_HOST');
const JIRA_CLIENT_USERNAME = core.getInput('JIRA_CLIENT_USERNAME');
const JIRA_CLIENT_PASSWORD = core.getInput('JIRA_CLIENT_PASSWORD');
const JIRA_CLIENT_API_VERSION = core.getInput('JIRA_CLIENT_API_VERSION');
const JIRA_CLIENT_STRICT_SSL =
  core.getInput('JIRA_CLIENT_STRICT_SSL') === 'true';

async function run(): Promise<void> {
  const jira = new Jira({
    protocol: JIRA_CLIENT_PROTOCOL,
    host: JIRA_CLIENT_HOST,
    username: JIRA_CLIENT_USERNAME,
    password: JIRA_CLIENT_PASSWORD,
    apiVersion: JIRA_CLIENT_API_VERSION,
    strictSSL: JIRA_CLIENT_STRICT_SSL,
  });

  const github = new Github(ActionGithub.context);

  try {
    const issue = await jira.getSubtasks('PUJTIA-3');
    const payload = github.getPRTitle();

    core.debug(JSON.stringify(issue, null, 2));
    core.debug(JSON.stringify(payload, null, 2));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
