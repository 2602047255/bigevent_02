$(function() {
  var form = layui.form;
  var layer = layui.layer;

  // 表单验证
  form.verify({
    nickname: function(value) {
      if(value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间';
      }
    }
  })

  // 获取用户信息
  initUserInfo();
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (result) {
        if(result.status !== 0) return layer.msg(result.message);
        form.val('userInfo', result.data);
      }
    });
  }

  // 重置表单项
  $('#reset').on('click', function(e) {
    e.preventDefault();
    initUserInfo();
  })

  // 修改用户信息
  $('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (result) {
        if(result.status !== 0) return layer.msg(result.message);
        layer.msg(result.message);
        // 调用父页面的方法
        window.parent.loadUserInfo();
      }
    });
  })
})
