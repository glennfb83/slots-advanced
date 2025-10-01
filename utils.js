export function formatMoney(n){return Math.round(n)}


export function randInt(min,max){return Math.floor(Math.random()*(max-min+1))+min}


export function loadJSON(key,defaultValue){try{const v=localStorage.getItem(key);return v?JSON.parse(v):defaultValue}catch(e){return defaultValue}}


export function saveJSON(key,val){localStorage.setItem(key,JSON.stringify(val))}


---
