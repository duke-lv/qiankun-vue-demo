import store from '@/store'
const getNamespace = () => {
  const pathname = window.location.pathname.split('/')[1]
  const subApp = store.getters.subApp
  const namespace = subApp.find(item => item.appPrefix.indexOf(pathname) !== -1 || pathname.indexOf(item.appPrefix)!== -1).appName
  return namespace
}
/**
 * sessionStorage 方法重写
 */
// setItem
const portalSessionOriginSetItem = window.sessionStorage.setItem
window.sessionStorage.setItem = function(key, newValue, bool) {
  // 添加命名空间  以子应用的唯一key
  if (bool) {  // 为true 代表主应用  添加 主应用唯一key
    key = `主应用:${key}`
  } else {  // 子应用  根据 子应用 key 添加 nameSpace
    key = `${getNamespace()}:${key}`
  }
  // 替换sessionStorage key
  arguments[0] = key
  portalSessionOriginSetItem.apply(this, arguments)
}
// getItem
const portalSessionOriginGetItem = window.sessionStorage.getItem
window.sessionStorage.getItem = function(key, bool) {
  // 提前添加 命名空间 取值
  if (bool) { // 为true 代表主应用  添加 主应用唯一key
    key = `主应用:${key}`
  } else { // 子应用  根据 子应用 key 添加 nameSpace
    key = `${getNamespace()}:${key}`
  }
  arguments[0] = key
  return portalSessionOriginGetItem.apply(this, arguments)
}
const portalSessionOriginRemoveItem = window.sessionStorage.removeItem
window.sessionStorage.removeItem = function(key, bool) {
  if (bool) { // 为true 代表主应用  添加 主应用唯一key
    key = `主应用:${key}`
  } else {
    key = `${getNamespace()}:${key}`
  }
  arguments[0] = key
  portalSessionOriginRemoveItem.apply(this, arguments)
}
// clear
const portalSessionOriginClear = window.sessionStorage.clear
window.sessionStorage.clear = function(bool) {
  let namespace
  if (bool && typeof bool === 'boolean') {  // 主应用
    // 清空所有 包括子应用的 
    portalSessionOriginClear.apply(this, arguments)
    return
  } else if (bool && bool === 'self') {
    namespace = '主应用'
  } else {
    namespace = getNamespace()
  }
  for (let i = 0; i < window.sessionStorage.length; i ++) {
    let key = window.sessionStorage.key(i)
    let arr = key.split(':')
    if (arr[0] === namespace) {
      if (namespace === '主应用') {
        window.sessionStorage.removeItem(arr[1], true)
      } else {
        window.sessionStorage.removeItem(arr[1])
      }
    }
  }
}

/**
 * localStorage 方法重写
 */

 // setItem
const portalLocalOriginSetItem = window.localStorage.setItem
window.localStorage.setItem = function(key, newValue, bool) {
  // 添加命名空间  以子应用的唯一key
  if (bool) {  // 为true 代表主应用  添加 主应用唯一key
    key = `主应用:${key}`
  } else {  // 子应用  根据 子应用 key 添加 nameSpace
    key = `${getNamespace()}:${key}`
  }
  // 替换localStorage key
  arguments[0] = key
  portalLocalOriginSetItem.apply(this, arguments)
}
// getItem
const portalLocalOriginGetItem = window.localStorage.getItem
window.localStorage.getItem = function(key, bool) {
  // 提前添加 命名空间 取值
  if (bool) { // 为true 代表主应用  添加 主应用唯一key
    key = `主应用:${key}`
  } else { // 子应用  根据 子应用 key 添加 nameSpace
    key = `${getNamespace()}:${key}`
  }
  arguments[0] = key
  return portalLocalOriginGetItem.apply(this, arguments)
}
const portalLocalOriginRemoveItem = window.localStorage.removeItem
window.localStorage.removeItem = function(key, bool) {
  if (bool) { // 为true 代表主应用  添加 主应用唯一key
    key = `主应用:${key}`
  } else {
    key = `${getNamespace()}:${key}`
  }
  arguments[0] = key
  portalLocalOriginRemoveItem.apply(this, arguments)
}
// clear
const portalLocalOriginClear = window.localStorage.clear
window.localStorage.clear = function(bool) {
  let namespace
  if (bool && typeof bool === 'boolean') {  // 主应用
    // 清空所有 包括子应用的 
    portalLocalOriginClear.apply(this, arguments)
    return
  } else if (bool && bool === 'self') {
    namespace = '主应用'
  } else {
    namespace = getNamespace()
  }
  for (let i = 0; i < window.localStorage.length; i ++) {
    let key = window.localStorage.key(i)
    let arr = key.split(':')
    if (arr[0] === namespace) {
      if (namespace === '主应用') {
        window.localStorage.removeItem(arr[1], true)
      } else {
        window.localStorage.removeItem(arr[1])
      }
    }
  }
}