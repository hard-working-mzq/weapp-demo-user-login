//index.js
//获取应用实例
const app = getApp()

Page({
  // credit:function() {
  //   wx.request({
  //     url: 'http://127.0.0.1:3000/credit',
  //     data: { token:app.globalData.token },
  //     success:res=>{
  //       console.log(res.data)
  //     }
  //   })
  // },
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  getUserInfo:function(e){
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      this.setData ({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  sendUserInfo: function() {
    var token = app.globalData.token
    wx.getUserInfo({
      success: res=> {
        wx.request({
          url: 'http://127.0.0.1:3000/userinfo?token=' + token,
          method:'POST',
          data:{
            rawData:res.rawData,
            singnature: res.singnature,
            encrytedData:res.encryptedData,
            iv: res.iv
          }
        })
      }
    })
  }
})
