
import { isString } from '../../functions'
import { sumRoller } from '../../roller/simple'
import toLetters from './number_to_letters'

export default (str, filters) => {
  const convert = isString(filters) ? filters.match(/num(1)?/) : false
  const numberRoller = sumRoller(str)
  const letterRoller = () => toLetters(numberRoller(), convert[1])
  return convert ? letterRoller : numberRoller
}
