;(window => {
  const wrapper = CS(
    'position:absolute;top:0;left:0;bottom:0;right:0;display:flex;align-items:center;justify-content:center;padding:40px;font-size:22px;',
  )

  const allActs = {
    Intro: [
      '',
      '2Man: Hello and welcome!',
      '2Please... Come on in!',
      '2Would you like something to drink?',
      'Tea, please:Intro2|Coffee is fine:Intro2',
    ],
    Intro2: [
      "2Perfect, I'll go get that for you.",
      '4You can wait in the living room in the meantime.',
      '3%3You go in the living room and find a cat sitting in a couch%3',
      'Pet the cat:Intro3',
    ],
    Intro3: [
      '2%3The cat likes the petting%3',
      'Pet the cat:IntroCat1|Stop petting the cat:IntroCatStop',
    ],
    IntroCat1: [
      '2%3The cat %3%2loves%2%3 the petting%3.',
      'Pet the cat:IntroCat2|Stop petting the cat:IntroCatStop',
    ],
    IntroCat2: [
      '3%3The cat gets up and goes away, visibly annoyed by too much petting.%3',
      'Sit in the couch:IntroManQuestions',
    ],
    IntroCatStop: [
      '2%3The cat goes back to sleep.%3',
      '2%3You feel like the cat wanted more.%3',
      'Leave the cat alone:IntroManQuestions',
    ],
    IntroManQuestions: [
      '2Man: Ah you are there!',
      '4I see that you got to meet with my cat, %0Mousti%0.',
      "3He's very sweet, and really loves having company.",
      "2Great. Now that you're here, shall we start?",
      'Start what?:IntroWhat|Who are you?:NotImplemented',
    ],
    IntroWhat: [
      '4Well, start the big project that we talked about of course!',
      '3Our big project of %0deleting the Internet%0.',
      "2You didn't forget, did you?",
      'Of course not:Go',
    ],
    Go: () => (state, actions) => (
      <Text
        text="2Anyway, are you %0ready%0?"
        actions={[
          { text: "Of course, let's go!", onclick: actions.ui.showStats },
        ]}
      />
    ),
    NotImplemented: ['Not implemented', 'Back to start:Intro'],
  }

  const parseActions = actionString =>
    actionString
      .split('|')
      .map(singleActionString => singleActionString.split(':'))
      .map(([text, target]) => ({ text, target }))

  window.Act = () => ({ acts: { name, step } }, actions) => (
    <div class={wrapper}>
      {/* Text arrays */}
      {Array.isArray(allActs[name]) && (
        <Text
          text={allActs[name][step]}
          actions={
            step === allActs[name].length - 2
              ? parseActions(allActs[name][step + 1]).map(
                  ({ text, target }) => ({
                    text,
                    onclick: () => actions.acts.changeAct(target),
                  }),
                )
              : undefined
          }
        />
      )}
      {/* Element */}
      {typeof allActs[name] === 'function' && h(allActs[name])}
    </div>
  )
})(window)
