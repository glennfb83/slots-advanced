import { randInt } from './utils.js'


const SYMBOLS = ['🍒','🍋','🔔','⭐','🍉','7️⃣']


const PAY_TABLE = {
'7️⃣': {3: 50, 2: 5},
'⭐': {3: 20, 2: 4},
'🔔': {3: 15, 2: 3},
'🍉': {3: 12, 2: 2},
'🍒': {3: 10, 2: 1.5},
'🍋': {3: 8, 2: 1}
}


export function spinReels(){
// returns an array of 3 symbols
return [randInt(0,SYMBOLS.length-1), randInt(0,SYMBOLS.length-1), randInt(0,SYMBOLS.length-1)].map(i=>SYMBOLS[i])
}


export function evaluateSpin(reels, bet){
// simple: if all three equal => payout*bet, if two equal => smaller
const [a,b,c] = reels
let payout = 0
let message = 'No win'
if(a===b && b===c){
const table = PAY_TABLE[a] || {3:5}
payout = table[3]*bet
message = `Triple ${a}!`
} else if (a===b || b===c || a===c){
const symbol = a===b? a : (b===c? b : a)
const table = PAY_TABLE[symbol] || {2:1}
payout = table[2]*bet
message = `Pair ${symbol}`
} else {
// small chance of scatter win
if(Math.random()<0.03){ payout = bet*2; message='Lucky bonus!' }
}
return {payout: Math.round(payout), message}
}


---
