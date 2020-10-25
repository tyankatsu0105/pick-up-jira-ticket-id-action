import 'jira-client';
import * as Types from '../types';

declare module 'jira-client' {
  export interface JsonResponse {
    expand: string;
    id: string;
    self: string;
    key: string;
    properties: Types.UnknownObject;
    fields: {
      statuscategorychangedate: string;
      issuetype: {
        self: string;
        id: string;
        description: string;
        iconUrl: string;
        name: string;
        subtask: boolean;
        avatarId: number;
        entityId: string;
      };
      parent: {
        id: string;
        key: string;
        self: string;
        fields: {
          summary: string;
          status: {
            self: string;
            description: string;
            iconUrl: string;
            name: string;
            id: string;
            statusCategory: {
              self: string;
              id: number;
              key: string;
              colorName: string;
              name: string;
            };
          };
          priority: {
            self: string;
            iconUrl: string;
            name: string;
            id: string;
          };
          issuetype: {
            self: string;
            id: string;
            description: string;
            iconUrl: string;
            name: string;
            subtask: boolean;
            avatarId: number;
            entityId: string;
          };
        };
      };
      timespent: any;
      project: {
        self: string;
        id: string;
        key: string;
        name: string;
        projectTypeKey: string;
        simplified: boolean;
        avatarUrls: {
          '48x48': string;
          '24x24': string;
          '16x16': string;
          '32x32': string;
        };
      };
      fixVersions: any[];
      aggregatetimespent: any;
      resolution: any;
      resolutiondate: any;
      workratio: number;
      lastViewed: string;
      issuerestriction: {
        issuerestrictions: Types.UnknownObject;
        shouldDisplay: boolean;
      };
      watches: {
        self: string;
        watchCount: number;
        isWatching: boolean;
      };
      created: string;
      customfield_10020: any;
      customfield_10021: any;
      customfield_10022: any;
      customfield_10023: any;
      priority: {
        self: string;
        iconUrl: string;
        name: string;
        id: string;
      };
      customfield_10024: any;
      customfield_10025: any;
      labels: any[];
      customfield_10016: any;
      customfield_10017: any;
      customfield_10018: {
        hasEpicLinkFieldDependency: boolean;
        showField: boolean;
        nonEditableReason: {
          reason: string;
          message: string;
        };
      };
      customfield_10019: string;
      timeestimate: any;
      aggregatetimeoriginalestimate: any;
      versions: any[];
      issuelinks: any[];
      assignee: any;
      updated: string;
      status: {
        self: string;
        description: string;
        iconUrl: string;
        name: string;
        id: string;
        statusCategory: {
          self: string;
          id: number;
          key: string;
          colorName: string;
          name: string;
        };
      };
      components: any[];
      timeoriginalestimate: any;
      description: any;
      customfield_10010: any;
      customfield_10014: any;
      customfield_10015: any;
      timetracking: Types.UnknownObject;
      customfield_10005: any;
      customfield_10006: any;
      customfield_10007: any;
      security: any;
      customfield_10008: any;
      customfield_10009: any;
      aggregatetimeestimate: any;
      attachment: any[];
      summary: string;
      creator: {
        self: string;
        accountId: string;
        emailAddress: string;
        avatarUrls: {
          '48x48': string;
          '24x24': string;
          '16x16': string;
          '32x32': string;
        };
        displayName: string;
        active: boolean;
        timeZone: string;
        accountType: string;
      };
      subtasks: {
        id: string;
        key: string;
        self: string;
        fields: {
          summary: string;
          status: {
            self: string;
            description: string;
            iconUrl: string;
            name: string;
            id: string;
            statusCategory: {
              self: string;
              id: number;
              key: string;
              colorName: string;
              name: string;
            };
          };
          priority: {
            self: string;
            iconUrl: string;
            name: string;
            id: string;
          };
          issuetype: {
            self: string;
            id: string;
            description: string;
            iconUrl: string;
            name: string;
            subtask: boolean;
            avatarId: number;
            entityId: string;
          };
        };
      }[];
      reporter: {
        self: string;
        accountId: string;
        emailAddress: string;
        avatarUrls: {
          '48x48': string;
          '24x24': string;
          '16x16': string;
          '32x32': string;
        };
        displayName: string;
        active: boolean;
        timeZone: string;
        accountType: string;
      };
      customfield_10000: string;
      aggregateprogress: {
        progress: number;
        total: number;
      };
      customfield_10001: any;
      customfield_10002: any;
      customfield_10003: any;
      customfield_10004: any;
      environment: any;
      duedate: any;
      progress: {
        progress: number;
        total: number;
      };
      comment: {
        comments: any[];
        maxResults: number;
        total: number;
        startAt: number;
      };
      votes: {
        self: string;
        votes: number;
        hasVoted: boolean;
      };
      worklog: {
        startAt: number;
        maxResults: number;
        total: number;
        worklogs: any[];
      };
    };
  }
}
