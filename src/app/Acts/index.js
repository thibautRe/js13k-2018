;(window => {
  const wrapper = CS(
    'position:absolute;top:0;left:0;bottom:0;right:0;display:flex;align-items:center;justify-content:center;padding:40px;font-size:22px;',
  )

  const allActs = {
    Intro: [
      '',
      '2Hello.',
      '2How are you?',
      "Pretty okay:Intro2|I'm alright:Intro2",
    ],
    Intro2: [
      "3Alright. That's good.",
      '2I guess...',
      '2 ...',
      '2 ...Anyway.',
      'Welcome!',
      'Where am I?:IntroWhere|Who are you?:NotImplemented',
    ],
    IntroWhere: [
      'Really?',
      'Are you %2really%2 asking me this?',
      'Sorry:NotImplemented',
    ],
    NotImplemented: ['Not implemented', 'Back to start:Intro'],
  }

  const parseActions = actionString =>
    actionString
      .split('|')
      .map(singleActionString => singleActionString.split(':'))
      .map(([text, target]) => ({ text, target }))

  window.Act = () => ({ acts: { name, step } }) => (
    <div class={wrapper}>
      <Text
        act={allActs[name]}
        actStep={step}
        actions={
          step === allActs[name].length - 2
            ? parseActions(allActs[name][step + 1])
            : undefined
        }
      />
    </div>
  )
})(window)
