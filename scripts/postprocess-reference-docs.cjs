const fs = require('node:fs')
const path = require('node:path')

const referenceRoot = path.join(__dirname, '..', 'site', 'guide-docs', 'reference')
const referenceIndexPath = path.join(referenceRoot, 'index.md')
const mergedRuntimeRoot = path.join(referenceRoot, 'tsoa-next')
const packageRuntimeRoot = path.join(referenceRoot, '@tsoa-next', 'runtime')
const packageCliRoot = path.join(referenceRoot, '@tsoa-next', 'cli')

function normalizeGitHubBranchLinks(content) {
  return content.replace(
    /https:\/\/github\.com\/tsoa-next\/tsoa-next\/blob\/[0-9a-f]{7,40}\//g,
    'https://github.com/tsoa-next/tsoa-next/blob/main/',
  )
}

function listMarkdownFiles(root) {
  if (!fs.existsSync(root)) {
    return []
  }

  const files = []
  const entries = fs.readdirSync(root, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name)
    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(fullPath))
      continue
    }

    if (entry.isFile() && fullPath.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

function replaceDefinedInLines(content, replacementLines) {
  let index = 0

  return content.replace(/^Defined in: .+$/gm, line => {
    const replacement = replacementLines[index]
    index += 1
    return replacement ?? line
  })
}

function syncDefinedInLines(targetFile, sourceFile) {
  if (!fs.existsSync(targetFile) || !fs.existsSync(sourceFile)) {
    return
  }

  const targetContent = fs.readFileSync(targetFile, 'utf8')
  const sourceContent = normalizeGitHubBranchLinks(fs.readFileSync(sourceFile, 'utf8'))
  const targetDefinedIn = targetContent.match(/^Defined in: .+$/gm) ?? []
  const sourceDefinedIn = sourceContent.match(/^Defined in: .+$/gm) ?? []
  let nextContent = normalizeGitHubBranchLinks(targetContent)

  if (targetDefinedIn.length > 0 && targetDefinedIn.length === sourceDefinedIn.length) {
    nextContent = replaceDefinedInLines(nextContent, sourceDefinedIn)
  }

  if (nextContent !== targetContent) {
    fs.writeFileSync(targetFile, nextContent)
  }
}

function getMemberDefinedInMap(filePath) {
  if (!fs.existsSync(filePath)) {
    return new Map()
  }

  const content = normalizeGitHubBranchLinks(fs.readFileSync(filePath, 'utf8'))
  const lines = content.split('\n')
  const members = new Map()
  let currentMember

  for (const line of lines) {
    const headingMatch = line.match(/^### (.+)$/)
    if (headingMatch) {
      currentMember = headingMatch[1].trim()
      continue
    }

    if (currentMember && line.startsWith('Defined in: ')) {
      members.set(currentMember, line)
      currentMember = undefined
    }
  }

  return members
}

function syncCliInheritedRuntimeConfigLinks(targetFile, sourceFile) {
  if (!fs.existsSync(targetFile) || !fs.existsSync(sourceFile)) {
    return
  }

  const sourceMembers = getMemberDefinedInMap(sourceFile)
  const targetContent = fs.readFileSync(targetFile, 'utf8')
  const lines = normalizeGitHubBranchLinks(targetContent).split('\n')
  const nextLines = []
  let currentMember

  for (const line of lines) {
    const headingMatch = line.match(/^### (.+)$/)
    if (headingMatch) {
      currentMember = headingMatch[1].trim()
      nextLines.push(line)
      continue
    }

    if (currentMember && /^Defined in: runtime\/dist\/config\.d\.ts:\d+$/.test(line)) {
      nextLines.push(sourceMembers.get(currentMember) ?? line)
      currentMember = undefined
      continue
    }

    nextLines.push(line)
  }

  const nextContent = nextLines.join('\n')
  if (nextContent !== targetContent) {
    fs.writeFileSync(targetFile, nextContent)
  }
}

function syncMergedRuntimeSourceLinks() {
  for (const mergedFile of listMarkdownFiles(mergedRuntimeRoot)) {
    const relativePath = path.relative(mergedRuntimeRoot, mergedFile)
    syncDefinedInLines(mergedFile, path.join(packageRuntimeRoot, relativePath))
  }
}

function syncCliRuntimeSourceLinks() {
  syncDefinedInLines(
    path.join(packageCliRoot, 'interfaces', 'Config.md'),
    path.join(packageRuntimeRoot, 'interfaces', 'Config.md'),
  )
  syncCliInheritedRuntimeConfigLinks(
    path.join(packageCliRoot, 'interfaces', 'ExtendedSpecConfig.md'),
    path.join(packageRuntimeRoot, 'interfaces', 'SpecConfig.md'),
  )
  syncCliInheritedRuntimeConfigLinks(
    path.join(packageCliRoot, 'interfaces', 'ExtendedRoutesConfig.md'),
    path.join(packageRuntimeRoot, 'interfaces', 'RoutesConfig.md'),
  )
}

function normalizePackageSourceLinks(root) {
  for (const file of listMarkdownFiles(root)) {
    const current = fs.readFileSync(file, 'utf8')
    const normalized = normalizeGitHubBranchLinks(current)

    if (normalized !== current) {
      fs.writeFileSync(file, normalized)
    }
  }
}

if (!fs.existsSync(referenceRoot)) {
  process.exit(0)
}

if (fs.existsSync(referenceIndexPath)) {
  const current = fs.readFileSync(referenceIndexPath, 'utf8')
  const normalized = current.replace(/src="_media\//g, 'src="./_media/')

  if (normalized !== current) {
    fs.writeFileSync(referenceIndexPath, normalized)
  }
}

normalizePackageSourceLinks(referenceRoot)
syncMergedRuntimeSourceLinks()
syncCliRuntimeSourceLinks()
