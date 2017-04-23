import makeGenerators from './make_generators_functions'
import makeWeightedSelectors from './make_weighted_selector'

export default (data, selectors) => {
  return makeGenerators(data, makeWeightedSelectors(data.sources, selectors || {}))
}
