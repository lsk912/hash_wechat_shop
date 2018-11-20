// pages/mine/mine.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderItems: [
      {
        typeId: 1,
        name: '待付款',
        url: 'bill',
        imageurl: '../../images/person/personal_pay.png',
      },
      {
        typeId: 2,
        name: '待收货',
        url: 'bill',
        imageurl: '../../images/person/personal_receipt.png',
      },
      {
        typeId: 3,
        name: '已收货',
        url: 'bill',
        imageurl: '../../images/person/personal_comment.png'
      },
      {
        typeId: 4,
        name: '退换/售后',
        url: 'bill',
        imageurl: '../../images/person/personal_service.png'
      }
    ],
  },
  //事件处理函数
  toOrder: function (e) {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        var typeid = e.currentTarget.dataset.typeid;
        if (!typeid) {
          typeid = 0;
        }
        if( typeid== 4){
          wx.navigateTo({
            url: '../return/return',
          })
        }else{
          wx.navigateTo({ url: '../order/order?currtab=' + typeid });
        }
      },
    })
  },
  //我的收藏
  myLike:function(e){
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.navigateTo({
          url: '../mylike/mylike?userid='+res.data,
        })
      },
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(1);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
 //跳转登录页面
  // getUserInfo(){
  //   wx.navigateTo({
  //     url: '../log/log',
  //   })
  // },
  loginout: function () {
    this.setData({
      userInfo:null,
      hasUserInfo: true
    })
      wx.reLaunch({
        url: '../home/home',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.redirectTo({ url: '../phone/phone?username=' + e.detail.userInfo.nickName });
  },

  bindViewTap(e){
    var userid = e.currentTarget.dataset.userid;
    // console.log(userid);
    wx.navigateTo({ url: '../myinfo/myinfo?userid=' + userid });
  },

  myAddress: function (e) {
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.navigateTo({ url: '../addresslist/addresslist' });
      },
    })
  
  },

  onShow:function(){
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
            wx.setTabBarBadge({
              index: 2,
              text: "" + res.data.data + "",
            })
          }
        })
      },
    })
  },

  ceshi: function () {
    console.log(11);
    wx.navigateTo({ url: '../ceshi/ceshi' });
  }
})
