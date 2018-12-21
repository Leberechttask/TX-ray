var cvs = document.getElementById("system-container");
var ctx = cvs.getContext("2d");

var line;
var direction;
var train;
var station;
var date;
var time;

var table; //上り(休日or平日)or下り(休日or平日)

console.log("hoge");

function getCsv(url) {
    //CSVファイルを文字列で取得。
    var txt = new XMLHttpRequest();
    txt.open('get', url, false);
    txt.send();

    //改行ごとに配列化
    var arr = txt.responseText.split('\n');
    ctx.strokeText(arr[5], 50, 200);
    //console.log(arr);

    //1次元配列を2次元配列に変換
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        //空白行が出てきた時点で終了
        if (arr[i] == '') break;

        //","ごとに配列化
        res[i] = arr[i].split(',');
        /*
        for (var i2 = 0; i2 < res[i].length; i2++) {
            //数字の場合は「"」を削除
            if (res[i][i2].match(/\-?\d+(.\d+)?(e[\+\-]d+)?/)) {
                res[i][i2] = parseFloat(res[i][i2].replace('"', ''));
            }
        } */
    }
    //console.log(res);

    return res;
}

//class Dateの拡張
(function() {
    // クラス定数の定義
    // 月を表す定数
    Date.cn1gatu = 0;
    Date.cn2gatu = 1;
    Date.cn3gatu = 2;
    Date.cn4gatu = 3;
    Date.cn5gatu = 4;
    Date.cn6gatu = 5;
    Date.cn7gatu = 6;
    Date.cn8gatu = 7;
    Date.cn9gatu = 8;
    Date.cn10gatu = 9;
    Date.cn11gatu = 10;
    Date.cn12gatu = 11;
    // 週を表す定数
    Date.cnSunday = 0;
    Date.cnMonday = 1;
    Date.cnTuesday = 2;
    Date.cnWednesday = 3;
    Date.cnThursday = 4;
    Date.cnFriday = 5;
    Date.cnSaturday = 6;

    /**
     * 祝日休日かどうかをチェックする。(2008年版)
     */
    if (!Date.prototype.isHoliDay) Date.prototype.isHoliDay = function() {
        var day;
        var year = this.getFullYear();
        // 日曜日を探す。
        if (this.getDay() == Date.cnSunday) return true;
        // 土曜日を探す。
        if (this.getDay() == Date.cnSaturday) return true;
        // 元日
        if (this.isTheDay(new Date(year, Date.cn1gatu, 1))) return true;
        // 1月2日
        if (this.isTheDay(new Date(year, Date.cn1gatu, 2))) return true;
        // 1月3日
        if (this.isTheDay(new Date(year, Date.cn1gatu, 3))) return true;
        // 1月4日
        if (this.isTheDay(new Date(year, Date.cn1gatu, 4))) return true;
        // 成人の日　1月の第2月曜日
        if (this.isTheDay(Date.getSecondWeekMonday(year, Date.cn1gatu))) return true;
        // 2月11日は建国記念日
        day = new Date(year, Date.cn2gatu, 11);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 春分の日
        // 年度が２で割り切れるなら、3月20日、わりきれないなら3月21日
        if ((year % 2) == 0 && this.isTheDay(new Date(year, Date.cn3gatu, 20))) return true;
        if ((year % 2) != 0 && this.isTheDay(new Date(year, Date.cn3gatu, 21))) return true;
        // 4月29日はみどりの日
        day = new Date(year, Date.cn4gatu, 29);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 5月3日は憲法記念日
        day = new Date(year, Date.cn5gatu, 3);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 5月4日は国民の休日
        day = new Date(year, Date.cn5gatu, 4);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 5月5日はこどもの日
        day = new Date(year, Date.cn5gatu, 5);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 7月20日は海の日
        day = new Date(year, Date.cn7gatu, 20);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 9月15日は敬老の日
        day = new Date(year, Date.cn9gatu, 15);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 9月23日は秋分の日
        day = new Date(year, Date.cn9gatu, 23);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 体育の日 10月の第2月曜日
        day = Date.getSecondWeekMonday(year, Date.cn10gatu);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 11月3日は文化の日
        day = new Date(year, Date.cn11gatu, 3);
        if (Date.diff(this, day) == 0) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 11月23日は勤労感謝の日
        day = new Date(year, Date.cn11gatu, 23)
        if (Date.diff(this.day) == 0) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 12月23日は天皇誕生日
        day = new Date(year, Date.cn12gatu, 23);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 12月30日は年末休日
        day = new Date(year, Date.cn12gatu, 30);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        // 12月31日は年末休日
        day = new Date(year, Date.cn12gatu, 31);
        if (this.isTheDay(day)) return true;
        if (day.getDay() == Date.cnSunday && this.isTheDay(day.add("d", 1))) return true; // 祝日が日曜日なら翌日
        return false;
    }

    /**
     * 該当月のハッピーマンデー（該当月第二月曜日）の取得
     */
    if (!Date.getSecondWeekMonday) Date.getSecondWeekMonday = function(year, month) {
        var firstDate = new Date(year, month, 1);
        var weekDay = firstDate.getDay(); // 月の1日が火曜日以降なら（第3週）の月曜日が対象16日からマイナス
        if (weekDay >= Date.cnTuesday) {
            return new Date(firstDate.setDate(16 - weekDay));
        } else { // 月の１日が（日曜、月曜）だったら、第2週の月曜日が対象(9から曜日分の日数を引いて算出）
            return new Date(firstDate.setDate(9 - weekDay));
        }
    }

    /**
     * 2つの日付の差を求めるメソッド
     * dtAfter 後日付
     */
    if (!Date.diff) Date.diff = function(dtBefor, dtAfter) {
        var diff = dtAfter - dtBefor;
        var diffDay = parseInt(diff / 86400000); //1日は86400000ミリ秒
        return diffDay;
    }

    /**
     * 日付の操作を行うメソッド
     * kind : 年月日のどこに追加するかを指定する "d":日、"m":月、"y"：年
     * offset : 追加する間隔
     */
    if (!Date.prototype.add) Date.prototype.add = function(kind, offset) {
        var year = this.getFullYear();
        var month = this.getMonth();
        var day = this.getDate();
        var newDate = new Date(year, month, day);

        if (kind == "d") newDate.setDate(day + offset);
        if (kind == "m") newDate.setMonth(month + offset);
        if (kind == "y") newDate.setFullYear(year + offset);
        return newDate;
    }

    /**
     * 同日であることをチェックするメソッド
     */
    if (!Date.prototype.isTheDay) Date.prototype.isTheDay = function(dt) {
        var year = dt.getFullYear();
        var month = dt.getMonth();
        var date = dt.getDate();
        return (this.getFullYear() == year && this.getMonth() == month && this.getDate() == date);
    }

})();

