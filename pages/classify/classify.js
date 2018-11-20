// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems:[],
    curNav: 187,
    curIndex: 0
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.classShow();
  },

  classShow:function(success){
    var that = this;
    wx.request({
      url: 'https://wx.nicehash.cn/api/classify.php',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
         console.log(res.data.data);
        that.setData({
          cateItems: res.data.data
        })
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
    var that = this
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: 'https://wx.nicehash.cn/api/cartcount.php?userid=' + res.data,
          header: {
            'content-type': 'application/json',
          },
          success: function (res) {
            console.log(res.data.data)
            if (res.data.data != 0) {
              wx.setTabBarBadge({
                index: 2,
                text: "" + res.data.data + "",
              })
            } else {
              wx.removeTabBarBadge({
                index: 2,
              })
            }
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