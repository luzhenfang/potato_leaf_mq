// pages/home/home.ts

import { animates } from '../../utils/util';
import Color from './resultcolor';
// 结果集映射
interface Result {
  code: number,
  msg: string
  type: string,
  conf: string,
}



Page({
  data: {
    isOpen: false as boolean,
    src: "" as string,
    res: {} as Result,
    color:"" as string,
  },
  takePhoto() {

    // wx.navigateTo({
    //   url:"/pages/photo/photo"
    // })

    wx.chooseMedia({
      count: 1,
      sourceType: ['camera'],
      mediaType: ['image'],
      success: (res: any) => {
        let tempSrc: string = res.tempFiles[0].tempFilePath as unknown as string;
        this.setData({
          src: tempSrc
        })
        this.predict();
      }
    })


  },

  // 预测 内容
  predict() {
    wx.showToast({
      title: "推理中",
      icon: "loading"
    })
    if (!this.data.src) {
      return
    }

    wx.uploadFile({
      url: 'https://potato.lzfblog.cn:8080/predict', //仅为示例，非真实的接口地址
      filePath: this.data.src,
      name: 'file',
      // formData: {
      //   'user': 'test'
      // },
      success: (res: any) => {
        console.log(res);
        const data: Result = JSON.parse(res.data) as Result;
        this.setData({
          res: data,
        })

        let map:Map<string,any> = new Map();
        map
          .set("健康",()=>{
            return Color.ResultColor.NORMAL;
          })
          .set("早疫病",()=>{
            return Color.ResultColor.EARELY;
          })
          .set("晚疫病",()=>{
            return Color.ResultColor.LATELY;
          })
        if(map.has(data.type)){
          this.setData({
            color:map.get(data.type)(),
          })
        }


        wx.hideToast();
      },
      fail: (err: any) => {
        wx.showToast({
          title: "请求服务器失败",
        })
        // 错误日志
        wx.showModal({
          title: "log",
          content: err.errMsg,
          showCancel: false,
        })
      }
    })
  },
  // 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      sourceType: ['album'],
      mediaType: ['image'],
      success: (res: any) => {
        let tempSrc: string = res.tempFiles[0].tempFilePath as unknown as string;
        this.setData({
          src: tempSrc
        })
        this.predict();
      }
    })
  },
  open(_: any) {
    if (this.data.isOpen) {
      animates.closeButtons(this);
    } else {
      animates.openButtons(this);
    }
    this.setData({
        isOpen: !this.data.isOpen
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    animates.closeButtons(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})