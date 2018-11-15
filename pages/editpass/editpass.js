// pages/editpass/editpass.js
var userid = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpass:'',
    newpass:''
  },
  //获取输入旧密码
  oldpass: function (e) {
    this.setData({
      oldpass : e.detail.value
    })
  },
  newpass:function(e){
    this.setData({
      newpass : e.detail.value
    })
  },

  dopass:function(){
    if (this.data.oldpass.length == 0 || this.data.newpass.length == 0 ) {
      wx.showToast({
        title: '请输入正确信息',
        icon: 'loading',
        duration: 2000
      })
    } else{
      wx.request({
        url: 'http://localhost/api/dopass.php?oldpass=' + this.data.oldpass + '&newpass=' + this.data.newpass + '&userid=' + userid,
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
            wx.showToast({
              title: '修改成功',
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
    userid = options.userid;
    this.setData({
      userid:userid
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