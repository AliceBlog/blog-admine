// App config the for development environment.

// const serverURL = 'http://ngs-children.oss-cn-shanghai.aliyuncs.com'

const serverURL = (process.env.NODE_ENV === "production") ?'http://api.tusoapp.com/':'http://api.dev.tusoapp.com:9000/'

const version="v1/"
const serviceHera="hera/"
const config = {
	debug: (process.env.NODE_ENV === "production") ? false : true,
	api: {
		user: {
			login: `${serverURL+serviceHera+version}account/login`,
		  get:`${serverURL+serviceHera+version}account/user_by_ids`,
			getUser:`${serverURL+serviceHera+version}account/user`,
		},
		natures:{
			geNaturesList: `${serverURL+serviceHera+version}natures/list`,
			upDateNature: `${serverURL+serviceHera+version}natures`,
		},
		order:{
			geOrderList: `${serverURL+serviceHera+version}orders/list`,
		}
	},
	deviceToken: "1",
	serverURL,
	AuthenticationToken:"y49bBHx4nOw7m6WWidjM28aGALfbEoo0",
	hue:['R','VR','V','BV','B','GB','YG','G','Y','YR','BK','E'],
	filterType:{
		acuity:{
			name:'锐度',
			min:-20,
			max:100,
			step:1,
			percent:false
		},
		strength:{
			name:'强度',
			min:0,
			max:100,
			step:1,
			percent:true
		}
	}
}

export default config
