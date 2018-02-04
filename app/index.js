import * as Rx from 'rxjs-es';
import $ from 'jquery';
import Defer from './defer.js';
import Promise from './promise.js';

// var dragable = $('#dragable')[0];

// var
//     mousedown = Rx.Observable.fromEvent(dragable, 'mousedown'),
//     mousemove = Rx.Observable.fromEvent(document, 'mousemove'),
//     mouseup   = Rx.Observable.fromEvent(dragable, 'mouseup');
// var 
//     startX,
//     startY;

// var mousedrag = 
//     mousedown.flatMap((md) => {
//             startX = md.offsetX,
//             startY = md.offsetY;

//         return mousemove.takeUntil(mouseup);
//     }).map((mm) => {
//         console.log(startX);
//         return {
//             left: mm.clientX - startX,
//             top: mm.clientY - startY
//         }
//     });

// mousedrag.subscribe((pos) => {
//     dragable.style.top = pos.top + 'px';
//     dragable.style.left = pos.left + 'px';
// });

console.log('------------ Application started --------------');

// var Promise = function () {
//   this.okCallbacks = [];
//   this.koCallbacks = [];
// };

// Promise.prototype = {
//   okCallbacks: null,
//   koCallbacks: null,
//   then: function (okCallback, koCallback) {
//     this.okCallbacks.push(okCallback);
//     if (koCallback) {
//       this.koCallbacks.push(koCallback);
//     }
//   }
// };

// var Defer = function () {
//   this.promise = new Promise();
// };

// Defer.prototype = {
//   promise: null,
//   resolve: function (data) {
//     this.promise.okCallbacks.forEach(function(callback) {
//       window.setTimeout(function () {
//         callback(data)
//       }, 0);
//     });
//   },

//   reject: function (error) {
//     this.promise.koCallbacks.forEach(function(callback) {
//       window.setTimeout(function () {
//         callback(error)
//       }, 0);
//     });
//   }
// };

// function test() {
//   var defer = new Defer();
//   // an example of an async call
//   setTimeout(function () {
//     var random_boolean = Math.random() >= 0.5;
//     if (random_boolean) {
//       defer.resolve('success');
//     } else {
//       defer.reject(new Error('error'));
//     }
//   }, 100);
//   return defer.promise;
// }



// setInterval(function() {
//    test().then(function (text) {
//       console.log(text);
//     }, function (error) {
//       console.log(error.message);
//     }); 
// }, 1000);

function before() {
  var defer = new Defer();
  // an example of an async call
  setTimeout(function () {
    var random_boolean = Math.random() >= 0.5;
    if (random_boolean) {
      defer.resolve('success before');
    } else {
      defer.reject(new Error('error'));
    }
  }, 100);
  return defer.promise;
}

function after() {
  var defer = new Defer();
  // an example of an async call
  setTimeout(function () {
    var random_boolean = Math.random() >= 0.5;
    if (random_boolean) {
      defer.resolve('success after');
    } else {
      defer.reject(new Error('error'));
    }
  }, 100);
  return defer.promise;
}

// setInterval(function() {
//    before().then(function (text) {
//       console.log(text);
//     }, function (error) {
//       console.log(error.message);
//     }); 
// }, 1000);

before().then(function (text) {
  console.log(text);

  return after();
}, function (error) {
  console.log(error.message);
}).then(function (text) {
    console.log(text)
}); 
