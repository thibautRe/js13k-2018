;(module => {
  // InsertRule shorthand
  const { sheet } = document.head.appendChild(document.createElement('style'))

  // CSS Reset
  sheet.insertRule(
    `body{padding:0;background:#FC0;color:#333;font-family:"Century Gothic";font-weight:100;}`,
  )
  sheet.insertRule(`button{font-family:inherit;}`)

  // This helpers generates a CSS class and insert its style in the body.
  // It returns the generated CSS class
  // An optional classNameAdd can be added in order to increase specificity.
  let globalClassName = 0
  module.CS = style => {
    // Generate className
    const className = '_' + globalClassName++
    const rule = `.${className}{${style}}`
    sheet.insertRule(rule, sheet.cssRules.length)
    return className
  }

  // Low level export of insertRule
  module.C = style => {
    sheet.insertRule(style, sheet.cssRules.length)
  }
})(window)
