export function FixDigits(value: number | string): string {
  return value.toString().length === 1 ? `0${value}` : value.toString()
}
