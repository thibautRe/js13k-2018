;(module => {
  // InsertRule shorthand
  const { sheet } = document.head.appendChild(document.createElement('style'))

  // CSS Reset
  sheet.insertRule(
    `body{padding:0;color:#30303F;font-family:"Century Gothic";font-weight:100;letter-spacing:0.065em;background:#F9F8FF}`,
  )
  sheet.insertRule(`button,input{font-family:inherit;}`)

  // This helpers generates a CSS class and insert its style in the body.
  // It returns the generated CSS class
  let globalID = 0
  module.CS = style => {
    // Generate className
    const className = '_' + globalID++
    module.C(`.${className}{${style}}`)
    return className
  }

  // Helper to generate keyframes
  module.CS.K = style => {
    const keyframeName = '_' + globalID++
    module.C(`@keyframes ${keyframeName}{${style}}`)
    return keyframeName
  }

  // Low level export of insertRule
  module.C = style => {
    sheet.insertRule(style, sheet.cssRules.length)
  }
})(window)
