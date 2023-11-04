$(function () {
  var gap = ($('.main').width() - 68 * 7) / 2;
  $(':root').css('--vt-gap', `${gap}px`);

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var firstDay = new Date(year, month - 1, 1).getDay();
  var days = new Date(year, month, 0).getDate();
  var $days = $('.days');
  for (var i = 1 - firstDay; i <= days; i++) {
    if (i < 1 || i > days) {
      $days.append('<li></li>');
    } else {
      var t = calendar.solar2lunar(year, month, i);
      var iDayCn = t.lDay === 1 ? t.IMonthCn : t.vacation || t.Term || t.IDayCn;
      if (t.isToday) {
        $days.append(
          `<li class="active "><span class="day">${i}</span><span class="daycn">${iDayCn}</span></li>`
        );
      } else {
        var weekend = [6, 7].includes(t.nWeek) ? 'class="weekend"' : '';
        $days.append(
          `<li ${weekend}><span class="day">${i}</span><span class="daycn">${iDayCn}</span></li>`
        );
      }
    }
  }
});
