// pages/list/list.js
var category_id=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsWelfareItems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    category_id = options.id;
    wx.request({
      url: 'https://wx.nicehash.cn/api/goodsclass.php?id='+category_id,
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          goodsWelfareItems: res.data.data
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

  },
  //下拉刷新
  // onPullDownRefresh: function () {
  //   wx.showNavigationBarLoading() //在标题栏中显示加载

  //   //模拟加载
  //   setTimeout(function () {
  //     // complete
  //     wx.hideNavigationBarLoading() //完成停止加载
  //     wx.stopPullDownRefresh() //停止下拉刷新
  //   }, 1500);
  // },
  catchTapCategory: function (e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.typeid;
    console.log('goodsId:' + goodsId);
    //跳转商品详情
    wx.navigateTo({ url: '../detail/detail?goodsId=' + goodsId })
  },
})