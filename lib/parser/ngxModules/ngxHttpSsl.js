const directives = [
  {
    name: 'ssl_buffer_size',
    possibleValues: 'size',
    default: '16k',
    context: 'http, server',
  },
  {
    name: 'ssl_certificate_key',
    possibleValues: 'file',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_certificate',
    possibleValues: 'file',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_ciphers',
    possibleValues: 'ciphers',
    default: 'HIGH:!aNULL:!MD5',
    context: 'http, server',
  },
  {
    name: 'ssl_client_certificate',
    possibleValues: 'file',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_crl',
    possibleValues: 'file',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_dhparam',
    possibleValues: 'file',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_ecdh_curve',
    possibleValues: 'curve',
    default: 'auto',
    context: 'http, server',
  },
  {
    name: 'ssl_password_file',
    possibleValues: 'file',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_prefer_server_ciphers',
    possibleValues: 'on | off',
    default: 'off',
    context: 'http, server',
  },
  {
    name: 'ssl_protocols',
    possibleValues: '[SSLv2] [SSLv3] [TLSv1] [TLSv1.1] [TLSv1.2]',
    default: 'TLSv1 TLSv1.1 TLSv1.2',
    context: 'http, server',
  },
  {
    name: 'ssl_session_cache',
    possibleValues: 'off | none | [builtin[:size]] [shared:name:size]',
    default: 'none',
    context: 'http, server',
  },
  {
    name: 'ssl_session_ticket_key',
    possibleValues: 'file',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_session_tickets',
    possibleValues: 'on | off',
    default: 'on',
    context: 'http, server',
  },
  {
    name: 'ssl_session_timeout',
    possibleValues: 'time',
    default: '5m',
    context: 'http, server',
  },
  {
    name: 'ssl_stapling_file',
    possibleValues: 'file',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_stapling',
    possibleValues: 'on | off',
    default: 'off',
    context: 'http, server',
  },
  {
    name: 'ssl_stapling_responder',
    possibleValues: 'url',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_stapling_verify',
    possibleValues: 'on | off',
    default: 'off',
    context: 'http, server',
  },
  {
    name: 'ssl_trusted_certificate',
    possibleValues: 'file',
    default: '—',
    context: 'http, server',
  },
  {
    name: 'ssl_verify_client',
    possibleValues: 'on | off | optional | optional_no_ca',
    default: 'off',
    context: 'http, server',
  },
  {
    name: 'ssl_verify_depth',
    possibleValues: 'number',
    default: '1',
    context: 'http, server',
  },
  {
    name: 'ssl',
    possibleValues: 'on | off',
    default: 'off',
    context: 'http, server',
  },
]

module.exports = {
  getDirectives() {
    return directives
  },
}
