export function isEmptyObj(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export function isArrWithContent(arr) {
    return (Array.isArray(arr) && arr.length > 0);
}

export function sumObjFieldByArr(arrObjs, fieldName){
    let result = 0;

    if (isArrWithContent(arrObjs)){
        let initialValue = 0;
        result = arrObjs.reduce(function (accumulator, elem) {
            if (elem[fieldName] != undefined && !isNaN(elem[fieldName])){
                return accumulator + elem[fieldName];
            }
            else{
                return accumulator;
            }
        }, initialValue)
    }

    return result;
}