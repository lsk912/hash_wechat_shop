// pages/addresslist/addresslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    addressList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // wx.getStorage({
    //   key: 'userid',
    //   success: function (res) {
    //     wx.request({
    //       url: 'https://wx.nicehash.cn/api/addresslist.php?userid=' + res.data,
    //       header: {
    //         'content-type': 'application/json',
    //       },
    //       success:function(res){
    //         that.setData({
    //           addressList: res.data.data
    //         })
    //       }
    //     })
    //   },
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  addAddress: function () {
    wx.navigateTo({ url: '../adress/adress' });
  },
  delAddress:function(e){
    var that = this;
    var address_id = e.currentTarget.dataset.address;
    wx.request({
      url: 'https://wx.nicehash.cn/api/deladdress.php?address_id='+address_id,
      success:function(res){
        if (res.data.code == 400) {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 2000
          })
        }
        if (res.data.code == 100) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000,
            success: function () {
             that.onShow()
            }
          })
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: 'https://wx.nicehash.cn/api/addresslist.php?userid=' + res.data,
          header: {
            'content-type': 'application/json',
          },
          success: function (res) {
            that.setData({
              addressList: res.data.data
            })
          }
        })
      },
    })
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