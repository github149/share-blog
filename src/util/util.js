function dealDate(dateStr) {
    let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
    let space = new Date() - (+dateObj)
    let str = ''
    switch (true) {
        //小于1分钟
        case space < 60000:
            str = "刚刚";
            break;
            //小于1小时
        case space < 1000 * 3600:
            str = Math.floor(space / (1000 * 6000)) + '分钟前'
            break;
            //小于1天
        case space < 1000 * 3600 * 24:
            str = Math.floor(space / (1000 * 3600)) + '小时前'
            break;
        default:
            str = Math.floor(space / (1000 * 3600 * 24)) + '天前'

    }
    return str
}

function getTime(str) {
    let date = typeof str === 'string' ? new Date(str) : str

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
}


export default {
    install(Vue) {
        Vue.prototype.dealDate = dealDate
        Vue.prototype.getTime = getTime
    }
}