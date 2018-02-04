import Defer from './defer.js';

var Promise = function () {
  this.okCallbacks = [];
  this.koCallbacks = [];
};

Promise.prototype = {
  okCallbacks: null,
  koCallbacks: null,
  status: 'pending',
  error: null,

  then: function (okCallback, koCallback) {
    var defer = new Defer();

    // Add callbacks to the arrays with the defer binded to these callbacks
    this.okCallbacks.push({
      func: okCallback,
      defer: defer
    });

    if (koCallback) {
      this.koCallbacks.push({
        func: koCallback,
        defer: defer
      });
    }

    // Check if the promise is not pending. If not call the callback
    if (this.status === 'resolved') {
      this.executeCallback({
        func: okCallback,
        defer: defer
      }, this.data)
    } else if(this.status === 'rejected') {
      this.executeCallback({
        func: koCallback,
        defer: defer
      }, this.error)
    }

    return defer.promise;
  },

  //thuc thi ham callback
  executeCallback: function (callbackData, result) {
    window.setTimeout(function () {
      var res = callbackData.func(result);
      if (res instanceof Promise) {
        callbackData.defer.bind(res);
      } else {
        callbackData.defer.resolve(res);
      }
    }, 0);
  }
};

export default Promise;
