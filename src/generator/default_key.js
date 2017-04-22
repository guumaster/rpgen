export const getDefaultKey = instance => {
  if (!Object.keys(instance.data.tpls).length) return ''
  if (instance.data.tpls.main) return 'main'
  if (instance.data.tpls.principal) return 'principal'
  return Object.keys(instance.data.tpls)[0]
}
