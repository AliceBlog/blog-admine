// App config the for development environment.

// const serverURL = 'http://ngs-children.oss-cn-shanghai.aliyuncs.com'
const vdo = "http://api.vdo.pub";
const witdor = 'http://witdor.com';
const blog = "http://b.daoapp.io";
const serverURL = (process.env.NODE_ENV === "production") ? blog : blog

const version = "v1/"
const serviceHera = "hera/"
const config = {
    debug: (process.env.NODE_ENV === "production") ? false : true,
    api: {
        user: {
            login: `${serverURL}/mgr/v1/account/login`,
            get: `${serverURL}/mgr/v1/users/view`,
            getUser: `${serverURL+serviceHera+version}account/user`,
        },
        natures: {
            geNaturesList: `${serverURL+serviceHera+version}natures/list`,
            upDateNature: `${serverURL+serviceHera+version}natures`,
        },
        order: {
            geOrderList: `${serverURL+serviceHera+version}orders/list`,
        }
    },
    deviceToken: "1",
    serverURL,
    AuthenticationToken: localStorage.getItem('token'),
    hue: ['R', 'VR', 'V', 'BV', 'B', 'GB', 'YG', 'G', 'Y', 'YR', 'BK', 'E'],
    filterType: {
        acuity: {
            name: '锐度',
            min: -20,
            max: 100,
            step: 1,
            percent: false
        },
        strength: {
            name: '强度',
            min: 0,
            max: 100,
            step: 1,
            percent: true
        }
    },
    filterForm: [{
        'name': '系统滤镜',
        'type': 'FilterTypeSystem'
    }, {
        'name': '每日滤镜',
        'type': 'FilterTypeDailyRecommendation'
    }],
    region: [{
        "ID": "110100",
        "Name": "北京市",
        "ParentId": "110000",
        "ShortName": "北京",
        "LevelType": "2",
        "CityCode": "010",
        "ZipCode": "100000",
        "MergerName": "中国,北京,北京市",
        "lng": "116.405285",
        "Lat": "39.904989",
        "Pinyin": "Beijing"
    }, {
        "ID": "310100",
        "Name": "上海市",
        "ParentId": "310000",
        "ShortName": "上海",
        "LevelType": "2",
        "CityCode": "021",
        "ZipCode": "200000",
        "MergerName": "中国,上海,上海市",
        "lng": "121.472644",
        "Lat": "31.231706",
        "Pinyin": "Shanghai"
    }, {
        "ID": "440100",
        "Name": "广州市",
        "ParentId": "440000",
        "ShortName": "广州",
        "LevelType": "2",
        "CityCode": "020",
        "ZipCode": "510032",
        "MergerName": "中国,广东省,广州市",
        "lng": "113.280637",
        "Lat": "23.125178",
        "Pinyin": "Guangzhou"
    }, {
        "ID": "320100",
        "Name": "南京市",
        "ParentId": "320000",
        "ShortName": "南京",
        "LevelType": "2",
        "CityCode": "025",
        "ZipCode": "210008",
        "MergerName": "中国,江苏省,南京市",
        "lng": "118.767413",
        "Lat": "32.041544",
        "Pinyin": "Nanjing"
    }, {
        "ID": "320500",
        "Name": "苏州市",
        "ParentId": "320000",
        "ShortName": "苏州",
        "LevelType": "2",
        "CityCode": "0512",
        "ZipCode": "215002",
        "MergerName": "中国,江苏省,苏州市",
        "lng": "120.619585",
        "Lat": "31.299379",
        "Pinyin": "Suzhou"
    }, {
        "ID": "330100",
        "Name": "杭州市",
        "ParentId": "330000",
        "ShortName": "杭州",
        "LevelType": "2",
        "CityCode": "0571",
        "ZipCode": "310026",
        "MergerName": "中国,浙江省,杭州市",
        "lng": "120.153576",
        "Lat": "30.287459",
        "Pinyin": "Hangzhou"
    }]

}

export default config