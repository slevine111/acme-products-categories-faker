const dbInit = require('./index')
const { Product, Category } = require('./models/index')

const createSeedInstances = (model, instances) => {
  return Promise.all(instances.map(instance => model.create(instance)))
}

const syncAndSeed = async () => {
  await dbInit(true)

  const [languages, sports] = await createSeedInstances(Category, [
    { name: 'languages' },
    { name: 'sports' }
  ])

  const [javascript, football, sql] = await createSeedInstances(Product, [
    { name: 'javascript' },
    { name: 'football' },
    { name: 'sql' }
  ])

  return Promise.all([
    languages.setProducts([javascript, sql]),
    sports.setProducts(football)
  ])
}

//syncAndSeed()

module.exports = syncAndSeed
