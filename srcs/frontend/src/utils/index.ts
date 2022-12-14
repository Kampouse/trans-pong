export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function generateSerial() {
  'use strict'
  const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const serialLength = 6
  var randomSerial = ''
  var i: number
  var randomNumber: number
  for (i = 0; i < serialLength; i = i + 1) {
    randomNumber = Math.floor(Math.random() * chars.length)
    randomSerial += chars.substring(randomNumber, randomNumber + 1)
  }
  return randomSerial
}

export function Fetch(url: string) {
    let  header = {
      'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
    }
     return fetch(url, {headers:header, credentials: 'include'})
  

}