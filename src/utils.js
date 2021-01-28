export const scrollbarWidth = () => {
  const scrollDiv = document.createElement('div')
  scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

export const hasRole = (user, roleName) => {
  if(user.username === "admin"){
    return true
  }
  let _hasRole = false
  user.roles.map((r, i)=>{
    if(roleName === r.name){
      _hasRole = true
    }
  })
  return _hasRole
}