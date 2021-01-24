$(function () {
  var layer = layui.layer;

  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image');
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  };
  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 点击上传按钮
  $('#chooseImage').on('click', function () {
    $('#file').click();
  })

  // 选择文件
  $('#file').on('change', function(e) {
    var files = e.target.files;
    if(files.length === 0) return layer.msg('未选择文件');
    var imgURL = URL.createObjectURL(files[0]);
    $image.cropper('destroy').attr('src', imgURL).cropper(options);
  })

  // 上传文件
  $('#upload').on('click', function() {
    var dataURL = $image.cropper('getCroppedCanvas', {
      width: 100,
      height: 100
    }).toDataURL('image/png');

    $.ajax({
      method: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL
      },
      success: function (result) {
        if(result.status !== 0) return layer.msg(result.message);
        layer.msg(result.message);
        window.parent.loadUserInfo();
      }
    });
  })
})