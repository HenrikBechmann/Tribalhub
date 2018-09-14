// datamodel.tsx
/*

    THIS IS JUST A PROTOTYPE
    should sit between application and domain
    currently being bypassed
    This is the runtime memory data model
    It is accessed by controllers (containers)
    The store should be immutable: changes to objects cause replacement, not revision
        of those objects. This allows react to respond to changes simply by checking
        objects.

    TODO:
        - trigger subscriptions to containerstore with changes
*/
var StoreEndpoints;
(function (StoreEndpoints) {
    StoreEndpoints["data"] = "data";
    StoreEndpoints["meta"] = "meta";
    StoreEndpoints["controls"] = "controls";
    // data and meta
    StoreEndpoints["items"] = "items";
    StoreEndpoints["lists"] = "lists";
    StoreEndpoints["links"] = "links";
    StoreEndpoints["schemes"] = "schemes";
    // controls
    StoreEndpoints["user"] = "user";
    StoreEndpoints["context"] = "context";
})(StoreEndpoints || (StoreEndpoints = {}));
// TODO: for undo/redo add 'past, present, future' properties to undoable sections 
// of the store.
let assertArray = (data) => {
    return Array.isArray(data) ? data : [data];
};
let subscribe = (containerpath, callback) => {
    let result = findtargetstore(containerpath);
    if (result === false)
        return result;
    let { targetstore } = result;
    if (!targetstore.__callbacks__)
        targetstore.__callbacks__ = [];
    targetstore.__callbacks__.push(callback);
};
let publishchange = (container, index, data) => {
    if (container.__callbacks__) {
        let func;
        for (func of container.__callbacks__) {
            func(container, index, data);
        }
    }
};
let updateproperty = (containerpath, propertyindex, contents) => {
    let result = findtargetstore(containerpath);
    if (result === false)
        return result;
    let { containerstore, targetstore, targetstoreindex } = result;
    if (targetstore[propertyindex] !== contents) {
        targetstore = Object.assign({}, targetstore); // new object, new pointer
        containerstore[targetstoreindex] = targetstore;
        targetstore[propertyindex] = contents;
        publishchange(containerstore, targetstoreindex, targetstore);
    }
    return true;
};
// create a new property
let createproperty = (containerpath, propertyindex, contents) => {
    let result = findtargetstore(containerpath);
    if (result === false)
        return result;
    let { containerstore, targetstore, targetstoreindex } = result;
    if (!(targetstore[propertyindex] === undefined)) {
        console.error('store property aleady exists for create using ', containerpath, propertyindex, contents);
        return false;
    }
    // create new store to indicate modification
    targetstore = Object.assign({}, targetstore);
    containerstore[targetstoreindex] = targetstore;
    // create new property
    targetstore[propertyindex] = contents;
    publishchange(containerstore, targetstoreindex, targetstore);
    return true;
};
let deleteproperty = (containerpath, propertyindex) => {
    let result = findtargetstore(containerpath);
    if (result === false)
        return result;
    let { containerstore, targetstore, targetstoreindex } = result;
    if ((targetstore[propertyindex] === undefined)) {
        console.error('no store property found for delete using ', containerpath, propertyindex);
        return false;
    }
    // create new store to indicate modification
    targetstore = Object.assign({}, targetstore);
    containerstore[targetstoreindex] = targetstore;
    // delete property
    delete targetstore[propertyindex];
    publishchange(containerstore, targetstoreindex, targetstore);
    return true;
};
let readproperty = (containerpath, propertyindex) => {
    let result = findtargetstore(containerpath);
    if (result === false)
        return undefined;
    let { targetstore } = result;
    return targetstore[propertyindex];
};
let findtargetstore = (containerpath, themodel = Datamodel) => {
    if (!containerpath) {
        throw ('store operation requires containerpath values');
    }
    let path = assertArray(containerpath);
    let target = themodel.store;
    let container, index;
    try {
        for (index in path) {
            container = target;
            target = target[index];
        }
    }
    catch (e) {
        console.error("targetstore not found using ", containerpath);
        return false;
    }
    return { containerstore: container, targetstore: target, targetstoreindex: index };
};
class Datamodel {
    constructor() {
        this.getStore = () => {
            return this.store;
        };
        this.store = {
            data: {
                items: {},
                lists: {},
                links: {},
                schemes: {},
            },
            meta: {
                items: {},
                lists: {},
                links: {},
                schemes: {},
            },
            controls: {
                user: {},
                context: {},
            },
        };
    }
}
export default new Datamodel();
//# sourceMappingURL=datamodel.jsx.map