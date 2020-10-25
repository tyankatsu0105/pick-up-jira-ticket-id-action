# Pick up Jura ticket ID Action

[![deploy](https://img.shields.io/badge/deploy-🛳%20Ship.js-blue?style=flat)](https://github.com/algolia/shipjs)

Pick up Jira ticket ID from commit comment and combine as PR's comment
See example:
https://github.com/tyankatsu0105/pick-up-jira-ticket-id-action/pull/15#issuecomment-715921363

## Usage

```yml
name: Notification
on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize

jobs:
  notification:
    name: Notification
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: tyankatsu0105/pick-up-jira-ticket-id-action@v0.1.0
        id: jira-subtasks
        with:
          JIRA_CLIENT_PROTOCOL: ${{ secrets.JIRA_CLIENT_PROTOCOL }}
          JIRA_CLIENT_HOST: ${{ secrets.JIRA_CLIENT_HOST }}
          JIRA_CLIENT_USERNAME: ${{ secrets.JIRA_CLIENT_USERNAME }}
          JIRA_CLIENT_PASSWORD: ${{ secrets.JIRA_CLIENT_PASSWORD }}
          JIRA_CLIENT_API_VERSION: ${{ secrets.JIRA_CLIENT_API_VERSION }}
          JIRA_CLIENT_STRICT_SSL: ${{ secrets.JIRA_CLIENT_STRICT_SSL }}
          JIRA_TICKET_KEYS: PUJTIA

      - name: Create PR Comment
        uses: marocchino/sticky-pull-request-comment@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          header: jira-info
          message: |
            ${{ steps.jira-subtasks.outputs.message }}
```

## Development

### Commit

```bash
npm run commit
```

### Release

```bash
npm run release
```

1. Automecally generate PR with shipjs
1. If merged PR, push Git tag with GitHub Action(release.yml)
1. We can use `uses: tyankatsu0105/pick-up-jira-ticket-id-action@vx.y.z` 🎉

# LICENSE

MIT
