'use strict'

export const id = x => x
export const range = total => Array.from(Array(Number(total)).keys())
export const sum = arr => arr.reduce((total, curr) => total + curr, 0)

export const isString = str => typeof str === 'string'
export const isFunction = value => typeof value === 'function'
export const isDefined = value => typeof value !== 'undefined'
export const composeAll = fns => fns.reduce((f, g) => (...args) => f(g(...args)))

export const rand = (min, max) => Math.round(Math.random() * (max - min)) + min
