'use strict'

export const id = x => x
export const range = size => Array.apply(null, Array(size))
export const sum = arr => arr.reduce((total, curr) => total + curr, 0)
export const rand = (min, max) => Math.round(Math.random() * (max - min)) + min
export const isString = str => typeof str === 'string'
