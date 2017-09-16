export default function(setting, gulp) {
    setting = setting || {}
    setting.easy = true
    require('easy/gulp/polish').default(setting, gulp)
    require('easy/gulp/includeapp').default(setting, gulp)
    require('easy/gulp/excludeapp').default(setting, gulp)
    require('easy/gulp/mkapp').default(setting, gulp)
    require('easy/gulp/rmapp').default(setting, gulp)
}
