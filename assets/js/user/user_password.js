$(function() {
  var form = layui.form;
  var layer = layui.layer;

  // 表单验证
  form.verify({
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samepassword: function(value) {
      if(value == $('input[name=oldPwd]').val()) {
        return '新旧密码不能相同'
      }
    },
    repassword: function(value) {
      if(value !== $('input[name=newPwd]').val()) {
        return '两次输入的密码不一致';
      }
    }
  })

  // 修改密码
  $('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (result) {
        if(result.status !== 0) return layer.msg(result.message);
        layer.msg(result.message);
        // 重置表单
        $('.layui-form')[0].reset();
      }
    });
  })
})