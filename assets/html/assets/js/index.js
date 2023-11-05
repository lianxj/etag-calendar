$(function () {
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');

  toggleTheme(themeMedia.matches);

  themeMedia.addListener(e => {
    toggleTheme(e.matches);
  });

  var gap = ($('.main').width() - 68 * 7 - 2) / 2;
  $(':root').css('--weekend-gap', `${gap}px`);

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  var firstDay = new Date(year, month - 1, 1).getDay();
  var days = new Date(year, month, 0).getDate();
  var $days = $('.days');
  for (var i = 1 - firstDay; i <= days; i++) {
    if (i < 1 || i > days) {
      $days.append('<li></li>');
    } else {
      var t = calendar.solar2lunar(year, month, i);
      console.log(t);
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

  var target = calendar.solar2lunar(year, month, date);
  var cMonth = `${target.cMonth}`.padStart(2, '0');
  var cDay = `${target.cDay}`.padStart(2, '0');
  var $side = $('.side');
  var side = `<div class="year my-5">
                    <span class="lYear">${target.cYear}</span>
                    <span>年</span>
                    <div class="gzYear">
                        <span>${target.gzYear}${target.Animal}年</span>
                        <span>${target.IMonthCn}${target.IDayCn}</span>
                    </div>
                </div>
                <div class="month my-5">
                    <span class="lmonth">${cMonth}</span>
                    <span>月</span>
                    <span class="lday">${cDay}</span>
                    <span>日</span>
                </div>
                <div class="date my-5">${target.ncWeek}</div>
                <div class="middle my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>深圳 广东
                </div>`;
  $side.append(side);
});

const toggleTheme = isDarkMode => {
  document.documentElement.setAttribute(
    'data-theme',
    isDarkMode ? 'dark' : 'light'
  );
};

function changeTheme(theme) {
  toggleTheme(theme);
}
