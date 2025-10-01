import { loadJSON, saveJSON, formatMoney } from './utils.js'
import { spinReels, evaluateSpin } from './slots.js'


const BAL_KEY = 'slots_balance'
const OWN_KEY = 'slots_owned'
const SELECT_KEY = 'slots_selected'


const DEFAULT_BAL = 1000


let balance = loadJSON(BAL_KEY, null)
if(balance === null){ balance = DEFAULT_BAL; saveJSON(BAL_KEY,balance) }


const balanceEl = document.getElementById('balance')
const betEl = document.getElementById('bet')
const spinBtn = document.getElementById('spinBtn')
const maxBtn = document.getElementById('maxBtn')
const reelsEl = document.getElementById('reels')
const msgEl = document.getElementById('message')
const lastResult = document.getElementById('lastResult')


function refreshBalance(){ balanceEl.textContent = formatMoney(balance) }


function loadCosmetic(){
const selected = loadJSON(SELECT_KEY, null)
if(selected) document.body.classList.add(selected)
}


loadCosmetic()
refreshBalance()


maxBtn.addEventListener('click', ()=>{ betEl.value = Math.max(1, Math.floor(balance/10)) })


spinBtn.addEventListener('click', async ()=>{
let bet = Math.max(1, Math.floor(Number(betEl.value)||1))
if(bet>balance){ msgEl.textContent = 'Not enough balance!'; return }
// disable while spinning
spinBtn.disabled = true
balance -= bet
saveJSON(BAL_KEY,balance); refreshBalance()


// animate reels with small async loop (no external await needed but we mimic spins)
---
