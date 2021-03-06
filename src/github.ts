import * as github from '@actions/github';
import type * as Webhooks from '@octokit/webhooks';
import fetch from 'node-fetch';

import type JiraClient from 'jira-client';

import * as Libs from './libs';

type EventName = Parameters<
  ReturnType<typeof Webhooks.createEventHandler>['on']
>[0];

/**
 * Support events:
 * - pull_request
 */
type Payload = Webhooks.EventPayloads.WebhookPayloadPullRequest;

type SubTaskMap = {
  [key: string]: SubTask;

  /**
   * Uncategorized subtasks
   */
  others: SubTask;
};

type SubTask = {
  isOthers: boolean;
  url: string;
  summary: JiraClient.JsonResponse['fields']['summary'];
  items: SubTaskItem[];
};

type SubTaskItem = {
  url: Webhooks.EventPayloads.WebhookPayloadStatusCommit['html_url'];
  message: Webhooks.EventPayloads.WebhookPayloadStatusCommit['commit']['message'];
};

export class Github {
  eventName: EventName;
  payload: Payload;
  constructor(private context: typeof github.context) {
    this.eventName = this.context.eventName as EventName;
    this.payload = this.context.payload as Payload;
  }

  public getPRTitle(): string {
    if (this.eventName !== 'pull_request')
      throw new Error("event name must be 'pull_request'");

    const payload = this
      .payload as Webhooks.EventPayloads.WebhookPayloadPullRequest;

    const prTitle = payload.pull_request.title;

    return prTitle;
  }

  public async getCommits(): Promise<
    Webhooks.EventPayloads.WebhookPayloadStatusCommit[]
  > {
    if (this.eventName !== 'pull_request')
      throw new Error("event name must be 'pull_request'");

    let result: Webhooks.EventPayloads.WebhookPayloadStatusCommit[] = [];

    const fetchCommits = async (pageNumber: number) => {
      const payload = this
        .payload as Webhooks.EventPayloads.WebhookPayloadPullRequest;

      const res = await fetch(
        `${payload.pull_request.commits_url}?page=${pageNumber.toString()}`
      );
      const json: Webhooks.EventPayloads.WebhookPayloadStatusCommit[] = await res.json();

      if (json.length === 0) return;

      result = [...result, ...json];

      await fetchCommits(pageNumber + 1);
    };

    await fetchCommits(1);

    return result;
  }

  public createMessage(
    info: {
      commits: Webhooks.EventPayloads.WebhookPayloadStatusCommit[];
      issue: JiraClient.JsonResponse;
      jiraTicketKeys: string;
      host: string;
      protocol: string;
    },
    options?: {
      commitMessageLength: number;
    }
  ): string {
    const regexp = Libs.Regexp.jiraTicketId(info.jiraTicketKeys);
    const jiraUrl = (jiraTicketId: string) =>
      `${info.protocol}://${info.host}/browse/${jiraTicketId}`;

    const subTaskMap = info.issue.fields.subtasks
      .sort((a, b) => a.key.localeCompare(b.key))
      .reduce<SubTaskMap>(
        (acc, current) => {
          acc[current.key] = {
            isOthers: false,
            summary: current.fields.summary,
            url: jiraUrl(current.key),
            items: [],
          };
          return acc;
        },
        {
          others: {
            isOthers: true,
            summary: 'others',
            url: '',
            items: [],
          },
        }
      );

    info.commits.forEach(commit => {
      const jiraTicketId = commit.commit.message.match(regexp)?.[0] || 'others';
      subTaskMap[jiraTicketId].items.push({
        url: commit.html_url,
        message: options?.commitMessageLength
          ? commit.commit.message
              .split('\n')[0]
              .slice(0, options?.commitMessageLength)
          : commit.commit.message.split('\n')[0],
      });
    });

    const messageSrc = {
      issue: `- [${info.issue.key} - ${info.issue.fields.summary}](${jiraUrl(
        info.issue.key
      )})`,
      subtasks(subTaskMap: SubTaskMap) {
        return Object.entries(subTaskMap)
          .filter(([, value]) => !value.isOthers)
          .map(([key, value]) => {
            const subtask = `  - [${key} - ${value.summary}](${value.url})`;
            const commits = value.items
              .map(item => `    - ${item.message} ${item.url}`)
              .join('\n');

            return `
${subtask}
${commits}`;
          })
          .join('\n');
      },

      others(subTaskMap: SubTaskMap) {
        return Object.values(subTaskMap)
          .filter(value => value.isOthers)
          .map(value => {
            const subtask = `  - ${value.summary}`;
            const commits = value.items
              .map(item => `    - ${item.message} ${item.url}`)
              .join('\n');

            return `
${subtask}
${commits}`;
          })
          .join('\n');
      },
    };

    const message = `
${messageSrc.issue}
${messageSrc.subtasks(subTaskMap)}
${messageSrc.others(subTaskMap)}
`;

    return message;
  }
}
