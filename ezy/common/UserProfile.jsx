import assign from 'object-assign'
import {Model} from './Model'
import {cache} from './cache'

export class UserProfile extends Model {
    get defaultModelData() {
        return assign({
            account: null,
            email: null,
            alias: null,
            right: []
        }, this.config.standardUserData)
    }
    set loadFromCache(v) {
        if (v) this.data = cache.get(this.config.userProfileCacheName)
    }
    cache() {
        cache.set(this.config.userProfileCacheName, this.data)
    }
    remove() {
        this.default()
        this.cache()
    }
    afterSave() {
        // this.cache()
    }
    afterPropSave(k, v) {
        this.cache()
    }
}

export const user = new UserProfile()
user.loadFromCache = true
