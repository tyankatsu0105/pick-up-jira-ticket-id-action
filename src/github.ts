import * as github from '@actions/github';
import * as Webhooks from '@octokit/webhooks';

type EventName = Parameters<
  ReturnType<typeof Webhooks.createEventHandler>['on']
>[0];

type UnknownObject = Record<string, unknown>;

type Payload =
  | Webhooks.EventPayloads.WebhookPayloadPush
  | Webhooks.EventPayloads.WebhookPayloadPullRequest;

/**
 * Support events:
 * - pull_request
 * - on
 */
const parseGitHubPayload = (payload: Payload) => {
  return payload;
};

export class Github {
  eventName: EventName;
  payload: UnknownObject;
  constructor(private context: typeof github.context) {
    this.eventName = this.context.eventName as EventName;
    this.payload = this.context.payload;
  }

  getPRTitle() {
    switch (this.eventName) {
      case 'push':
      case 'pull_request': {
        const payload = parseGitHubPayload(this.payload as Payload);
        return payload;
      }

      default:
        throw new Error('This event is not support');
    }
  }
}
