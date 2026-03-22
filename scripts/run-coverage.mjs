import { rm } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const testsDir = path.join(repoRoot, 'tests')
const coverageDir = path.join(repoRoot, 'coverage')
const coverageTmpDir = path.join(coverageDir, 'tmp')
const npmExecPath = process.env.npm_execpath

if (!npmExecPath) {
  throw new Error('npm_execpath is required to run the coverage script.')
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      stdio: 'inherit',
      ...options,
    })

    child.on('error', reject)
    child.on('exit', code => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Command failed with exit code ${code}: ${command} ${args.join(' ')}`))
    })
  })
}

try {
  await rm(coverageDir, { recursive: true, force: true })

  await run(process.execPath, [npmExecPath, '--prefix', 'tests', 'run', 'pretest'])
  await run(
    process.execPath,
    [path.join(repoRoot, 'node_modules', 'c8', 'bin', 'c8.js'), path.join(testsDir, 'node_modules', 'mocha', 'bin', 'mocha.js'), '**/*.spec.ts', '--timeout', '10000'],
    {
      cwd: testsDir,
      env: {
        ...process.env,
        NODE_ENV: 'tsoa_test',
      },
    },
  )
} finally {
  await rm(coverageTmpDir, { recursive: true, force: true })
}
