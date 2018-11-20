// pages/detail/detail.js
var goodsId = null;
var typeid = null;
var userid = null;
var isLike = null;
var carts = {};
var count = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    goods:[],
    userid:'',
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
  },

  previewImage: function (e) {
    var current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    goodsId = options.goodsId;
    that.setData({
      goodsId: goodsId
    })
    that.goodDetail();
    that.goodImage();
    that.isLike();
  },
//获取商品详情
goodDetail:function(success){
  var that = this;
  wx.request({
    url: 'https://wx.nicehash.cn/api/goodsdetail.php?good_id=' + goodsId,
    header: {
      'content-type': 'application/json',
    },
    success: function (res) {
      // console.log(res.data.data);
      that.setData({
        goods: res.data.data
      })
    }
  })
},
//获取用户是否收藏
isLike:function(){
  var that = this;
  wx.getStorage({
    key: 'userid',
    success: function(res) {
      wx.request({
        url: 'https://wx.nicehash.cn/api/islike.php?userid=' + res.data+'&gid='+goodsId,
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            isLike:res.data.data
          })
        }
      })
    },
  })
},
//获取商品图
goodImage:function(success){
  var that = this;
  wx.request({
    url: 'https://wx.nicehash.cn/api/goodsimage.php?good_id='+goodsId,
    header: {
      'content-type': 'application/json',
    },
    success: function (res) {
      console.log(res.data.data);
      that.setData({
        imgUrls: res.data.data
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
        console.log(res.data);
        that.setData({
          userid:res.data
        })
        wx.request({
          url: 'https://wx.nicehash.cn/api/cartcount.php?userid=' + res.data,
          header: {
            'content-type': 'application/json',
          },
          success: function (res) {
            that.setData({
              count:res.data.data
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

  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 收藏
  addLike:function(e) {
    var that = this;
    typeid = e.currentTarget.dataset.typeid;
    userid = e.currentTarget.dataset.userid;
    console.log(userid);
    console.log(typeid);
    if(userid){
      this.setData({
        isLike: !this.data.isLike
      });
      wx.request({
        url: 'https://wx.nicehash.cn/api/like.php?good_id=' + goodsId + '&userid=' + userid + '&typeid='+typeid,
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
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
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '请登录',
        icon: 'success',
        duration: 2000
      });
    }
    
  },
  // 立即购买
  immeBuy:function(e) {
    userid = e.currentTarget.dataset.userid;
    var goodid = this.data.goodsId;
    if(userid){
      wx.request({
        url: 'https://wx.nicehash.cn/api/buyone.php?goodid='+goodid,
        success:function(res){
          var carts = [res.data.data];
          console.log(carts);
            wx.navigateTo({
            url: '../buy/buy?goods=' + JSON.stringify(carts)+'&money='+res.data.data.price,
          })
        }
      })
      
    }else{
      wx.showToast({
        title: '请登录',
        icon: 'success',
        duration: 2000
      });
    }
    
  },
  /**
    * sku 弹出
    */
  toggleDialog: function (e) {
    var that = this
    userid = e.currentTarget.dataset.userid;
    console.log(userid);
    console.log(goodsId);
    if(userid){
      wx.request({
        url: 'https://wx.nicehash.cn/api/addcart.php?good_id='+goodsId+'&userid='+userid,
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
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
            })
            that.onShow()
          }
        }
      })
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        duration: 2000
      });
    }else{
      wx.showToast({
        title: '请登录',
        icon: 'success',
        duration: 2000
      });
    }
   
  },
})