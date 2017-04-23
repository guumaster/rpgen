import merge from 'lodash.merge'

import {getDefaultKey} from './default_key'
import parseContent from './parser'
import makeSelectors from './selectors'

export default class Generator {
  constructor () {
    this.data = {sources: {}, tpls: {}}
  }

  addContent (str, context = '') {
    this.data = merge({}, this.data, parseContent(str, context))
    this.selectors = makeSelectors(this.data, this.selectors)
  }

  reset () {
    this.selectors = {}
    this.data = {sources: {}, tpls: {}}
  }

  listSources () {
    return Object.keys(this.data.sources)
  }

  listTpls () {
    return Object.keys(this.data.tpls)
  }

  generate (userKey) {
    const key = userKey || getDefaultKey(this)
    return this.selectors[key] ? this.selectors[key]() : ''
  }
}
