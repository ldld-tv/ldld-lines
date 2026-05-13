

function formatHost(host: string) {
  return host.replace(RegExp('^(https?://)?(www\\.)?', 'i'), '');
}

export { formatHost };
