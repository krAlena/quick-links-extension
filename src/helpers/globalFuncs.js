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

export function getDateTimeInStrFormat(dateTimeStr){
    var dateTimeStrInNeedFormat = "";
    if (dateTimeStr != null){
        var dateTime = new Date(dateTimeStr);
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct", "Nov", "Dec"];
        var day = dateTime.getDate();
        var monthIndex = dateTime.getMonth();
        var year = dateTime.getFullYear();
        var hours = dateTime.getHours();
        hours = ("00" + hours ).slice(-2);

        var mins = dateTime.getMinutes();
        mins = ("00" + mins ).slice(-2);
        //dateTimeStrInNeedFormat = day + ' ' + monthNames[monthIndex] + ' ' + year;
        //monthIndex = (monthIndex + 1);
        //var monthNumber = ("00" + monthIndex).slice(-2);

        //dateTimeStrInNeedFormat = year + '-' + monthNumber + '-' + day;
        dateTimeStrInNeedFormat = monthNames[monthIndex] + ' ' + day + ' ' +  year + ' ' + hours + ':' + mins;                    

    }
    return dateTimeStrInNeedFormat;
}

export function getDateFromTimestamp(timestamp){
    var utcSeconds = timestamp;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    var datePayment = new Date(d);
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct", "Nov", "Dec"];
    var day = datePayment.getDate();
    var monthIndex = datePayment.getMonth();
    var year = datePayment.getFullYear();
    monthIndex = (monthIndex + 1);
    var paymentDateInNeedFormat = monthIndex + "/" + day + "/" + year;

    return paymentDateInNeedFormat;
}