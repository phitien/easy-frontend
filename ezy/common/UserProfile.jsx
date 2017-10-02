import assign from 'object-assign'
import {Model} from './Model'
import {cache} from './cache'

export class UserProfile extends Model {
    constructor(key, ...args) {
        super(...args)
        this.key = key
    }
    __default = {
        uuid: null,
        email: null,
        short_name: null,
        name: null,
        avatar: null,
        right: []
    }
    cache() {
        cache.set(this.key, this.data)
    }
    remove() {
        this.default()
        this.cache()
    }
    afterSave() {
        this.cache()
    }
    afterPropSave(k, v) {
        this.cache()
    }
}
