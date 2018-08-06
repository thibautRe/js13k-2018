;(window => {
  // Sets a global variable for hyperapp.h
  // eslint-disable-next-line
  window.h = hyperapp.h

  // state
  const State = {
    count: 0,
    flash: false,
  }

  // Actions
  const Actions = {
    upLater: value => async (state, actions) => {
      await new Promise(r => setTimeout(r, 1000))
      actions.up(value)
    },
    up: value => (state, actions) => {
      requestAnimationFrame(actions.endFlash)
      return { count: state.count + value, flash: value > 0 ? '+' : '-' }
    },
    endFlash: () => () => ({ flash: false }),
  }

  const View = (state, actions) => (
    <div>
      <h1>Hello there</h1>
      <Counter flash={state.flash}>{state.count}</Counter>
      <button onclick={() => actions.up(1)}>Button</button>
      <button onclick={() => actions.upLater(10)}>Up by 10 later</button>
      <Up by={2} />
    </div>
  )

  hyperapp.app(State, Actions, View, document.getElementById('a'))
})(window)
