// Functional wrapper for idb library
var idbApp = (function() {
    'use strict';

    // if (!('indexedDB' in window)) {
    //     console.log('This browser doesn\'t support IndexedDB');
    //     return;
    // }
    //Idb connection instance
    let _db;

    const dbPromise = () => {
        // _db will cache an open IndexedDB connection
        if (_db) {
            return Promise.resolve(_db);
        }

        return idb.open('zoom-db', 2, upgradeDB => {
            switch(upgradeDB.oldVersion) {
                case 0:
                case 1:
                    const countryHdStore = upgradeDB.createObjectStore('headlines-country', {
                        keyPath: 'iso'
                    });
                    const sourcesHdStore = upgradeDB.createObjectStore('headlines-sources', {
                        keyPath: 'sid'
                    });
                    const sourcesStore = upgradeDB.createObjectStore('sources-list', {
                        keyPath: 'id'
                    });
                    countryHdStore.createIndex("time", "time", { unique: false })
                    sourcesHdStore.createIndex("time", "time", { unique: false })
            }

        }).then(db => {
            _db = db;
            return db;
        });
    }

    const readIDB = (storeName, key) => {
        return dbPromise().then(db => {
            let tx = db.transaction(storeName, 'readonly');
            let store = tx.objectStore(storeName);
            return store.get(key)
        })
    }

    const readAllIDB = (storeName) => {
        return dbPromise().then(db => {
            let tx = db.transaction(storeName, 'readonly');
            let store = tx.objectStore(storeName);
            return store.getAll()
        })
    }

    const getbySourcesIDB = (storeName, sources) => {
        return dbPromise().then(db => {
            let tx = db.transaction(storeName, 'readonly');
            let store = tx.objectStore(storeName);
            let storedSources = []
            return store.openCursor()
                .then(function combineSources(cursor) {
                    console.log('Parsing found sources, ',storedSources)
                    if(!cursor) return storedSources;
                    if (sources.includes(cursor.key)) {
                        console.log('Found a match for ', cursor.key)
                        storedSources.push(cursor.value)
                    }
                    return cursor.continue().then(combineSources)
                })
        })
    }

    const addToIDB = (storeName, items) => {
        return dbPromise().then(db => {
            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);
            store.add(items)
            return tx.complete
        })
    }

    const updateIDB = (storeName, items) => {
        return dbPromise().then(db => {
            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);
            store.put(items)
            return tx.complete
        })
    }

    const deleteIDB = (storeName, key) => {
        return dbPromise().then(db => {
            let tx = db.transaction(storeName, 'readwrite');
            let store = tx.objectStore(storeName);
            store.delete(key)
            return tx.complete
        })
    }
    return {
        add: (addToIDB),
        update: (updateIDB),
        delete: (deleteIDB),
        get: (readIDB),
        getAll: (readAllIDB),
        getbySources: (getbySourcesIDB)
    }
})();