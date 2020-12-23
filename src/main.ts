import * as core from '@actions/core'
import * as process from 'process'
import {slugify} from 'transliteration'

async function run(): Promise<void> {
  try {
    if (process.env.GITHUB_REF == null) {
      core.setFailed('No GITHUB_REF env variable found')
      return
    }
    const ref = process.env.GITHUB_REF

    const branchName = ref.split('/').slice(2).join('/')

    const branchNameSlug = slugify(branchName)

    core.debug(`Sanitized branch name is ${branchNameSlug}`)

    core.setOutput('branch_name', branchNameSlug)

    core.exportVariable('BRANCH_NAME', branchNameSlug)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
