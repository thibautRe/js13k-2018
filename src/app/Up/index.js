// eslint-disable-next-line no-unused-vars
const Up = ({ by }) => (state, actions) => (
  <UpButton onclick={() => actions.up(-by)} />
)
