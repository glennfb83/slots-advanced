import { loadJSON, saveJSON, formatMoney } from './utils.js'


const BAL_KEY = 'slots_balance'
const OWN_KEY = 'slots_owned'
const SELECT_KEY = 'slots_selected'


const ITEMS = [
{id:'skin-neon', name:'Neon', price:200, desc:'Glowing neon slot panels'},
{id:'skin-wood', name:'Wood', price:150, desc:'Cozy wooden cabinet look'},
{id:'skin-galaxy', name:'Galaxy', price:250, desc:'Starry backdrop and swirl'},
]


const balanceEl = document.getElementById('balance')
const storeGrid = document.getElementById('storeGrid')
const ownedList = document.getElementById('ownedList')


let balance = loadJSON(BAL_KEY, 1000)
let owned = loadJSON(OWN_KEY, [])


function refresh(){ balanceEl.textContent = Math.round(balance)
ownedList.textContent = owned.length? owned.join(', '): '(none)'
}


function renderStore(){
storeGrid.innerHTML = ''
ITEMS.forEach(it=>{
const div = document.createElement('div')
div.className='store-item'
div.innerHTML = `<h4>${it.name}</h4><div>${it.desc}</div><div>Price: $${it.price}</div>`
const btn = document.createElement('button')
btn.textContent = owned.includes(it.id)? 'Select' : `Buy $${it.price}`
btn.addEventListener('click', ()=>{ if(owned.includes(it.id)){ localStorage.setItem(SELECT_KEY,it.id); alert('Selected: '+it.name); location.reload(); return } if(balance<it.price){ alert('Not enough money') ; return } balance -= it.price; owned.push(it.id); saveJSON(BAL_KEY,balance); saveJSON(OWN_KEY,owned); saveJSON(SELECT_KEY,it.id); alert('Purchased and selected: '+it.name); renderStore(); refresh(); })
div.appendChild(btn)
storeGrid.appendChild(div)
})
}


renderStore()
refresh()


// helpers to use saveJSON locally (no imports for that here)
function saveJSON(key,val){localStorage.setItem(key,JSON.stringify(val))}


---
