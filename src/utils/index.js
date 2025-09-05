import Decimal from 'decimal.js'

// 模拟请求等待时间ms；errorRate报错率：多少概率return Error请求失败
export function sleep(ms, errorRate = import.meta.env.DEV ? 0.05 : 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟请求失败
      if (Math.random() < errorRate) {
        reject(new Error('请求失败'))
      }
      resolve()
    }, ms)
  })
}

// 返回随机数，toDecimalPlaces 保留小数位数
export function randomNum(num = 0, toDecimalPlaces = getDecimalPlaces(num), force = false) {
  if (import.meta.env.DEV || force) {
    // 平均5份
    const random = Math.floor(Math.random() * 5)
    switch (random) {
      case 0:
        // 1/5 概率返回数字的[3/4,1]区间
        return Decimal(randomFromDec((num * 3) / 4, num))
          .toDecimalPlaces(toDecimalPlaces)
          .toNumber()
      case 1:
        // 1/5 概率返回数字的[1/2,1]区间
        return Decimal(randomFromDec(num / 2, num))
          .toDecimalPlaces(toDecimalPlaces)
          .toNumber()
      case 2:
        // 1/5 概率返回数字的[0,1]区间
        return Decimal(randomFromDec(0, num)).toDecimalPlaces(toDecimalPlaces).toNumber()
      case 4:
      default:
        // 2/5 概率返回原数字
        return Decimal(num).toDecimalPlaces(toDecimalPlaces).toNumber()
    }
  } else {
    return num
  }
}
// 获取小数位（小数点后数字个数）
function getDecimalPlaces(num) {
  const str = String(num)
  if (str.includes('.')) return str.split('.')[1].length
  return 0
}
// 选取范围内随机值（仅小数）
function randomFromDec(min, max) {
  if (min > max) [min, max] = [max, min]
  return Math.random() * (max - min) + min
}

// 获取第一个不是数字的字符
function getDateSeparator(dateStr) {
  let match = dateStr.match(/[^0-9]/)
  return match ? match[0] : null
}

/**
 * 获取时间范围内的所有日期（包含起止日期）
 * @param {[string, string]} range ['2025-07-25', '2025-08-23']
 * @returns {string[]} ['2025-07-25', '2025-07-26', ...]
 */
export function getDateRange(range) {
  try {
    const [start, end] = range
    const result = []

    let current = new Date(start)
    const last = new Date(end)

    const separator = getDateSeparator(start)

    while (current <= last) {
      const y = current.getFullYear()
      const m = String(current.getMonth() + 1).padStart(2, '0')
      const d = String(current.getDate()).padStart(2, '0')
      result.push(`${y}${separator}${m}${separator}${d}`)

      // 日期加一天
      current.setDate(current.getDate() + 1)
    }

    return result
  } catch (error) {
    console.error(error)
    return []
  }
}

/**
 * 获取时间范围内的所有月份（包含起止月份）
 * @param {[string, string]} range ['2025-07-25', '2025-08-23']
 * @returns {string[]} ['2025-07', '2025-08', ...]
 */
export function getMonthRange(range) {
  try {
    const [start, end] = range
    const result = []

    let current = new Date(start)
    const last = new Date(end)

    const separator = getDateSeparator(start)

    // 避免日子不同造成的问题，只取年月
    current.setDate(1)
    last.setDate(1)

    while (current <= last) {
      const y = current.getFullYear()
      const m = String(current.getMonth() + 1).padStart(2, '0')
      result.push(`${y}${separator}${m}`)
      // 月份加 1
      current.setMonth(current.getMonth() + 1)
    }

    return result
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function fetch(params) {
  await sleep(Math.random() * 1000)
  console.log('请求参数：', JSON.stringify(params))

  const current = params?.current ?? 1
  const pageSize = params?.pageSize ?? 10
  const total =
    current * pageSize +
    (Math.random() > 0.5 ? randomNum(3, undefined, true) : -1) *
      randomNum(pageSize - 1, undefined, true)
  return {
    pagination: {
      current,
      pageSize,
      total,
    },
    list: Array.from({
      length: total - (current - 1) * pageSize >= pageSize ? pageSize : total % pageSize,
    }).map((item, index) => {
      return {
        0: index,
        1: index + 1,
        2: index + 2,
        3: index + 3,
      }
    }),
  }
}
