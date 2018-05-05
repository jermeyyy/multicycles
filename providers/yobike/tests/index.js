import test from 'ava'
import Yobike from '../lib'

test('overwrite timeout on constructor', async t => {
  const yobike = new Yobike({ timeout: 1 })

  await yobike
    .getBicyclesByLatLng({
      lat: 48.852775,
      lng: 2.369336
    })
    .then(() => {
      t.fail()
    })
    .catch(err => {
      t.is(err.code, 'ECONNABORTED')
      t.pass()
    })
})

test('overwrite timeout on method', async t => {
  const yobike = new Yobike()

  await yobike
    .getBicyclesByLatLng(
      {
        lat: 48.852775,
        lng: 2.369336
      },
      { timeout: 1 }
    )
    .then(() => {
      t.fail()
    })
    .catch(err => {
      t.is(err.code, 'ECONNABORTED')
      t.pass()
    })
})

test('get bicycles by positions', async t => {
  const yobike = new Yobike()

  await yobike
    .getBicyclesByLatLng({
      lat: 51.456734,
      lng: -2.591292
    })
    .then(result => {
      t.truthy(result.data.data.length)
      t.pass()
    })
    .catch(err => {
      console.log(err.response)
      t.fail()
    })
})