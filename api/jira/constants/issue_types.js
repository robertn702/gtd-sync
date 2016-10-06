// last updated 10/06/2016
module.exports = {
  TASK: {
    self: 'https://engagio.atlassian.net/rest/api/2/issuetype/10000',
    id: '10000',
    description: 'A task that needs to be done.',
    iconUrl: 'https://engagio.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10318&avatarType=issuetype',
    name: 'Task',
    subtask: false,
    avatarId: 10318
  },
  BUG: {
    self: 'https://engagio.atlassian.net/rest/api/2/issuetype/10400',
    id: '10400',
    description: 'jira.translation.issuetype.bug.name.desc',
    iconUrl: 'https://engagio.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10303&avatarType=issuetype',
    name: 'Bug',
    subtask: false,
    avatarId: 10303
  },
  SUBTASK: {
    self: 'https://engagio.atlassian.net/rest/api/2/issuetype/10300',
    id: '10300',
    description: '',
    iconUrl: 'https://engagio.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype',
    name: 'Sub-Task',
    subtask: true,
    avatarId: 10316
  },
  EPIC: {
    self: 'https://engagio.atlassian.net/rest/api/2/issuetype/10100',
    id: '10100',
    description: 'A big user story that needs to be broken down. Created by JIRA Software - do not edit or delete.',
    iconUrl: 'https://engagio.atlassian.net/images/icons/issuetypes/epic.svg',
    name: 'Epic',
    subtask: false
  },
  STORY: {
    self: 'https://engagio.atlassian.net/rest/api/2/issuetype/10200',
    id: '10200',
    description: 'A user story. Created by JIRA Software - do not edit or delete.',
    iconUrl: 'https://engagio.atlassian.net/images/icons/issuetypes/story.svg',
    name: 'Story',
    subtask: false
  }
}
