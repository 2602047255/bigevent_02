$.ajaxPrefilter(function(options) {
  options.url = 'http://www.liulongbin.top:3007' + options.url;
  if(options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    };
  }
  options.complete = function(result) {
    var data = result.responseJSON;
    if(data.status === 1 && data.message === '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  }
})