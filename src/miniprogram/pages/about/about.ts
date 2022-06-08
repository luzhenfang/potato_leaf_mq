// pages/about/about.ts

import content from './res';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renderList:[] as Array<Object>,
    textArray:[] as Array<Object>,
  },

  /**
   * 生命周期函数--监听页面加载
   */

   parseTitle(line:string){
     let gammar =  line.split(" ");
     if(gammar[0]=="#"){
       return ["h1",gammar[1]]      
     }
     if(gammar[0]=="##"){
       return ["h2",gammar[1]]   
     }
     if(gammar[0]=="###"){
       return ['h3',gammar[1]]   
     }
     return ['',line];
   },
   parseImage(line:string){
     let prefix = line.substr(0,2);
     if(prefix=="!["){
      const regex = /\((.*?)\)/gm;
      let m:any;
      m = regex.exec(line);
      let url:string = m[1] as unknown as string;
      return ['img',url];
     }
     return ['',line];
   },

  onLoad() {
    let temp:any = content.content;
    console.log(temp);
    
    let tempArray:Array<String> = temp.split("\n");
    tempArray.forEach((e:any)=>{
      let [first,second] = this.parseTitle(e);
      console.log(first,second);
      if(first.length!=0){
        this.data.textArray.push([first,second]);
      }else{
        let [tag,url] = this.parseImage(e);
        if(tag.length!=0){
          this.data.textArray.push([tag,url]);
        }else{
          this.data.textArray.push(['p',e]);
        }
      }
    })
    this.setData({
      renderList:[...this.data.textArray],
    })
  },
})