$(function() {
    $('#system-name').click(function() {
        window.location.href = '../index.html';
    });

    $('#setting-show').click(function() {
        $('#setting-modal').fadeIn();
    });

    $('.close-modal').click(function() {
        $('#setting-modal').fadeOut();
    });

    $('#submit-btn').click(function() {
        line = document.getElementById("choice-line").value;
        direction = document.getElementById("choice-direction").value;
        train = document.getElementById("choice-train").value;
        station = document.getElementById("choice-station").value;
        date = document.getElementById("choice-date").value;
        time = document.getElementById("choice-time").value;
        if (date === "") {
            date = "設定なし";
        }
        $('#setting-line').text(line);
        $('#setting-direction').text(direction);
        $('#setting-train').text(train);
        $('#setting-station').text(station);
        $('#setting-date').text(date);
        $('#setting-time').text(time);
		$('#set-station').text(station);

        ctx.fillStyle = "red";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 3;

        ctx.font = "italic bold 48pt sans-serif";

        //var datehyphen = document.getElementById("choice-date").value;
        //var direction = document.getElementById("choice-direction").value;
        date = new Date(date.replace(/-/g, "/"));
        if (!(date.isHoliDay()) && direction == "上り(内回り)") {
            table = getCsv("../csv/weekday_up.csv");
           // ctx.strokeText(table[3][3], 50, 200);
            //console.log(table);
            table_make_nobori();
        } else if (!(date.isHoliDay()) && direction == "下り(外回り)") {
            table = getCsv("../csv/weekday_down.csv");
            //table_make_kudari();
        } else if (date.isHoliDay() && direction == "上り(内回り)") {
            table = getCsv("../csv/holiday_up.csv");
            //table_make_nobori();
        } else if (date.isHoliDay() && direction == "下り(外回り)") {
            table = getCsv("../csv/holiday_down.csv");
            //table_make_kudari();
        }

       // ctx.clearRect(0, 0, 880, 600);
        var Train_number = 0;
        ctx.drawImage(tx_station, 0, 0);

        if (direction == '上り(内回り)') {
            switch (train) {
                case '普通車両':
                    for (var i = 0; i < 50; i++) {
                        var nT = nTrains[i];
                        nT.draw_nobori(ctx, '07:15');
                    }
                    break;
                case '区快速':
                    for (var i = 0; i < 3; i++) {
                        var srT = srTrains[Train_number];
                        srT.draw_nobori(ctx, time);
                    }
                    break;
                case '快速':
                    for (var i = 0; i < 3; i++) {
                        var rT = rTrains[Train_number];
                        rT.draw_nobori(ctx, time);
                    }
            }
        } else if (direction == '下り(外回り)') {}

    });
});

