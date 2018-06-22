import axios from 'axios'

import { createGenerator } from '../generator'

const DEFAULT_OPTIONS = {
  API_URL: 'https://api.rolodromo.com'
}

export const loadGenerator = async (id, options = DEFAULT_OPTIONS) => {
  const content = await fetchGenerator(id, options)
  const { tpls, tables } = content.data
  const childrenNames = Object.keys(content.children)
  let children = ''
  if (childrenNames.length) {
    children = childrenNames.reduce((str, key) => {
      const data = content.children[key]
      return `${str}\n\n${data.tables}`
    }, '')
  }
  return createGenerator(`${tpls}\n\n${tables}\n\n${children}`)
}

export const fetchGenerator = (id, options) => {
  return axios
    .get(`${options.API_URL}/api/generators/table/${id}`)
    .then(res => res.data)
}
