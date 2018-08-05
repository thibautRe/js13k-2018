;(() => {
  const className = CS('padding:10px 5px;border:none')
  C(`.${className}:after{content:"hello"}`)

  window.UpButton = ({ onclick }) => (
    <button class={className} onclick={onclick}>
      Up Button
    </button>
  )
})()
