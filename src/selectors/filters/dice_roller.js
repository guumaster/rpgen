import {rand, range, sum} from './utils'

export const isDiceRoll = str => str.match(/([0-9]*)?d([0-9]+)(?:([+\-*/])([0-9]+))?/)
export const rollDice = (sides, amount) => sum(range(amount || 1).map(() => rand(1, sides)))
export const makeRoller = str => {
  const parts = isDiceRoll(str)
  if (!parts) {
    return 0
  }

  let [, amount, sides, op, mod] = parts
  mod = Number(mod)
  sides = Number(sides)
  amount = Number(amount)
  return () => {
    const roll = rollDice(sides, amount)
    if (!op || !mod || mod === 0) {
      return roll
    }
    if (op === '+') return roll + mod
    if (op === '-') return roll - mod
    if (op === '*') return roll * mod
    if (op === '/') return Math.round(roll / mod)
    return roll
  }
}