var t_nobori;
var t_kudari;
var tx_station;

var direction;

//各種電車の情報を格納する配列
var nTrains = [];
var srTrains = [];
var rTrains = [];

//時刻表(仮)
/*
var nT_nobori = [
    ['4:44', '5:00', '20:00'],
    ['5:15', '7:11', '10:00'],
    ['6:00', '7:00', '8:00']
];

var nT_n = new Date(3);
for (var i = 0; i < 3; i++) {
    nT_n[i] = new Date(3);
    for (var j = 0; j < 3; j++) {
        nT_n[i][j] = nT_nobori[i][j];
    }
}

var nT_kudari = [
    [8, 15, 20],
    [13, 20, 25],
    [17, 43, 59]
];

var srT_nobori = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
var srT_kudari = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var rT_nobori = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
var rT_kudari = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//電車配列に時刻表を追加：csvうまくいったら一括でできる

for (var i = 0; i < 3; i++) {
    var srTrain = new SR_Trains();
    srTrain.t_table = srT_nobori[i];
    srTrains.push(srTrain);
}

for (var i = 0; i < 3; i++) {
    var rTrain = new R_Trains();
    rTrain.t_table = rT_nobori[i];
    rTrains.push(rTrain);
}

for (var i = 0; i < 3; i++) {
    var nTrain = new N_Trains();
    for (var j = 0; j < 3; j++) {
        if (nT_nobori[i][j].charAt(1) == ':') {
            nT_nobori[i][j] = '0' + nT_nobori[i][j];
        }
    }
    nTrain.t_table = nT_nobori[i];
    nTrains.push(nTrain);
}
*/

//統一ver

function table_make_nobori() {
    console.log(table[0][22]);
    for (var i = 0; i < 244; i++) {
        for (var j = 2; j < 26; j++) {
            var T = table[i][j];
        }
        if (table[i][1] == '普通') {
            var nTrain = new N_Trains();
            nTrain.t_table = table[i];
            nTrains.push(nTrain);
        } else if (table[i][1] == '区快') {
            var srTrain = new SR_Trains();
            srTrain.t_table = table[i];
            srTrains.push(srTrain);
        } else if (table[i][1] == '快速') {
            var rTrain = new R_Trains();
            rTrain.t_table = table[i];
            rTrains.push(rTrain);
        } else {
            ctx.clearRect(0, 0, 880, 600);
        }
    }
    console.log(nTrain);
}

function table_make_kudari() {
    for (var i = 0; i < 244; i++) {
        if (table[i][0] == '普通') {
            var nTrain = new N_Trains();
            nTrain.t_table = table[i];
            nTrains.push(nTrain);
        } else if (table[i][0] == '区快') {
            var srTrain = new SR_Trains();
            srTrain.t_table = table[i];
            srTrains.push(srTrain);
        } else if (table[i][0] == '快速') {
            var rTrain = new R_Trains();
            rTrain.t_table = table[i];
            rTrains.push(rTrain);
        }
    }
}

