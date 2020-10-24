import * as core from '@actions/core';
import * as ActionGithub from '@actions/github';

import dotenv from 'dotenv';
dotenv.config();

import { Jira } from './jira';
import { Github } from './github';
import * as Libs from './libs';

// ================================================
// setups
// ================================================

const isProduction = Libs.isProduction;
const log = new Libs.Log(isProduction);

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

const JIRA_TICKET_KEYS = core.getInput('JIRA_TICKET_KEYS');

// ================================================
// run
// ================================================

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
  const eventName = github.getEventName();

  try {
    const prTitle = github.getPRTitle();
    const jiraTicketId = jira.getJiraTicketId(JIRA_TICKET_KEYS, prTitle);
    const subtasks = await jira.getSubtasks(jiraTicketId);

    log.debug(JSON.stringify(subtasks, null, 2));
    log.debug(JSON.stringify(ActionGithub.context, null, 2));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
