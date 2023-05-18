import * as core from '@actions/core'
import {slugify} from 'transliteration'

export function sanitize(ref: string): string {
  const splittedRef = ref.split('/')
  // Если передали github.head_ref, то мы получим просто имя ветки
  const branchName =
    splittedRef.length > 2 ? splittedRef.slice(2).join('/') : ref

  return slugify(branchName, {replace: {'&': '-and-'}})
}

;(async (): Promise<void> => {
  try {
    const ref = core.getInput('ref', {required: true})

    if (ref == null || ref === '') {
      core.setFailed('No ref input found')

      return
    }

    const branchNameSlug = sanitize(ref)

    core.info(`Got ref: ${ref}`)
    core.info(`Sanitized branch name is ${branchNameSlug}`)

    core.setOutput('branch_name', branchNameSlug)

    core.exportVariable('BRANCH_NAME', branchNameSlug)
  } catch (error: unknown) {
    core.setFailed((error as Error).message)
  }
})()
