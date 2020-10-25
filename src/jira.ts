import JiraClient from 'jira-client';
import * as Libs from './libs';

export class Jira {
  jira: JiraClient;
  constructor(
    private options: Pick<
      JiraClient.JiraApiOptions,
      'protocol' | 'host' | 'username' | 'password' | 'apiVersion' | 'strictSSL'
    >
  ) {
    this.jira = new JiraClient({
      protocol: this.options.protocol,
      host: this.options.host,
      username: this.options.username,
      password: this.options.password,
      apiVersion: this.options.apiVersion,
      strictSSL: this.options.strictSSL,
    });
  }

  public async getIssue(issueNumber: string): Promise<JiraClient.JsonResponse> {
    const issue = await this.jira.findIssue(issueNumber);
    return issue;
  }

  public getJiraTicketId(jiraTicketKeys: string, title: string): string {
    const regexp = Libs.Regexp.jiraTicketId(jiraTicketKeys);

    const jiraTicketId = title.match(regexp)?.[0];
    if (jiraTicketId == null) return '';

    return jiraTicketId;
  }
}
