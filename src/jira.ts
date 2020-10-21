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

  async getIssueInfo(): ReturnType<JiraClient['findIssue']> {
    const issue = await this.jira.findIssue('PUJTIA-3');
    return issue;
  }
}
