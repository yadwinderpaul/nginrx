const directives = [
  {
    name: 'index',
    possibleValues: 'file ...',
    default: 'index.html',
    context: 'http, server, location',
  },
]

module.exports = {
  getDirectives() {
    return directives
  },
}
