export function resolveArguement(arr) {
    let resultObj = {};
    for (let i = 0; i < arr.length; i++) {
        let splitArr = arr[i].split(':');
        let value = '';
        splitArr.map((v, i) => {
            if (i != 0 && splitArr.length > 2) {
                value += (v + (i != splitArr.length - 1 ? ':' : ''))
            }
        })
        if (splitArr[0] == 'endTime' && value != '') {
            value = setEndTime(value) //选择同一天时，设置endtime为24点
        }
        resultObj[splitArr[0]] = value != '' ? value : splitArr[1];
    }

    return resultObj
}
export function setEndTime(time) {
    let date = time.split('T')[0],
        t = time.split('T')[1].split('+');
    return date + 'T' + '23:59:59+' + t[1]
}

export function splitArgue(arr) {
    let resultObj = {};
    for (let key in arr) {
        console.log()
        if (typeof(arr[key]) == 'string') {
            let splitArr = arr[key].split('=');
            resultObj[splitArr[0]] = splitArr[1];
        }
    }
    return resultObj
}