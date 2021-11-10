let currentPath = ''

setInterval(() => {
  if (window.ace === undefined)
    return;
  
  const selected = document.querySelector('.tree-item-selected')
  const path = selected ? findPath(selected) : '_gee_tmp'
  const editor = document.querySelector('.ace_editor')

  if (path !== currentPath) {
    currentPath = path
    const code = localStorage.getItem(path)
    if (code) {
      window.ace.edit(editor).setValue(code)
    }
  } else {
    const code = window.ace.edit(editor).getValue()
    localStorage.setItem(path, code)
  }
}, 2000)

function findPath(selected) {
  const path = []
  let ptr = selected

  while (ptr) {
    let rootFound = false

    if (ptr.classList) {
      for (let className of Array.from(ptr.classList)) {
        if (/access-(owner|writer|reader)/.test(className)) {
          rootFound = true
          break
        }
      }
    }

    if (ptr.firstElementChild && ptr.firstElementChild.classList && Array.from(ptr.firstElementChild.classList).findIndex(it => it === 'header' || it === 'tree-item-name') !== -1) {
      path.push(ptr.firstElementChild.innerText)
    }

    if (rootFound) {
      break
    }

    ptr = ptr.parentNode
  }
  
  return path.reverse().join('/')
}