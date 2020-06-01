class OptionUtil {
  static getValidOpts (opts) {
    const validKeys = Object.keys(opts).filter((key) => opts[key])
    return validKeys.reduce((result, key) => {
      result[key] = opts[key]
      return result
    }, {})
  }
}

module.exports = OptionUtil
