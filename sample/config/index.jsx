import {config} from 'ezy/common'

export default config.set(
    require('../gulp'),
    require('./base'),
    require('./{profile}'),
    typeof configuration != 'undefined' ? configuration : null
)
