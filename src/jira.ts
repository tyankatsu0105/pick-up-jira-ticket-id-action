import JiraClient from 'jira-client';

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

  public async getSubtasks(
    issueNumber: string
  ): Promise<JiraClient.JsonResponse['fields']['subtasks']> {
    const issue = await this.jira.findIssue(issueNumber);
    const subtasks = issue.fields.subtasks;
    return subtasks;
  }

  public getJiraTicketId(jiraTicketKeys: string, title: string): string {
    const regexp = new RegExp(`${jiraTicketKeys}-[0-9]*`);

    const jiraTicketId = title.match(regexp)?.[0];
    if (jiraTicketId === undefined) return '';

    return jiraTicketId;
  }
}
