const batch = require('./')
const test = require('ava')
const all = require('it-all')

test('Should batch up emitted arrays', async (t) => {
  const values = [[0, 1, 2], [3], [4]]
  const res = await all(batch(values, 2))

  t.deepEqual(res, [[0, 1], [2, 3], [4]])
})

test('Should batch up emitted arrays in singles', async (t) => {
  const values = [[0, 1, 2], [3], [4]]
  const res = await all(batch(values, 1))

  t.deepEqual(res, [[0], [1], [2], [3], [4]])
})

test('Should batch up emitted arrays in one array', async (t) => {
  const values = [[0, 1, 2], [3], [4]]
  const res = await all(batch(values, 100))

  t.deepEqual(res, [[0, 1, 2, 3, 4]])
})

test('Should batch up emitted arrays in small arrays', async (t) => {
  const values = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10]]
  const res = await all(batch(values, 1))

  t.deepEqual(res, [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10]])
})

test('Should batch up emitted arrays when no batch size is passed', async (t) => {
  const values = [[0, 1, 2], [3], [4]]
  const res = await all(batch(values))

  t.deepEqual(res, [[0], [1], [2], [3], [4]])
})

test('Should batch up entries with negative batch size', async (t) => {
  const values = [0, 1, 2, 3, 4]
  const batchSize = -1
  const res = await all(batch(values, batchSize))

  t.deepEqual(res, [[0], [1], [2], [3], [4]])
})

test('Should batch up entries with zero batch size', async (t) => {
  const values = [[0, 1, 2], [3, 4]]
  const batchSize = 0
  const res = await all(batch(values, batchSize))

  t.deepEqual(res, [[0], [1], [2], [3], [4]])
})

test('Should batch up entries with string batch size', async (t) => {
  const values = [[0, 1, 2], [3, 4]]
  const batchSize = '2'
  const res = await all(batch(values, batchSize))

  t.deepEqual(res, [[0, 1], [2, 3], [4]])
})

test('Should batch up entries with non-integer batch size', async (t) => {
  const values = [[0, 1, 2], [3, 4]]
  const batchSize = 2.5
  const res = await all(batch(values, batchSize))

  t.deepEqual(res, [[0, 1], [2, 3], [4]])
})
