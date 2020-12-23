import {slugify} from 'transliteration'

export function sanitize(ref: string): string {
  const branchName = ref.split('/').slice(2).join('/')

  return slugify(branchName)
}
