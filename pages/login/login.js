// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgUrl: "../images/register.png",
    tmpName: undefined,
    tmpPwd: undefined,
    username: "",
    password: ""
  },
  getName : function(e){
    this.setData({
      tmpName: e.detail.value
    })
  },
  getPwd : function(e){
    this.setData({
      tmpPwd: e.detail.value 
    })
  },
  setInfo : function(){
    if(this.data.tmpName && this.data.tmpPwd){
      if(this.data.tmpName == this.data.username){
        wx.showToast({
          title: '用户名重复',
        })
      }else{
        this.setData({
          username: this.data.tmpName,
          password : this.data.tmpPwd
        })
        wx.showToast({
          title: '注册成功',
          icon: 'false',
          duration: 1500,
          success : ()=>{
            this.setData({
              bgUrl : '../images/login.png'
            })
          }
        })
      }
    }else{
      wx.showToast({
        title: '请输入完整信息',
        icon: 'false'
      })
    }
  },
  submitForm : function(e){
    if (this.data.username !== undefined|| this.data.password == !undefined) {
      if (this.data.username == e.detail.value.username && this.data.password == e.detail.value.password) {
        wx.showToast({
          title: '您已登录成功',
          success: () => {
           wx.setStorage({
             key : 'username',
             data : 'this.data.username',
             success : ()=>{
               console.log('本地用户名存储成功')
             }
           });
            wx.setStorage({
              key: 'password',
              data: 'this.data.password',
              success: () => {
                console.log('本地密码存储成功')
              }
            })
            wx.switchTab({
              url: '../home/home',
            })
          }
        })
      }else {
        wx.showToast({
          title: '用户名与密码不匹配',
          icon: 'false'
        })
      }
    }else{
      wx.showToast({
        title: '请输入信息',
        icon: 'false'
      })
    }
  },
  // 判断是否有人登陆过了
  onLoad: function (options) {
    console.log(options)
    wx.getStorage({
      key: 'username',
      success: function(res) {
        console.log('有缓存')
        wx.switchTab({
          url: '../home/home',
        })
      },
    })
  }
})