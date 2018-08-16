;(window => {
  const wrapper = CS(
    'position:absolute;top:0;left:0;bottom:0;right:0;display:flex;align-items:center;justify-content:center;font-size:22px;',
  )

  const allActs = {
    Intro: [
      '',
      'Hi.',
      'How are you?',
      '',
      'Have you been good %2chupchup%2?',
      'Yes:Good|No:NotGood',
    ],
    Good: ["That's good", 'I was kidding:NotGood'],
    NotGood: [
      "That's very bad fåfå!",
      'I was actually good:Good|I wanna restart:Intro',
    ],
  }

  const parseActions = actionString =>
    actionString
      .split('|')
      .map(singleActionString => singleActionString.split(':'))
      .map(([text, target]) => ({ text, target }))

  window.Act = () => ({ acts: { name, step } }, actions) => (
    <div class={wrapper}>
      <Text
        act={allActs[name]}
        actStep={step}
        actions={
          step === allActs[name].length - 2
            ? parseActions(allActs[name][step + 1])
            : undefined
        }
        onAnswer={actions.acts.changeAct}
      />
    </div>
  )
})(window)
