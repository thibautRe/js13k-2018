;(window => {
  // Sets a global variable for hyperapp.h
  // eslint-disable-next-line
  window.h = hyperapp.h

  window.HLP = {
    // Timer helper
    T: time => new Promise(r => setTimeout(r, time * 1000)),
  }

  const State = {
    acts: {
      name: 'IntroWhat',
      step: 0,
    },
    ui: {
      stats: false,
    },
  }

  const Actions = {
    acts: {
      nextStep: () => state => {
        return { step: state.step + 1 }
      },
      changeAct: name => ({
        step: 0,
        name,
      }),
    },
    ui: {
      showStats: () => ({ stats: true }),
    },
  }

  const View = state => (
    <div>
      <Act />
      {state.ui.stats && <h1>STATS</h1>}
    </div>
  )

  hyperapp.app(State, Actions, View, document.getElementById('a'))
})(window)
