
// cache memory
const CACHE = new Map()

// cache memory settings
const memory = {
    ttl: 1000 * 60 * 60 * 24, // 24 hours
}

// checks cache for key, returns value if found, otherwise returns null
const get = (key) => {
    const value = CACHE.get(key)
    if (value) {
        return value
    }
    return null
}

// sets key to value, returns value
const set = (key, value) => {
    // check for duplicate key
    if (CACHE.has(key)) {
        CACHE.delete(key)
    }

    CACHE.set(key, value)
    return value
}

// deletes key from cache
const del = (key) => {CACHE.delete(key)}
// clears cache
const clear = () => {CACHE.clear()}
// returns size of cache
const size = () => {return CACHE.size}
// checks if key exists in cache
const has = (key) => {return CACHE.has(key)}
// returns keys of cache
const keys = () => {return CACHE.keys()}
// returns values of cache
const values = () => {return CACHE.values()}

// removes expired values from cache
const prune = () => {
    const now = Date.now()
    for (const [key, value] of CACHE) {
        if (value.ttl < now) {
            del(key)
        }
    }
}

// prune cache every 24 hours
const pruneInterval = setInterval(prune, memory.ttl)



module.exports = {
    get,
    set,
    del,
    clear,
    size,
    has,
    keys,
    values,
    prune,
    pruneInterval,
}