// pages/reg/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    email:'',
    name:'',
    password: ''
  },

  // 获取输入账号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取输入邮箱
  emailInput:function (e){
    this.setData({
      email: e.detail.value
    })
  },
  // 获取输入密码
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  reg: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0 || this.data.email.length == 0 || this.data.name.length == 0) {
      wx.showToast({
        title: '请输入正确信息',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'http://localhost/api/reg.php?telephone=' + this.data.phone + '&password=' + this.data.password + '&email=' + this.data.email + '&firstname=' + this.data.name,
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          console.log(res.data.code);
          if (res.data.code == 400) {
            // 这里修改成跳转的页面
            wx.showToast({
              title: res.data.msg,
              icon: 'loading',
              duration: 2000
            })
          }
          if (res.data.code == 100) {
            wx.setStorage({
              key: "userinfo",
              data: res.data.data
            })
            wx.showToast({
              title: '注册成功',
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