export const jiraTicketId = (jiraTicketKeys: string): RegExp =>
  new RegExp(`${jiraTicketKeys}-[0-9]*`);
