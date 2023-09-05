const TYPE = {
  feat: 'Features',
  fix: 'Bug Fixes',
  docs: 'Docs',
  style: 'Styles',
  refactor: 'Refactor',
  test: 'Tests',
  chore: 'Chore',
}

const additionalRules = [
  { type: 'refactor', release: 'minor' },
  { type: 'docs', release: 'patch' },
  { type: 'test', release: 'patch' },
  { type: 'style', release: 'patch' },
  { type: 'chore', release: 'patch' },
]

const parserOpts = {
  mergePattern: /^Merge pull request #(\d+) from (.*)$/,
  mergeCorrespondence: ['id', 'source'],
}

const customTransform = (commit, context) => {
  const issues = []

  commit.notes.forEach(note => {
    note.title = 'BREAKING CHANGES'
  })

  if (TYPE[commit.type]) {
    commit.type = TYPE[commit.type]
  } else {
    return
  }

  if (commit.scope === '*') {
    commit.scope = ''
  }

  if (typeof commit.hash === 'string') {
    commit.shortHash = commit.hash.substring(0, 7)
  }

  if (typeof commit.subject === 'string') {
    let url = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl

    if (url) {
      url = `${url}/issues/`

      commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
        issues.push(issue)

        return `[#${issue}](${url}${issue})`
      })
    }
  }

  commit.references = commit.references.filter(reference => issues.indexOf(reference.issue) === -1)

  return commit
}

/**
 * For [`semantic-release`](https://semantic-release.gitbook.io/semantic-release) to generate the changelog, we use the
 * [`@semantic-release/release-notes-generator`](https://github.com/semantic-release/release-notes-generator) plugin.
 * According to its base config, the changelog is generated using the "angular" preset by default, from the
 * [`conventional-changelog-angular`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)
 * lib. However, that preset changes the changelog title depending on the type of commits included, which is not what
 * we want. We always want the same formatting pattern in the changelog title, regardless of the type of commits. So,
 * here we have the same title model as the "angular" preset, but without the conditional that controls the title. You
 * can compare it with the original from "angular" preset here: [header.hbs](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-angular/templates/header.hbs).
 */
const customHeaderPartial = `
# {{#if @root.linkCompare~}}
  [{{version}}](
  {{~#if @root.repository~}}
    {{~#if @root.host}}
      {{~@root.host}}/
    {{~/if}}
    {{~#if @root.owner}}
      {{~@root.owner}}/
    {{~/if}}
    {{~@root.repository}}
  {{~else}}
    {{~@root.repoUrl}}
  {{~/if~}}
  /compare/{{previousTag}}...{{currentTag}})
{{~else}}
  {{~version}}
{{~/if}}
{{~#if title}} "{{title}}"
{{~/if}}
{{~#if date}} ({{date}})
{{/if}}`

module.exports = {
  branches: ['master'],
  releaseRules: additionalRules,
  parserOpts,
  writerOpts: { transform: customTransform, headerPartial: customHeaderPartial },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    '@semantic-release/github',
  ],
}
