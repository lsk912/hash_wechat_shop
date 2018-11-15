// pages/myinfo/myinfo.js
var userid = null;
var userinfo = null;
// var telephone = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstname:'',
    telephone: '',
    email:''
  },
  // 获取输入手机号
  phoneInput: function (e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  // 获取输入手机号
  nameInput: function (e) {
    this.setData({
      firstname: e.detail.value
    })
  },
  // 获取输入手机号
  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },

  editinfo:function(){
    console.log(this.data.telephone);
    if (this.data.telephone.length == 0 ||  this.data.email.length == 0 || this.data.firstname.length == 0) {
      wx.showToast({
        title: '请输入正确信息',
        icon: 'loading',
        duration: 2000
      })
    } else{
      wx.request({
        url: 'http://localhost/api/editinfo.php?telephone=' + this.data.telephone + '&email=' + this.data.email + '&firstname=' + this.data.firstname+'&userid='+userid,
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
            wx.setStorage({
              key: "userinfo",
              data: res.data.data
            })
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
  loginout:function(){
    wx.removeStorage({
      key: 'userinfo',
      success: function(res) {
        wx.reLaunch({
          url: '../mine/mine',
        })
      },
    })
  },
  editpass:function(){
    wx.navigateTo({
      url: '../editpass/editpass?userid='+userid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    userid = options.userid;
    that.setData({
      userid: userid
    }) 
    that.myInfo();
  },
  myInfo:function(success){
    var that = this;
    wx.request({
      url: 'http://localhost/api/info.php?userid=' + userid,
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        // console.log(res.data.data[0].telephone);
        that.setData({
          userinfo: res.data.data[0],
          // telephone:res.data.data[0].telephone,
          // email: res.data.data[0].email,
          // firstname: res.data.data[0].firstname,
        })
      }
    })
    // console.log(telephone);
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
      key: 'userinfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          telephone:res.data.telephone,
          firstname:res.data.firstname,
          email:res.data.email
        })
      }
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