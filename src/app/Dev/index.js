if (__DEV__) {
  const wrapper = CS(`
    position:fixed;
    z-index:1000;
    bottom:0;
    right: 0;
    font-size: 12px;
    padding: 2px 7px;
    background-color: #EEE;
    color: #444;
    box-shadow: 0 0 3px rgba(0,0,55,.2);
  `)

  const green = CS(`color:hsl(124, 75%, 40%);`)
  const red = CS(`color:hsl(4,75%,40%);`)

  const makeSignedDiff = (next, prev) => {
    const diff = Math.round(((next - prev) / prev) * 10000) / 100
    return (diff > 0 ? '+' : '') + diff + '%'
  }

  const Stats = ({ bytes, sess }) => (
    <div class={wrapper}>
      {bytes !== undefined ? (
        <span>
          Size: <strong style={{ fontWeight: 'bold' }}>{bytes}</strong> bytes
          <span class={sess !== bytes && (sess > bytes ? green : red)}>
            {sess > bytes ? '↘️ ' : '↗️ '} {makeSignedDiff(bytes, sess)}
          </span>
        </span>
      ) : (
        '🔄 Rebuilding zip...'
      )}
    </div>
  )

  const state = {
    bytes: window.ZIP_SIZE,
    prev: window.PREV_SIZE,
    sess: window.SESS_SIZE,
  }

  const actions = {}

  hyperapp.app(state, actions, Stats, document.getElementById('dev'))
}
