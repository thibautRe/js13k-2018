;(window => {
  const effect0 = CS('color: #e5625b;font-weight:bold;')
  const effect1 = CS('font-size:.8em;')
  // Generate random positions
  const getEffect2Keyframes = (frames = 50, intensity = 2) =>
    CS.K(
      new Array(frames)
        .fill()
        .map(
          (_, index) =>
            `${(index * 100) /
              (frames - 1)}%{transform:translate(${Math.random() *
              intensity}px,${Math.random() * intensity}px);}`,
        )
        .join(''),
    )
  const getEffect2 = () =>
    CS(
      `animation:5s infinite ${getEffect2Keyframes()};display:inline-block;white-space:pre;`,
    )
  const effect2 = CS('display:inline-block;')
  const effect3 = CS('font-style:italic;')
  const textClass = CS(
    'position:absolute;max-width:700px;transition: opacity 1s;opacity:0;text-align:center',
  )
  const textVisible = CS('opacity: 1;')

  const effects = [
    text => <span class={effect0}>{text}</span>,
    text => <span class={effect1}>{text}</span>,
    text => (
      <span class={effect2}>
        {text.split('').map(letter => (
          <span class={getEffect2()}>{letter}</span>
        ))}
      </span>
    ),
    text => <span class={effect3}>{splitSpaces([text])}</span>,
  ]

  const getTextEffect = type => effects[type]

  // Hello %1world%1, how are you doing today
  const parsingRegex = /%(\S)(.+?)%(\1)/g
  const parser = string => {
    let match
    let result = []
    let rest = string

    while ((match = parsingRegex.exec(string)) != null) {
      // Note: [original, type, text] = match
      const splited = rest.split(match[0])
      result = result.concat(splited[0], getTextEffect(match[1])(match[2]))
      rest = splited[1]
    }

    return result.concat(rest)
  }

  // Split every word
  const split = CS(
    'display:inline-block;margin-left:8px;opacity:0;transform:translateY(10px);transition:.15s;',
  )
  const splitVisible = CS('opacity:1;transform:none;')
  const splitSpaces = parsed => {
    let index = 1
    let timer = 0.15
    const wrapSplit = splitted => (
      <span
        class={split}
        style={{ transitionDelay: index++ * timer + 's' }}
        oncreate={e => setTimeout(() => e.classList.add(splitVisible), 15)}
      >
        {splitted}
      </span>
    )
    return parsed.map(stringBytes => {
      if (typeof stringBytes == 'string') {
        const toReturn = stringBytes
          .split(' ')
          .filter(Boolean)
          .map(wrapSplit)
        return toReturn
      }
      return wrapSplit(stringBytes)
    })
  }

  const actionsWrapper = CS(
    'display:flex;justify-content:center;margin-top:20px;',
  )
  const actionButton = CS(
    'padding:10px 20px;margin:0 20px;background:transparent;border:none;border-radius:4px;cursor:pointer;font-size:14px;transform:scale(1.1) translateY(10px);opacity:0;transition:.15s ease;',
  )
  const actionButtonShow = CS('transform:none;opacity:1;')
  C(
    `.${actionButton}:hover{background:#FFF;box-shadow:0 2px 3px #3352;transition-delay:0s !important;}`,
  )

  // Retrives the number at the beginning of the string (the time to wait)
  // and the text that follows
  const parseTimeToWait = step => {
    const ttw = step.match(/^[0-9.]+/)
    return ttw
      ? { text: step.slice(ttw[0].length), ttw: parseInt(ttw[0]) }
      : { text: step }
  }

  // actions = arrayof(shape({ text, target }))
  window.Text = ({ text, actions = [] }) => (state, topLevelActions) => (
    <div
      key={text}
      class={textClass}
      oncreate={async element => {
        // Enter animation
        await HLP.T(0.015)
        element.classList.add(textVisible)

        // Pass to next step
        if (!actions.length) {
          // The time to wait until the next step is the number at the
          // beginning of the string, if any, or 1 second.
          await HLP.T(parseTimeToWait(text).ttw || 1)
          topLevelActions.acts.nextStep()
        }
      }}
      // Exit animation
      onremove={(element, done) => {
        element.classList.remove(textVisible)
        setTimeout(done, 1000)
      }}
    >
      {splitSpaces(parser(parseTimeToWait(text).text))}
      <div class={actionsWrapper}>
        {actions.map((action, actionIndex) => (
          <button
            class={actionButton}
            oncreate={async element => {
              await HLP.T(actionIndex * 0.5 + (parseTimeToWait(text).ttw || 1))
              element.classList.add(actionButtonShow)
            }}
            onclick={action.onclick}
          >
            {action.text}
          </button>
        ))}
      </div>
    </div>
  )
})(window)
