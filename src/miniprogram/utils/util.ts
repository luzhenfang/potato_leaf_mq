export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}


export const animates =  {
  flash: (owner: any, selector: string): void => {
    owner.animate(selector, [
      { opacity: 0 },
      { opacity: 0.6 },
      { opacity: 0.3 },
      { opacity: 1.0 }
    ], 100);
  },

  // 收缩
  closeButtons: (owner: any) => {
    owner.animate('.floating-button #btnOpen', [
      { rotate: 180 },
      { rotate: 0, },
    ], 300, () => {
      owner.animate('.floating-button #btnOpen', [
        { translateY: 0 },
        { translateX: -2 ,ease:'ease'},
        { translateX: 2 ,ease:'ease'},
        { translateY: -2,ease:'ease' },
        { translateX: 0 },
        { translateY: 0 }
      ], 200)
    })

    owner.animate('.floating-button #btnGallery', [
      { translate: [0, 0] },
      { translate: [61, 60], ease: 'ease' },
      { opacity: 0 }
    ], 500);

    owner.animate('.floating-button #btnCamera', [
      { translate: [0, 0] },
      { translate: [-61, 60], ease: 'ease' },
      { opacity: 0 }
    ], 500,()=>{
    });

  },
   // 展开
   openButtons: (owner: any) => {
    owner.animate('.floating-button #btnOpen', [
      { rotate: 0 },
      { rotate: 180 },
    ], 500)

    owner.animate('.floating-button #btnGallery', [
      { opacity: 0 },
      { translate: [61, 60], ease: 'ease-in-out' },
      { translate: [0, 0] },
      { opacity: 1.0 }
    ], 200, () => {
      owner.animate('.floating-button #btnGallery', [
        { rotate: 0 },
        {rotate:200},
        { rotate: 315 },
      ], 500)
    });

    owner.animate('.floating-button #btnCamera', [
      { opacity: 0 },
      { translate: [-61, 60], ease: 'ease-in-out' },
      { translate: [0, 0] },
      { opacity: 1.0 },
    ], 200, () => {
      owner.animate('.floating-button #btnCamera', [
        { rotate: 0 },
        {rotate:90},
        { rotate: 45 },
      ], 500)
      owner.setData({
        version:--owner.data.version
      })
    });
  }
};
