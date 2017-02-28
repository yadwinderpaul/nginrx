const directives = [
  {
    name: 'accept_mutex_delay',
    possibleValues: 'time',
    default: '500ms',
    context: 'events',
  },
  {
    name: 'accept_mutex',
    possibleValues: 'on | off',
    default: 'off',
    context: 'events',
  },
  {
    name: 'daemon',
    possibleValues: 'on | off',
    default: 'off',
    context: 'main',
  },
  {
    name: 'debug_connection',
    possibleValues: 'address | CIDR | unix:',
    default: '—',
    context: 'events',
  },
  {
    name: 'debug_points',
    possibleValues: 'abort | stop',
    default: '—',
    context: 'main',
  },
  {
    name: 'error_log',
    possibleValues: 'file [level]',
    default: 'logs/error.log error',
    context: 'main, http, mail, stream, server, location',
  },
  {
    name: 'env',
    possibleValues: 'variable[=value]',
    default: 'TZ',
    context: 'main',
  },
  {
    name: 'events',
    possibleValues: 'block',
    default: '-',
    context: 'main',
  },
  {
    name: 'include',
    possibleValues: 'file | mask',
    default: '-',
    context: 'any',
  },
  {
    name: 'load_module',
    possibleValues: 'file',
    default: '-',
    context: 'main',
  },
  {
    name: 'lock_file',
    possibleValues: 'file',
    default: 'logs/nginx.lock',
    context: 'main',
  },
  {
    name: 'master_process',
    possibleValues: 'on | off',
    default: 'off',
    context: 'events',
  },
  {
    name: 'multi_accept',
    possibleValues: 'on | off',
    default: 'off',
    context: 'events',
  },
  {
    name: 'pcre_jit',
    possibleValues: 'on | off',
    default: 'off',
    context: 'main',
  },
  {
    name: 'pid',
    possibleValues: 'file',
    default: 'nginx.pid',
    context: 'main',
  },
  {
    name: 'ssl_engine',
    possibleValues: 'device',
    default: '-',
    context: 'main',
  },
  {
    name: 'thread_pool',
    possibleValues: 'name threads=number [max_queue=number]',
    default: 'default threads=32 max_queue=65536',
    context: 'main',
  },
  {
    name: 'timer_resolution',
    possibleValues: 'interval',
    default: '-',
    context: 'main',
  },
  {
    name: 'user',
    possibleValues: 'user [group]',
    default: 'nobody nobody',
    context: 'main',
  },
  {
    name: 'use',
    possibleValues: 'method',
    default: '-',
    context: 'events',
  },
  {
    name: 'worker_aio_requests',
    possibleValues: 'number',
    default: '32',
    context: 'events',
  },
  {
    name: 'worker_connections',
    possibleValues: 'number',
    default: '512',
    context: 'events',
  },
  {
    name: 'worker_cpu_affinity',
    possibleValues: 'auto [cpumask]',
    default: '-',
    context: 'main',
  },
  {
    name: 'worker_priority',
    possibleValues: 'number',
    default: '0',
    context: 'main',
  },
  {
    name: 'worker_processes',
    possibleValues: 'number | auto',
    default: '1',
    context: 'main',
  },
  {
    name: 'worker_rlimit_core',
    possibleValues: 'size',
    default: '-',
    context: 'main',
  },
  {
    name: 'worker_rlimit_nofile',
    possibleValues: 'number',
    default: '-',
    context: 'main',
  },
  {
    name: 'working_directory',
    possibleValues: 'directory',
    default: '-',
    context: 'main',
  },
]

module.exports = {
  getDirectives() {
    return directives
  },
}
