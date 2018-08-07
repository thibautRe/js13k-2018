;(exports => {
  // Helper to generate a text-shadow with same params
  const shadow = color => `text-shadow:0 0 5px ${color};transition:none`
  const baseCounter = CS(
    `font-size:15px;transition:text-shadow 1s;border:1px solid #000;`,
  )
  const flashTypes = {
    '+': CS(shadow('green')),
    '-': CS(shadow('red')),
  }

  exports.Counter = ({ flash }, children) => (
    <div class={`${baseCounter} ${flashTypes[flash]}`}>{children}</div>
  )
})(window)
