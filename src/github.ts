import * as github from '@actions/github';
import * as Webhooks from '@octokit/webhooks';

type EventName = Parameters<
  ReturnType<typeof Webhooks.createEventHandler>['on']
>[0];
type ExpectEventName = Extract<EventName, 'push' | 'pull_request'>;

type Payload =
  | Webhooks.EventPayloads.WebhookPayloadPush
  | Webhooks.EventPayloads.WebhookPayloadPullRequest;

/**
 * Support events:
 * - pull_request
 * - on
 */
const parseGitHubPayload = (info: {
  payload: Payload;
  eventName: ExpectEventName;
}) => {
  switch (info.eventName) {
    case 'push': {
      const payload = info.payload as Webhooks.EventPayloads.WebhookPayloadPush;
      const commitMessage = payload.commits[0].message;

      return {
        commitMessage,
      };
    }

    case 'pull_request': {
      const payload = info.payload as Webhooks.EventPayloads.WebhookPayloadPullRequest;

      const prTitle = payload.pull_request.title;

      return {
        prTitle,
      };
      break;
    }

    default:
      break;
  }
};

export class Github {
  eventName: EventName;
  payload: Payload;
  constructor(private context: typeof github.context) {
    this.eventName = this.context.eventName as EventName;
    this.payload = this.context.payload as Payload;
  }

  getPRTitle() {
    switch (this.eventName) {
      case 'push':
      case 'pull_request': {
        const payload = parseGitHubPayload({
          payload: this.payload,
          eventName: this.eventName,
        });
        console.log(this.payload);

        return payload;
      }

      default:
        throw new Error('This event is not support');
    }
  }
}
