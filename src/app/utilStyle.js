// This helpers generates a CSS class and insert its style in the body.
// It returns the generated CSS class
CS = style => {
  // Generate className
  const className = '_' + Math.round(Math.random() * Math.pow(10, 10))
  C(`.${className}{${style}}`)
  return className
}
