const directives = [
  {
    name: 'access_log',
    possibleValues: 'path [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]] | off',
    default: 'logs/access.log combined',
    context: 'http, server, location, if in location, limit_except',
  },
  {
    name: 'log_format',
    possibleValues: 'name [escape=default|json] string ...',
    default: 'combined "..."',
    context: 'http',
  },
  {
    name: 'open_log_file_cache',
    possibleValues: 'max=N [inactive=time] [min_uses=N] [valid=time] | off',
    default: 'off',
    context: 'http, server, location',
  },
]

module.exports = {
  getDirectives() {
    return directives
  },
}
