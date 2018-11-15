var currtab = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alreadyOrder:[],
    waitPayOrder:[],
    lostOrder:[],
    completeOrder:[],
    swipertab: [{ name: '全部', index: 0 }, { name: '待付款', index: 1 }, { name: '待收货', index: 2 }, { name: '已收货', index: 3}],
    clientHeight:null,
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options){
      currtab = options.currtab;
      that.setData({
        currtab: currtab
      })
    }else{
      wx.getStorage({
        key: 'currtab',
        success: function(res) {
          that.setData({
            currtab: res.data
          })
        },
      })
    } 
    
    console.log(this.data.currtab)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    that.onReady();
  },
  orderdetail:function(e){
    var that = this;
    var oid = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../orderdetail/orderdetail?oid='+oid,
    })
  },
  returnorder:function(e){
    var that = this;
    wx.setStorage({
      key: 'currtab',
      data: that.data.currtab,
    })
    var oid = e.currentTarget.dataset.type;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: 'https://wx.nicehash.cn/api/returnorder.php?oid=' + oid+'&uid='+res.data,
          success: function (res) {
            if (res.data.code == 400) {
              // 这里修改成跳转的页面
              wx.showToast({
                title: res.data.msg,
                icon: 'loading',
                duration: 2000
              })
            }
            if (res.data.code == 100) {
              // 这里修改成跳转的页面
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 2000
              })
              that.onLoad()
            }
          }
        })
      },
    })
    
  },
  ordersure:function(e){
    var that = this;
    wx.setStorage({
      key: 'currtab',
      data: that.data.currtab,
    })
    var oid = e.currentTarget.dataset.type;
    wx.request({
      url: 'https://wx.nicehash.cn/api/sureorder.php?oid='+oid,
      success:function(res){
        if (res.data.code == 400) {
          // 这里修改成跳转的页面
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 2000
          })
        }
        if (res.data.code == 100) {
          // 这里修改成跳转的页面
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          that.onLoad()
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    // this.getDeviceInfo()
    this.orderShow()
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },

  orderShow: function () {
   var that = this;
   console.log(this.data.currtab);
    if(this.data.currtab == 0){
      that.alreadyShow()
    } else if(this.data.currtab ==1){
      that.waitPayShow()
    }else if(this.data.currtab == 2){
      that.lostShow()
    }else if(this.data.currtab == 3){
      that.completeShow();
    }
  },
  alreadyShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: 'https://wx.nicehash.cn/api/allorder.php?userid=' + res.data,
          success: function (res) {
            console.log(res.data.data);
            that.setData({
              alreadyOrder: res.data.data
            })
          }
        })
      },
    })
  },

  waitPayShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.request({
          url: 'https://wx.nicehash.cn/api/waitpay.php?userid='+res.data,
          success:function(res){
            that.setData({
              waitPayOrder:res.data.data
            })
          }
        })
      },
    })
  },

  lostShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: 'https://wx.nicehash.cn/api/shipped.php?userid=' + res.data,
          success: function (res) {
            that.setData({
              lostOrder: res.data.data
            })
          }
        })
      },
    })
  },
  completeShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        wx.request({
          url: 'https://wx.nicehash.cn/api/complete.php?userid=' + res.data,
          success: function (res) {
            that.setData({
              completeOrder: res.data.data
            })
          }
        })
      },
    })
  },
})