// pages/cart/cart.js
var userid = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: null,
    hiddenEmpty: true, 
    isAllSelect: false,
    totalMoney: 0,
    // 商品详情介绍
    carts: [],
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
    var that = this
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        that.setData({
          isAllSelect: false,
        })
        // console.log(res.data);
        that.setData({
          userid: res.data
        })
        wx.request({
          url: 'https://wx.nicehash.cn/api/cart.php?userid='+res.data,
          header: {
            'content-type': 'application/json',
          },
          success:function(res){
            that.setData({
              carts: res.data.data,
              totalMoney:0
            })
          }
        })
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
            }else{
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
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.carts.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      carts: this.data.carts
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.carts.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      carts: that.data.carts
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  del:function(e){
    var that =  this;
    var cid = e.currentTarget.dataset.typeid;
    wx.request({
      url: 'https://wx.nicehash.cn/api/delcart.php?cid=' + cid,
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        that.onShow();
      }
    })
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

  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0, i = 0;
    var id = e.target.dataset.id,
    
      index = parseInt(e.target.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;
    //价钱统计
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + (this.data.carts[index].price * this.data.carts[index].count);
    }
    else {
      this.data.totalMoney = this.data.totalMoney - (this.data.carts[index].price * this.data.carts[index].count);
    }
    //是否全选判断
    for (i = 0; i < this.data.carts.length; i++) {
      Allprice = Allprice + (this.data.carts[index].price * this.data.carts[index].count);
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    }
    else {
      this.data.isAllSelect = false;
    }
    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
  },
  allSelect: function (e) {
    //处理全选逻辑
    var i = 0;
    if (!this.data.isAllSelect) {
      this.data.totalMoney = 0;
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + (this.data.carts[i].price * this.data.carts[i].count);

      }
    }
    else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })
  },
  delCount: function (e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了加一");
    var count = this.data.carts[index].count;
    // 商品总数量-1
    // if (count > 1) {
    //   this.data.carts[index].count--;
    // }
    if (count <= 1) {
      return false;
    }else{
      this.data.carts[index].count--;
    }
    // 将数值与状态写回  
    this.setData({
      carts: this.data.carts
    });
    console.log("carts:" + this.data.carts);
    this.priceCount();
  },
  addCount: function (e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了加+");
    var count = this.data.carts[index].count;
    // count = count + 1;
    // 商品总数量+1  
    // if (count < 10) {
      this.data.carts[index].count++;
    // }
    // 将数值与状态写回  
    this.setData({
      carts: this.data.carts
    });
    console.log("carts:" + this.data.carts);
    this.priceCount();
  },

  priceCount: function (e) {
    this.data.totalMoney = 0;
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].isSelect == true) {
        this.data.totalMoney = this.data.totalMoney + (this.data.carts[i].price * this.data.carts[i].count);
      }

    }
    this.setData({
      totalMoney: this.data.totalMoney,
    })
  },
  toBuy() {
    var carts = this.data.carts;
  
    var cart = [];
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].isSelect == true) {
        cart.push(carts[i])   //获取选中的项
      }
    }
    console.log(cart);
    if(cart.length==0){
      wx.showToast({
         title: '请选择商品',
         icon: 'success',
         duration: 3000
      });
    }else{
      wx.navigateTo({
        url: '../buy/buy?goods=' + JSON.stringify(cart) + '&money=' + this.data.totalMoney,
      })
    }
   
  //   wx.showToast({
  //     title: '去结算',
  //     icon: 'success',
  //     duration: 3000
  //   });
  //   this.setData({
  //     showDialog: !this.data.showDialog
  //   });
  //   console.log(this.data.carts);
  },
  buy:function(){
    // console.log(1111);
    wx.switchTab({ url: '../home/home'})
  },
  catchTapCategory: function (e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.typeid;
    console.log('goodsId:' + goodsId);
    //跳转商品详情
    wx.navigateTo({ url: '../detail/detail?goodsId=' + goodsId })
  },
  
 
})