function getCsv(url){
  //CSVファイルを文字列で取得。
  var txt = new XMLHttpRequest();
  txt.open('get', url, false);
  txt.send();

  //改行ごとに配列化
  var arr = txt.responseText.split('\n');

  //1次元配列を2次元配列に変換
  var res = [];
  for(var i = 0; i < arr.length; i++){
    //空白行が出てきた時点で終了
    if(arr[i] == '') break;

    //","ごとに配列化
    res[i] = arr[i].split(',');

    for(var i2 = 0; i2 < res[i].length; i2++){
      //数字の場合は「"」を削除
      if(res[i][i2].match(/\-?\d+(.\d+)?(e[\+\-]d+)?/)){
        res[i][i2] = parseFloat(res[i][i2].replace('"', ''));
      }
    }
  }

  return res;
}

//class Dateの拡張
(function(){
	// クラス定数の定義
	// 月を表す定数
	Date.cn1gatu = 0; Date.cn2gatu = 1; Date.cn3gatu = 2; Date.cn4gatu = 3; Date.cn5gatu = 4; Date.cn6gatu = 5; Date.cn7gatu = 6;
	Date.cn8gatu = 7; Date.cn9gatu = 8; Date.cn10gatu = 9; Date.cn11gatu = 10; Date.cn12gatu = 11;
	// 週を表す定数
	Date.cnSunday = 0; Date.cnMonday = 1; Date.cnTuesday = 2; Date.cnWednesday = 3; Date.cnThursday = 4; Date.cnFriday = 5; Date.cnSaturday = 6;

	/**
	 * 祝日休日かどうかをチェックする。(2008年版)
	 */
	if(!Date.prototype.isHoliDay)Date.prototype.isHoliDay = function(){
		var day;
		var year = this.getFullYear();
		// 日曜日を探す。
		if (this.getDay() == Date.cnSunday)return true;
		// 土曜日を探す。
		if (this.getDay() == Date.cnSaturday)return true;
		// 元日
		if(this.isTheDay(new Date(year, Date.cn1gatu, 1)))return true;
		// 1月2日
		if(this.isTheDay(new Date(year, Date.cn1gatu, 2)))return true;
		// 1月3日
		if(this.isTheDay(new Date(year, Date.cn1gatu, 3)))return true;
		// 1月4日
		if(this.isTheDay(new Date(year, Date.cn1gatu, 4)))return true;
		// 成人の日　1月の第2月曜日
		if(this.isTheDay(Date.getSecondWeekMonday(year,Date.cn1gatu))) return true;
		// 2月11日は建国記念日
		day = new Date(year, Date.cn2gatu, 11);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 春分の日
		// 年度が２で割り切れるなら、3月20日、わりきれないなら3月21日
		if((year % 2) == 0 && this.isTheDay(new Date(year, Date.cn3gatu, 20))) return true;
		if((year % 2) != 0 && this.isTheDay(new Date(year, Date.cn3gatu, 21))) return true;
		// 4月29日はみどりの日
		day = new Date(year, Date.cn4gatu, 29);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 5月3日は憲法記念日
		day = new Date(year, Date.cn5gatu, 3);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 5月4日は国民の休日
		day = new Date(year, Date.cn5gatu, 4);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 5月5日はこどもの日
		day = new Date(year, Date.cn5gatu, 5);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 7月20日は海の日
		day = new Date(year, Date.cn7gatu, 20);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 9月15日は敬老の日
		day = new Date(year, Date.cn9gatu, 15);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 9月23日は秋分の日
		day = new Date(year, Date.cn9gatu, 23);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 体育の日 10月の第2月曜日
		day = Date.getSecondWeekMonday(year,Date.cn10gatu);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 11月3日は文化の日
		day = new Date(year, Date.cn11gatu, 3);
		if(Date.diff(this,day)==0) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 11月23日は勤労感謝の日
		day = new Date(year, Date.cn11gatu, 23)
		if(Date.diff(this.day)==0) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 12月23日は天皇誕生日
		day = new Date(year, Date.cn12gatu, 23);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 12月30日は年末休日
		day = new Date(year, Date.cn12gatu, 30);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		// 12月31日は年末休日
		day = new Date(year, Date.cn12gatu, 31);
		if(this.isTheDay(day)) return true;
		if(day.getDay() == Date.cnSunday && this.isTheDay(day.add("d",1))) return true; // 祝日が日曜日なら翌日
		return false;
	}

	/**
	 * 該当月のハッピーマンデー（該当月第二月曜日）の取得
	 */
	if(!Date.getSecondWeekMonday)Date.getSecondWeekMonday = function(year,month){
		var firstDate = new Date(year, month, 1);
		var weekDay = firstDate.getDay(); // 月の1日が火曜日以降なら（第3週）の月曜日が対象16日からマイナス
		if( weekDay >= Date.cnTuesday){
			return new Date(firstDate.setDate(16 - weekDay));
		} else {// 月の１日が（日曜、月曜）だったら、第2週の月曜日が対象(9から曜日分の日数を引いて算出）
			return new Date(firstDate.setDate(9 - weekDay));
		}
	}

	/**
	 * 2つの日付の差を求めるメソッド
	 * dtAfter 後日付
	 */
	if(!Date.diff)Date.diff = function(dtBefor,dtAfter) {
		var diff = dtAfter - dtBefor;
		var diffDay = parseInt(diff / 86400000);	//1日は86400000ミリ秒
		return diffDay;
	}
	
	/**
	 * 日付の操作を行うメソッド
	 * kind : 年月日のどこに追加するかを指定する "d":日、"m":月、"y"：年
	 * offset : 追加する間隔
	 */
	if(!Date.prototype.add)Date.prototype.add = function(kind,offset){
		var year = this.getFullYear();
		var month = this.getMonth();
		var day = this.getDate();
		var newDate = new Date(year,month,day);
			
		if(kind == "d") newDate.setDate(day + offset);
		if(kind == "m") newDate.setMonth(month + offset);
		if(kind == "y") newDate.setFullYear(year + offset);
		return newDate;
	}
	
	/**
	 * 同日であることをチェックするメソッド
	 */
	if(!Date.prototype.isTheDay)Date.prototype.isTheDay = function(dt){
		var year = dt.getFullYear();
		var month = dt.getMonth();
		var date = dt.getDate();
		return (this.getFullYear() ==  year && this.getMonth() == month && this.getDate() == date);
	}
	
}
)();

window.onload=function() {
  var datehyphen=document.getElementById("choice-date").value;
  var direction=document.getElementById("choice-direction").value;
  var date=new Date(datehyphen.replace(/-/g, "/"));
  if(!(date.isHoliDay())&&direction=="上り(内回り)"){
    var table = getCsv("../csv/weekday_up.csv");
  } else if(!(date.isHoliDay())&&direction=="下り(外回り)") {
    var table = getCsv("../csv/weekday_down.csv");
  } else if(date.isHoliDay()&&direction=="上り(内回り)") {
    var table = getCsv("../csv/holiday_up.csv");
  } else if(date.isHoliDay()&&direction=="下り(外回り)") {
    var table = getCsv("../csv/holiday_down.csv");
  }
};
