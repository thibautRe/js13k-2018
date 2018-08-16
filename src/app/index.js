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
      name: 'Intro',
      step: 0,
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
  }

  const View = () => <Act />

  hyperapp.app(State, Actions, View, document.getElementById('a'))
})(window)
