// pages/chooseAddre/chooseAddre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

 toCleanOrder:function(e){
   wx.navigateBack({
     url: '../buy/buy?name=' + e.currentTarget.dataset.name + "&tel=" + e.currentTarget.dataset.tel + "&addre=" + e.currentTarget.dataset.addre + "&flag=" + true
   });
   wx.setStorage({
     key: 'name',
     data: e.currentTarget.dataset.name,
   })
   wx.setStorage({
     key: 'tel',
     data: e.currentTarget.dataset.tel,
   })
   wx.setStorage({
     key: 'addre',
     data: e.currentTarget.dataset.addre,
   })
   wx.setStorage({
     key: 'flag',
     data: true,
   })
 },
  addAddre: function () {
    wx.navigateTo({
      url: '../newaddre/newaddre',
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
              list: res.data.data,
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