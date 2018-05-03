import Horus from './src'

const GLOBAL_NAME = '_FPP_Horus'
let GLOBAL_ALIAS_NAME = '$horus'
const GLOBAL_CONFIG = '_FPP_Horus_Config'

document.addEventListener('DOMContentLoaded', function () {

    const config = window[GLOBAL_CONFIG] || {}

    if (config.alias) {
        GLOBAL_ALIAS_NAME = config.alias
        delete config.alias
    }

    window[GLOBAL_NAME] = new Horus(config).start()

    if (GLOBAL_ALIAS_NAME && typeof window[GLOBAL_ALIAS_NAME] === 'undefined')
        window[GLOBAL_ALIAS_NAME] = window[GLOBAL_NAME];
})