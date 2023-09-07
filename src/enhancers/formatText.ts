import { arabicToFarsi } from '@/lib/constants'

const formatText = (value: string | number) => {
  if (typeof value == 'number') {
    value = value.toString()
  }
  const chars = value.split('')
  const farsiChars = chars.map((char) => arabicToFarsi[char] || char)
  const farsiValue = farsiChars.join('')
  if (typeof value == 'string') return farsiValue
  else return +farsiValue
}

export default formatText
