;(window => {
  const wrapper = CS(
    'position:fixed;top:0;left:0;bottom:0;right:0;display:flex;align-items:center;justify-content:center;background:#F9F8FF;font-size:22px;letter-spacing:0.065em;text-shadow: 0 0 80px black',
  )

  window.Intro = () => (state, actions) => (
    <div class={wrapper} oncreate={actions.Intro.start}>
      {state.Intro.step == 0 && <Text>Hi.</Text>}
      {state.Intro.step == 1 && (
        <Text>
          Hello ¤0world¤0, how ¤2are you¤2 doing ¤1today¤1? Happy to ¤1see¤1 you
          again
        </Text>
      )}
    </div>
  )
})(window)
