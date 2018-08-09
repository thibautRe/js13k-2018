;(window => {
  const effect0 = CS('color: #e5625b;font-weight:bold;')
  const effect1 = CS('font-size:.8em;')
  // Generate random positions
  const getEffect2Keyframes = (frames = 50, intensity = 3) =>
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

  const effects = [
    text => <span class={effect0}>{text}</span>,
    text => <span class={effect1}>{text}</span>,
    text =>
      text.split('').map(letter => <span class={getEffect2()}>{letter}</span>),
  ]

  const getTextEffect = type => effects[type]

  // Hello ¤1world¤1, how are you doing today
  const parsingRegex = /¤(\S)(.+?)¤(\1)/g
  const parser = string => {
    let match
    let result = []
    let rest = string

    while ((match = parsingRegex.exec(string)) !== null) {
      // Note: [original, type, text] = match
      const splited = rest.split(match[0])
      result = result.concat(splited[0], getTextEffect(match[1])(match[2]))
      rest = splited[1]
    }

    return result.concat(rest)
  }

  window.Text = (_, children) => <div>{parser(children[0])}</div>
})(window)
