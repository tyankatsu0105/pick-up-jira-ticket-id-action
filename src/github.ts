import * as github from '@actions/github';
import * as Webhooks from '@octokit/webhooks';

type EventName = Parameters<
  ReturnType<typeof Webhooks.createEventHandler>['on']
>[0];

type UnknownObject = Record<string, unknown>;

export class Github {
  eventName: EventName;
  payload: UnknownObject;
  constructor(private context: typeof github.context) {
    this.eventName = this.context.eventName as EventName;
    this.payload = this.context.payload;
  }

  getPRTitle() {
    if (this.eventName !== 'pull_request' && this.eventName !== 'push')
      throw new Error('This event is not support');

    const pushPayload = this
      .payload as Webhooks.EventPayloads.WebhookPayloadPush;
    return pushPayload;
  }
}
