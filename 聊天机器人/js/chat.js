$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()

  // 为发送按钮绑定鼠标点击事件
  $('#btnSend').click(function () {
    var talk = $('#ipt').val().trim()
    if (talk.length <= 0) {
      return $('#ipt').val('')
    }
    // 如果用户输入了聊天内容，则将聊天内容追加到页面上显示
    $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>' + talk + '</span></li>')
    $('#ipt').val('')
    // 重置滚动条的位置
    resetui()
    // 发送请求 , 获取聊天内容
    getMsg(talk);
  })


  // 获取聊天机器人发送回来的消息

  function getMsg(talk) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: talk
      },
      success: function (res) {
        // console.log(res);
        if (res.message === 'success') {
          // 接收消息
          var msg = res.data.info.text;
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>' + msg + '</span></li>')
          // 重置滚动条的位置
          resetui()
          // 调用 getVoice 函数将文字转换为语音
          getVoice(msg)
        }
      }
    })
  }


  // 把文字转换为语音进行播放
  function getVoice(talk) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: talk
      },
      success: function (res) {
        // console.log(res);
        if (res.status == 200) {
          // 播放语音
          $('#voice').prop('src', res.voiceUrl)
        }
      }
    })
  }

  // 绑定回车事件
  $('#ipt').keyup(function (e) {
    // e.keyCode 得到当前按键的ASCII码
    if (e.keyCode === 13) {
      // 调用按钮函数的 click 函数
      $('#btnSend').click();

    }
  })
})
