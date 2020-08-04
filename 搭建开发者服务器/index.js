const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
app.use(bodyParser.json())
const wx = {
	appid:' ' , //需要填写开发者的APPID
	secret:' ' //需要填写开发者的APPSecret
}
var db = {
	session : { },
	user : { }
}
app.post('/login',(req,res) => {
	console.log('login code: ' + req.body.code)
	var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wx.appid + '&secret=' + wx.secret + '&js_code=' +req.body.code + '&grant_type=authorization_code'
	request(url, (err,response, body) => {
	console.log('session:' +body)
	var session = JSON.parse(body)
	if (session.openid) {
	var token = 'token_' + new Date().getTime()
	db.session[token] = session
	if (!db.user[session.openid]) {
		db.user [session.openid] = {credit: 100 }
		}
	res.json ({token:token})
	}
	})
})
app.get('/credit',(req,res) => {
	var session = db.session[req.query.token]
	if (session && db.user [session.openid]) {
	res.json ({credit: db.user[session.openid].credit})
	}else{
	res.json ({err:'用户不存在，或未登录。'})
	}
})
app.get('/checklogin',(req,res) => {
	var session = db.session[req.query.token]
	console.log('checklogin:',session)
	res.json({is_login:session !== undefined })
})
app.listen(3000, () => {
	console.log ('server running at http://127.0.0.1:3000')
})