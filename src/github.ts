import * as github from '@actions/github';
import * as Webhooks from '@octokit/webhooks';

type EventName = Parameters<
  ReturnType<typeof Webhooks.createEventHandler>['on']
>[0];

export class Github {
  constructor(private context: typeof github.context) {}

  getPRTitle() {
    const eventName = this.context.eventName as EventName;
    if (eventName !== 'pull_request')
      throw new Error('This event is not support');

    const pushPayload = github.context
      .payload as Webhooks.EventPayloads.WebhookPayloadPullRequest;
    return pushPayload;
  }
}
