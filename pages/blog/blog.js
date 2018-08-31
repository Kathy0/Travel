// pages/blog/blog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: "",
    upImg: false,
    location: "所在位置",
    show: true
  },
  addImg : function (){
    // 选择图片
    wx.chooseImage({
      success: (res) => {
        // 存储路径
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          picUrl: tempFilePaths[0],
          // 增加一个data属性来存储数组
          temPath: tempFilePaths,
          upImg : true
        });
        // 上传图片
        // wx.uploadFile({
        //   // 地址需要我们自己配
        //   url: '',
        //   filePath: tempFilePaths[0],
        //   name: 'image',
        //   success: (res) => {
        //     //console.log(res);
        //   }
        // })
      },
    })
  },
  getLocation : function(){
    wx.getSetting({
      success : (res)=>{
        // 判断用户是否授权
        if(!res.authSetting['scope.userLocation']){
          // 授权获取用户地址
          wx.authorize({
            scope: 'scope.userLocation',
            success : (res)=>{
              // 选择地址
              wx.chooseLocation({
                success : (res)=>{
                  // 更改data中的数据
                  this.setData({
                    location : res.name
                  })
                }
              })
            }
          })
        }else{
          // 如已经授权直接选择地址
          wx.chooseLocation({
            success: (res) => {
              this.setData({
                location: res.name
              })
            }
          })
        }
      }
    })
  },
  formSubmit : function(e){
    console.log(e)
    var now = new Date();
    var month = now.getMonth();
    var date = now.getDate();
    this.setData({
      blog: e.detail.value.blog,
      month: month,
      date: date,
      show: false
    })
  },
  previewImg : function(){
    wx.previewImage({
      urls: this.data.temPath
    })
  },
  saveImg: function () {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.picUrl,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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