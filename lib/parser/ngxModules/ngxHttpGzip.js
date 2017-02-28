const directives = [
  {
    name: 'gzip_buffers',
    possibleValues: 'number size',
    default: '32 4k|16 8k',
    context: 'http, server, location',
  },
  {
    name: 'gzip_comp_level',
    possibleValues: 'level',
    default: '1',
    context: 'http, server, location',
  },
  {
    name: 'gzip_disable',
    possibleValues: 'regex ...',
    default: '-',
    context: 'http, server, location',
  },
  {
    name: 'gzip_min_length',
    possibleValues: 'length',
    default: '20',
    context: 'http, server, location',
  },
  {
    name: 'gzip_http_version',
    possibleValues: '1.0 | 1.1',
    default: '1.1',
    context: 'http, server, location',
  },
  {
    name: 'gzip_proxied',
    possibleValues: 'off | expired | no-cache | no-store | private | no_last_modified | no_etag | auth | any ...',
    default: 'off',
    context: 'http, server, location',
  },
  {
    name: 'gzip_types',
    possibleValues: 'mime-type ...',
    default: 'text/html',
    context: 'http, server, location',
  },
  {
    name: 'gzip_vary',
    possibleValues: 'on | off',
    default: 'off',
    context: 'http, server, location',
  },
  {
    name: 'gzip',
    possibleValues: 'on | off',
    default: 'off',
    context: 'http, server, location, if in location',
  },
]

module.exports = {
  getDirectives() {
    return directives
  },
}
