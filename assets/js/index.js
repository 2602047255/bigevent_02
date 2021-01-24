$(function() {
  loadUserInfo();
  let layer = layui.layer;

  // 退出登录
  $('#logout').on('click', function() {
    layer.confirm('确认退出登录？', {icon: 3, title:'提示'}, function(index){
      localStorage.removeItem('token');
      location.href = '/login.html';
      layer.close(index);
    });
  })
});

// 获取用户信息
function loadUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    success: function (result) {
      if(result.status !== 0) return layui.layer.msg(result.message);
      renderAvatar(result.data);
    }
  });
}

// 渲染用户信息
function renderAvatar(data) {
  var name = data.nickname || data.username;
  var avatar = data.user_pic;
  $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`);
  $('#name').html(name);

  if(avatar !== null) {
    $('.layui-nav-img').attr('src', avatar).show();
    $('.text-avatar').hide();
  } else {
    var firstName = name[0].toUpperCase();

    $('.layui-nav-img').hide();
    $('.text-avatar').html(firstName).show();
  }
}