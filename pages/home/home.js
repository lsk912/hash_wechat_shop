// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: null,
    navbar: ['护肤', '彩妆', '香水', '个人护理'],
    currentTab: 0,
    value: 1,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    newgoods_head_url: "http://mz.djmall.xmisp.cn/files/banner/20161202/148066062976.jpg",
    // 新品上架
    goodsItems: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //banner
    that.bannerShow();
    that.newGoods();
  },
  //首页banner
  bannerShow: function (success) {
    var that = this;
    wx.request({
      url: 'https://wx.nicehash.cn/api/banner.php',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        //  console.log(res.data.data);
        that.setData({
          banners: res.data.data
        })
      }
    })
  },
  //最新商品
  newGoods: function (success) {
    var that = this;
    wx.request({
      url: 'https://wx.nicehash.cn/api/newgoods.php',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          goodsItems: res.data.data
        })
      }
    })
  },
  catchTapCategory: function (e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.typeid;
    console.log('goodsId:' + goodsId);
    //跳转商品详情
    wx.navigateTo({ url: '../detail/detail?goodsId=' + goodsId })
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
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){
     that.onLoad();
    wx.hideNavigationBarLoading();
    },2000)
    
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    wx.request({
      url: 'https://wx.nicehash.cn/api/specialgoods.php',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res);
        setTimeout(() => {
          that.setData({
            isHideLoadMore: true,
            goodsWelfareItems: res.data.data
          })
        }, 500)

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})