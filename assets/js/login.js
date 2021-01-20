$(function() {
  // 登录与注册的切换
  $('#link_reg').on('click', function() {
    $('.login').hide();
    $('.register').show();
  })
  $('#link_log').on('click', function() {
    $('.login').show();
    $('.register').hide();
  })

  // 表单验证
  var form = layui.form;
  form.verify({
    // 密码验证
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 确认密码
    repassword: function(value) {
      var password = $('.register input[name=password]').val();
      if(value !== password) {
        return '两次输入的密码不一致';
      }
    }
  })

  var layer = layui.layer;

  // 用户注册
  $('#form_register').on('submit', function(e) {
    e.preventDefault();

    var data = $(this).serialize();
    $.post(`/api/reguser`, data, result => {
      if(result.status !== 0) return layer.msg(result.message);
      layer.msg(result.message);
      $('#link_log').click();
    });
  })

  // 用户登录
  $('#form_login').on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.post(`/api/login`, data, result => {
      if(result.status !== 0) return layer.msg(result.message);
      layer.msg(result.message);
      localStorage.setItem('token', result.token);
      location.href = '/index.html';
    });
  })
})
