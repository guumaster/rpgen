import axios from 'axios'

import { createGenerator } from '../generator'

const DEFAULT_OPTIONS = {
  API_URL: 'https://roleando.herokuapp.com'
}

export const loadGenerator = (id, options = DEFAULT_OPTIONS) => {
  if (!id) throw new Error(`Missing generator id`)

  return fetchGenerator(id, options)
    .then(loadChildren(options))
    .then(res => {
      if (!res || !res.data) throw new Error(`Error fetching Generator ${id}`)

      const generator = createGenerator(`${res.data.tpls}\n\n${res.data.tables}`)
      if (res.children) {
        Object.keys(res.children)
          .map(context => {
            const child = res.children[context]
            generator.addContent(`${child.data.tpls}\n\n${child.data.tables}`, context)
          })
      }
      return generator
    })
}

const fetchGenerator = (id, options) => {
  return axios
    .get(`${options.API_URL}/api/generators/table/${id}`)
    .then(res => res.data)
}

const loadChildren = options => (gen, root) => {
  if (!gen || !gen.data.remotes) return gen

  root = root || gen
  root._requested = root._requested || [root.id]
  root.children = root.children || {}

  const alias = gen.data.alias
  const aliasNames = Object.keys(gen.data.alias)

  const fetchAll = aliasNames
    .filter(name => !root._requested.includes(alias[name]))
    .map(name => {
      return fetchGenerator(alias[name], options)
        .then(child => {
          root._requested.push(child.id)
          root.children[name] = child
          return loadChildren(options)(child, root)
        })
    })

  return Promise.all(fetchAll)
    .then(() => {
      delete root._requested
      return root
    })
}
