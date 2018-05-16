'use strict'

const {_load, Module} = require('module')
const {join, resolve} = require('path')

const getPathWithNM = (dir, path) => join(resolve('.'), dir, 'node_modules', path)

const getModulePath = ({subdir}, path) => {
  if (path.startsWith('~')) {
    const [dir, ...restPath] = path.slice(1, Infinity).split('/')
    return getPathWithNM(dir, restPath.join('/'))
  }
  if (subdir && !path.startsWith('.')) {
    return getPathWithNM(subdir, path)
  }
  return path
}

exports.before = config => {
  Module._load = (path, ...rest) => _load(getModulePath(config, path), ...rest)
}
