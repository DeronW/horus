
import Horus from './src'

const GLOBAL_NAME = '_FPP_Horus'
const GLOBAL_ALIAS_NAME = '$horus'
const GLOBAL_CONFIG = '_FPP_Horus_Config'

const config = window[GLOBAL_CONFIG] || {}

let alias_name = config.alias
delete config.alias

window[GLOBAL_NAME] = new Horus(config);

if (GLOBAL_ALIAS_NAME && typeof window[GLOBAL_ALIAS_NAME] === 'undefined')
    window[GLOBAL_ALIAS_NAME] = window[GLOBAL_NAME];