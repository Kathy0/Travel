// pages/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    avatarUrl: "../images/portrait.png",
    nickName: "yourname",
    weather: "获取天气"
  },
  bindGetUserInfo : function(e){
    var nickname = e.detail.userInfo.nickName;
    var avatar = e.detail.userInfo.avatarUrl;
    this.setData({
      nickName: nickname,
      avatarUrl: avatar,
      show: false
    })
  },
  switchChange : function(e){
    // 判断点击时是否为true
    if (e.detail.value){
      // 为true调取天气接口
      wx.request({
        url: 'https://free-api.heweather.com/s6/weather/now?parameters',
        data: {
          location: "北京",
          key: "1a648085384740ed9938d10098c1dc8f"
        },
        success: (res) => {
          console.log(res)
          var location = res.data.HeWeather6[0].basic.location;
          var weather = res.data.HeWeather6[0].now.cond_txt;
          var tmp = res.data.HeWeather6[0].now.tmp;
          var wind_dir = res.data.HeWeather6[0].now.wind_dir;
          this.setData({
            weather: location + " " + weather + " " + tmp + "度" + "   " +  wind_dir
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success : (res)=>{
              var nickname = res.userInfo.nickName;
              var avatar = res.userInfo.avatarUrl;
              this.setData({
                nickname : nickname,
                avatarUrl: avatar,
                show : false
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})