
import { isString } from './utils'
import { makeRoller } from './dice_roller'
import toLetters from './number_to_letters'

export default (str, filters) => {
  const convert = isString(filters) ? filters.match(/num(1)?/) : false
  const numberRoller = makeRoller(str)
  const letterRoller = () => toLetters(numberRoller(), convert[1])
  return convert ? letterRoller : numberRoller
}
