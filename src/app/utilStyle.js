// This helpers generates a CSS class and insert its style in the body.
// It returns the generated CSS class
// An optional classNameAdd can be added in order to increase specificity.
CS = (style, classNameAdd) => {
  // Generate className
  const className = '_' + Math.round(Math.random() * Math.pow(10, 10))
  C(`.${className}${classNameAdd && `.${classNameAdd}`}{${style}}`)
  return className
}
