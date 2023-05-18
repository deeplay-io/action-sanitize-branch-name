import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

import {sanitize} from '../src/main'

test('its supports cyrrilic', () => {
  expect(sanitize('ref/branch/русский-бранч')).toEqual('russkiy-branch')
})

test('its supports mixed languages', () => {
  expect(sanitize('ref/branch/русский-бранч-with-english-part')).toEqual(
    'russkiy-branch-with-english-part'
  )
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  // const np = process.execPath
  // const ip = path.join(__dirname, '..', 'lib', 'main.js')
  // const options: cp.ExecFileSyncOptions = {
  //   env: process.env
  // }
  // console.log(cp.execFileSync(np, [ip], options).toString())
})
