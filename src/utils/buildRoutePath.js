export function buildRoutePath (path) {
  const paramRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll( paramRegex, '(?<$1>[a-zA-Z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}`)
  return paramRegex
}