;(window => {
  // Sets a global variable for hyperapp.h
  // eslint-disable-next-line
  window.h = hyperapp.h

  window.HLP = {
    // Timer helper
    T: time => new Promise(r => setTimeout(r, time * 1000)),
  }

  const State = {
    count: 0,
    flash: false,
    Intro: {
      step: 0,
    },
  }

  const Actions = {
    Intro: {
      start: () => async (state, actions) => {
        await HLP.T(1)
        actions.changeStep(1)
        await HLP.T(1)
        actions.changeStep(2)
        await HLP.T(2)
        actions.changeStep(3)
        await HLP.T(1)
        actions.changeStep(4)
      },
      changeStep: step => ({ step }),
    },
    upLater: value => async (state, actions) => {
      await new Promise(r => setTimeout(r, 1000))
      actions.up(value)
    },
    up: value => (state, actions) => {
      setTimeout(actions.endFlash, 15)
      return { count: state.count + value, flash: value > 0 ? '+' : '-' }
    },
    endFlash: () => ({ flash: false }),
  }

  const View = (state, actions) => (
    <div>
      <Intro />
      <Counter flash={state.flash}>{state.count}</Counter>
      <button onclick={() => actions.up(1)}>Button</button>
      <button onclick={() => actions.upLater(10)}>Up by 10 soon</button>
      <Up by={2} />
    </div>
  )

  hyperapp.app(State, Actions, View, document.getElementById('a'))
})(window)
