import * as core from '@actions/core'
import * as process from 'process'
import {sanitize} from './sanitize'

async function run(): Promise<void> {
  try {
    const ref = process.env.GITHUB_REF

    if (ref == null) {
      core.setFailed('No GITHUB_REF env variable found')
      return
    }

    const branchNameSlug = sanitize(ref)

    core.info(`Sanitized branch name is ${branchNameSlug}`)

    core.setOutput('branch_name', branchNameSlug)

    core.exportVariable('BRANCH_NAME', branchNameSlug)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
