$(function () {
  // $('.phoneBox1-a').mouseenter(function () {
  //   $('.phoneBox1').show()
  // }).mouseleave(function () {
  //   $('.phoneBox1').hide()
  // })
  var aniType = $('.animate0315').css('animation-name'), time, countShow = 0;

  $(document).scroll(function () {
    aniType = $('.animate0315').css('animation-name');
    //
    // if (aniType == 'bounceIn') {
    //   console.log(aniType)
    //   $('.animate0315').css('animation-name','bounceIn')
    //   time = setTimeout(function () {
    //     $('.animate0315').css('animation-name','inherit').hide();
    //     countShow = 1;
    //     clearTimeout(time)
    //   }, 8000)
    // } else {
    //   console.log(aniType)
    //   if (countShow == 1) {
    //     countShow = 2;
    //
    //   }
    //
    // }

  });
})