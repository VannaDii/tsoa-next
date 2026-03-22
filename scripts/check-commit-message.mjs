#!/usr/bin/env node

import { readFileSync } from 'node:fs'

const [, , messageFile] = process.argv

if (!messageFile) {
  console.error('Usage: node scripts/check-commit-message.mjs <commit-message-file>')
  process.exit(1)
}

const rawMessage = readFileSync(messageFile, 'utf8')
const subject = rawMessage
  .split(/\r?\n/)
  .map(line => line.trim())
  .find(line => line.length > 0) ?? ''

const exemptPatterns = [/^Merge\b/, /^Revert\b/, /^fixup!/, /^squash!/]
if (exemptPatterns.some(pattern => pattern.test(subject))) {
  process.exit(0)
}

const conventionalCommitPattern =
  /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9./_-]+\))?(!)?: [a-z0-9].+$/

if (conventionalCommitPattern.test(subject)) {
  process.exit(0)
}

console.error(`Invalid commit message: "${subject}"`)
console.error('Expected Conventional Commits format: type(scope): subject')
console.error('Examples:')
console.error('  feat(cli): support tsconfig compiler options')
console.error('  fix(runtime): keep exclusive bound parameter typings Swagger 2 only')
console.error('  chore(changeset): add release metadata')
process.exit(1)
