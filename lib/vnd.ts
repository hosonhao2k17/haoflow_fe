
const ONES = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"]
const TENS = ["", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"]


const readHundreds = (n: number): string => {
  const h = Math.floor(n / 100)
  const t = Math.floor((n % 100) / 10)
  const o = n % 10
  const parts: string[] = []
  if (h > 0) parts.push(`${ONES[h]} trăm`)
  if (t === 0 && o > 0 && h > 0) parts.push(`linh ${ONES[o]}`)
  else if (t === 1) parts.push(o === 0 ? "mười" : o === 5 ? "mười lăm" : `mười ${ONES[o]}`)
  else if (t > 1) parts.push(o === 0 ? TENS[t] : o === 5 ? `${TENS[t]} lăm` : o === 1 ? `${TENS[t]} mốt` : `${TENS[t]} ${ONES[o]}`)
  return parts.join(" ")
}
 

export const amountToWords = (n: number): string => {
  if (!n || n === 0) return ""
  if (n >= 1_000_000_000_000) return "Số quá lớn"
  const ty    = Math.floor(n / 1_000_000_000)
  const trieu = Math.floor((n % 1_000_000_000) / 1_000_000)
  const nghin = Math.floor((n % 1_000_000) / 1_000)
  const le    = n % 1_000
  const parts: string[] = []
  if (ty    > 0) parts.push(`${readHundreds(ty)} tỷ`)
  if (trieu > 0) parts.push(`${readHundreds(trieu)} triệu`)
  if (nghin > 0) parts.push(`${readHundreds(nghin)} nghìn`)
  if (le    > 0) parts.push(readHundreds(le))
  const result = parts.join(" ")
  return result.charAt(0).toUpperCase() + result.slice(1) + " đồng"
}