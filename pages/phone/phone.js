// pages/phone/phone.js
var username = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    username = options.username;
    that.setData({
      username : username
    })
  },

  // 获取输入手机号
  phoneInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },

  //绑定
  dophone:function(){
    if (this.data.phone.length == 0 || this.data.phone.length != 11){
      wx.showToast({
        title: '请输入正确信息',
        icon: 'loading',
        duration: 2000
      })
    }else{
      wx.request({
        url: 'https://wx.nicehash.cn/api/dophone.php?telephone='+this.data.phone+'&lastname='+username,
        header: {
          'content-type': 'application/json',
        },
        success:function(res){
          if(res.data.code==400){
            wx.showToast({
              title: res.data.msg,
              icon: 'loading',
              duration: 2000
            })
          }
          if(res.data.code == 100){
            wx.setStorage({
              key: "userid",
              data: res.data.data.customer_id
            })
            wx.showToast({
              title: '绑定成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                wx.switchTab({
                  url: '../mine/mine',
                })
              }
            })
          }
        }
      })
    }
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