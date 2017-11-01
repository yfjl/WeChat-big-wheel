var app = getApp()
Page({
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    lottoCount:4,    //抽奖次数 
    awardIndex:0    //获取奖品的索引值
  },

  getLottery: function () {
    var that = this;
    this.setData({
      btnDisabled:"disabled",
      lottoCount: --this.data.lottoCount ,
      awardIndex: Math.floor(Math.random() * 6)
    })

    var awardIndex = this.data.awardIndex;
    
    console.log(":::", awardIndex)

    var awardsConfig = app.awardsConfig,
        runNum = 8;

    // 旋转抽奖
    app.runDegs = app.runDegs || 0
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))
    var animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(app.runDegs).step()
    that.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    })
    // 中奖提示
    setTimeout(function() {
      wx.showModal({
        title: '恭喜',
        content: '获得' + (awardsConfig.awards[awardIndex].name),
        showCancel: false
      })

      console.log(that.data.btnDisabled)
      if (that.data.lottoCount>0){
        that.setData({
          btnDisabled: ""
        })
      }else{
        that.setData({
          btnDisabled: "disabled"
        })
      }
      
    }, 4000);
    
  },
  onReady: function (e) {

    var that = this;
    app.awardsConfig = {
      awards:[
        {'index': 0, 'name': '8.8元红包'},
        {'index': 1, 'name': '3元红包'},
        { 'index': 2, 'name':'4元红包'},
        { 'index': 3, 'name': '5元红包'},
        { 'index': 4, 'name': '88元红包'},
        { 'index': 5, 'name': '188元红包'}
      ]
    }
    
    // 绘制转盘
    var awardsConfig = app.awardsConfig.awards,
        len = awardsConfig.length,
        rotateDeg = 360 / len / 2 + 90,  //120
        html = [],
        turnNum = 1 / len;  // 文字旋转 turn 值
    for (var i = 0; i < len; i++) {
      // 奖项列表
      html.push({turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name});    
    }
    that.setData({
        awardsList: html
    });


  }

})
