function qs(sel){return document.querySelector(sel)}
const form = qs('#recipe-form')
const list = qs('#recipes-list')

function loadRecipes(){
  try{const raw=localStorage.getItem('recipes');return raw?JSON.parse(raw):[] }catch(e){return[]}
}
function saveRecipes(arr){localStorage.setItem('recipes',JSON.stringify(arr))}

function render(){
  const recipes = loadRecipes()
  list.innerHTML = recipes.length?recipes.map((r,i)=>`<div class="card"><h3>${escapeHTML(r.title)}</h3><div class="meta">Ingredients: ${escapeHTML(r.ingredients.join(', '))}</div><pre>${escapeHTML(r.steps.join('\n'))}</pre><button data-i="${i}" class="del">Delete</button></div>`).join(''):'<p>No recipes yet.</p>'
}

function escapeHTML(s){return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[ch]))}

form.addEventListener('submit',e=>{
  e.preventDefault()
  const title = qs('#title').value.trim()
  const ingredients = qs('#ingredients').value.split(',').map(s=>s.trim()).filter(Boolean)
  const steps = qs('#steps').value.split('\n').map(s=>s.trim()).filter(Boolean)
  if(!title) return
  const arr = loadRecipes()
  arr.unshift({title,ingredients,steps})
  saveRecipes(arr)
  form.reset()
  render()
})

list.addEventListener('click', e=>{
  if(e.target.classList.contains('del')){
    const i = Number(e.target.dataset.i)
    const arr = loadRecipes()
    arr.splice(i,1)
    saveRecipes(arr)
    render()
  }
})

// seed sample recipe if none
if(!localStorage.getItem('recipes')){
  saveRecipes([{title:'Simple Pancakes',ingredients:['flour','milk','egg','baking powder','salt'],steps:['Mix ingredients','Heat pan','Cook until golden']}])
}

render()
