import Promise from './promise.js';

var Defer = function () {
  this.promise = new Promise();
};

Defer.prototype = {
  promise: null,
  resolve: function (data) {
    //goi den ham callback dang duoc luu trong promise thuoc ve defer nay
    //truyen vao tham so la tham truyen vao ham resolve
    //cap nhat trang thai cua promise do
    var promise = this.promise;
    promise.data = data;
    promise.status = 'resolved';
    promise.okCallbacks.forEach(function(callbackData) {
      promise.executeCallback(callbackData, data);
    });
  },

  reject: function (error) {
    var promise = this.promise;
    promise.error = error;
    promise.status = 'rejected';
    promise.koCallbacks.forEach(function(callbackData) {
      promise.executeCallback(callbackData, error);
    });
  },

  bind: function (promise) {
    var that = this;
    promise.then(function (res) {
      that.resolve(res);
    }, function (err) {
      that.reject(err);
    })
  }
};

export default Defer;
