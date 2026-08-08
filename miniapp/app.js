App({
  onLaunch() {
    // restore session
    const saved = wx.getStorageSync('liuyao_auth');
    if (saved) {
      this.globalData.currentUser = saved;
    }
  },
  globalData: {
    currentUser: null
  }
});