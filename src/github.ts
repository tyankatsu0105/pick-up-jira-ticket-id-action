import * as github from '@actions/github';
import * as Webhooks from '@octokit/webhooks';

type EventName = Parameters<
  ReturnType<typeof Webhooks.createEventHandler>['on']
>[0];

/**
 * Support events:
 * - pull_request
 * - on
 */
type Payload =
  | Webhooks.EventPayloads.WebhookPayloadPush
  | Webhooks.EventPayloads.WebhookPayloadPullRequest;

export class Github {
  eventName: EventName;
  payload: Payload;
  constructor(private context: typeof github.context) {
    this.eventName = this.context.eventName as EventName;
    this.payload = this.context.payload as Payload;
  }

  public getEventName(): EventName {
    return this.eventName;
  }

  public getPRTitle(): string {
    if (this.eventName !== 'pull_request')
      throw new Error("event name must be 'pull_request'");

    const payload = this
      .payload as Webhooks.EventPayloads.WebhookPayloadPullRequest;

    const prTitle = payload.pull_request.title;

    return prTitle;
  }
}