function N_Trains() {
    var me = this;

    this.t_table;

    this.draw_nobori = function(ctx, t) {
        ctx.drawImage(t_nobori, getPos_NT_no_X(t, me.t_table), getPos_NT_no_Y(t, me.t_table));
    };

    this.draw_kudari = function(ctx, t) {
        ctx.drawImage(t_nobori, getPos_NT_ku_X(t, me.t_table), getPos_NT_ku_Y(t, me.t_table));
    };
}

function SR_Trains() {
    var me = this;

    this.t_table;

    this.draw_nobori = function(ctx, t) {
        ctx.drawImage(t_nobori, getPos_SRT_no_X(t, me.t_table), getPos_SRT_no_Y(t, me.t_table));
    };

    this.draw_kudari = function(ctx, t) {
        ctx.drawImage(t_nobori, getPos_SRT_ku_X(t, me.t_table), getPos_SRT_ku_Y(t, me.t_table));
    };
}

function R_Trains() {
    var me = this;

    this.t_table;

    this.draw_nobori = function(ctx, t) {
        ctx.drawImage(t_nobori, getPos_RT_no_X(t, me.t_table), getPos_RT_no_Y(t, me.t_table));
    };

    this.draw_kudari = function(ctx, t) {
        ctx.drawImage(t_nobori, getPos_RT_ku_X(t, me.t_table), getPos_RT_ku_Y(t, me.t_table));
    };
}

function getPos_NT_no_X(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 50 + (i * 35);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 67 + (i * 35);
        }
    }
    return -50;
}

//普通列車の位置を取得
function getPos_NT_no_Y(time, t_table) {
    for (var i = 2; i < 23; i++) {
        if (time == t_table[i]) {
            return 525 - ((i - 2) * 25);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 512 - ((i - 2) * 25);
        }
    }
    return -1;
}

function getPos_NT_ku_X(time, t_table) {
    for (var i = 2; i < 23; i++) {
        if (time == t_table[i]) {
            return 715 - ((i - 2) * 35);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 697 - ((i - 2) * 35);
        }
    }
    return -50;
}

function getPos_NT_ku_Y(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 50 + (i * 25);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 67 + (i * 25);
        }
    }
    return -1;
}

//区快速の位置を取得
function getPos_SRT_no_X(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 50 + (i * 35);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 67 + (i * 35);
        }
    }
    return -50;
}

function getPos_SRT_no_Y(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 525 - (i * 25);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 512 - (i * 25);
        }
    }
    return -1;
}

function getPos_SRT_ku_X(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 715 - (i * 35);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 697 - (i * 35);
        }
    }
    return -50;
}

function getPos_SRT_ku_Y(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 50 + (i * 25);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 67 + (i * 25);
        }
    }
    return -1;
}

//快速の位置を取得
function getPos_RT_no_X(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 50 + (i * 35);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 67 + (i * 35);
        }
    }
    return -50;
}

function getPos_RT_no_Y(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 525 - (i * 25);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 512 - (i * 25);
        }
    }
    return -1;
}

function getPos_RT_ku_X(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 715 - (i * 35);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 697 - (i * 35);
        }
    }
    return -50;
}

function getPos_RT_ku_Y(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 50 + (i * 25);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 67 + (i * 25);
        }
    }
    return -1;
}

function onLoad() {
    var Train_number = 0;
    ctx.drawImage(tx_station, 0, 0);
}

t_nobori = document.createElement("img");
t_nobori.src = "../img/train_nobori.png";
t_nobori.addEventListener("load", onLoad);

t_kudari = document.createElement("img");
t_kudari.src = "../img/train_kudari.png";
t_kudari.addEventListener("load", onLoad);

tx_station = document.createElement("img");
tx_station.src = "../img/station.png";
tx_station.addEventListener("load", onLoad);

//時刻表のcsv取得
//時刻表配列の作成
