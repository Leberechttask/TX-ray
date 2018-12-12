var cvs = document.getElementById("system-container");
var ctx = cvs.getContext("2d");

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
        var line = document.getElementById("choice-line").value;
        var direction = document.getElementById("choice-direction").value;
        var train = document.getElementById("choice-train").value;
        var date = document.getElementById("choice-date").value;
        var time = document.getElementById("choice-time").value;
        if (date === "") {
            date = "設定なし";
        }
        if (time === "") {
            time = "設定なし";
        }
        $('#setting-line').text(line);
        $('#setting-direction').text(direction);
        $('#setting-train').text(train);
        $('#setting-date').text(date);
        $('#setting-time').text(time);
    });
});

var numTrain = 3;

var TRAIN = {
    Normal: 1,
    SemiRapid: 2,
    Rapid: 3
};

var t_nobori;
var t_kudari;
var tx_station;

var direction = 'nobori';

//各種電車の情報を格納する配列
var nTrains = [];
var srTrains = [];
var rTrains = [];

//時刻表(仮)
var nT_nobori = [
    ['4:44', '5:00', '6:00'],
    ['5:15', '7:11', '10:00'],
    ['6:00', '7:00', '8:00']
];

/*
var nT_n = new Date();
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        nT_n[i][j] = nT_nobori[i][j];
    }
} */

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
    nTrain.t_table = nT_nobori[i];
    nTrains.push(nTrain);
}

//統一ver
/*
for (var i = 0; i < 50; i++) {
    if (TT_nobori[i][0] == '普通') {
        var nTrain = new N_Trains();
        nTrain.t_table = TT_nobori[i];
        nTrains.push(nTrain);
    } else if (TT_nobori[i][0] == '区快') {
        var srTrain = new SR_Trains();
        nTrain.t_table = TT_nobori[i];
        nTrains.push(nTrain);
    } else if (TT_nobori[i][0] == '快速') {
        var rTrain = new R_Trains();
        nTrain.t_table = TT_nobori[i];
        nTrains.push(nTrain);
    }
}

for (var i = 0; i < 50; i++) {
    if (TT_kudari[i][0] == '普通') {
        var nTrain = new N_Trains();
        nTrain.t_table = TT_kudari[i];
        nTrains.push(nTrain);
    } else if (TT_kudari[i][0] == '区快') {
        var srTrain = new SR_Trains();
        nTrain.t_table = TT_kudari[i];
        nTrains.push(nTrain);
    } else if (TT_kudari[i][0] == '快速') {
        var rTrain = new R_Trains();
        nTrain.t_table = TT_kudari[i];
        nTrains.push(nTrain);
    }
}
*/

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

    this.x = 45;
    this.y = 545;

    this.draw_nobori = function(ctx, t) {
        ctx.drawImage(t_nobori, me.x, me.y);
    };
}

function R_Trains() {
    var me = this;

    this.x = 45;
    this.y = 545;

    this.t_table;

    this.draw_nobori = function(ctx, t) {
        ctx.drawImage(t_nobori, me.x, me.y);
    };
}

function getTrainType() {
    return TRAIN.Normal;
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
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 525 - (i * 25);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 512 - (i * 25);
        }
    }
    return -1;
}

function getPos_NT_ku_X(time, t_table) {
    for (var i = 0; i < 3; i++) {
        if (time == t_table[i]) {
            return 715 - (i * 35);
        } else if (time > t_table[i] && time < t_table[i + 1]) {
            return 697 - (i * 35);
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
    if (direction == 'nobori') {
        switch (getTrainType()) {
            case TRAIN.Normal:
                for (var i = 0; i < 3; i++) {
                    var nT = nTrains[i];
                    nT.draw_nobori(ctx, '5:15');
                }
                break;
            case TRAIN.SemiRapid:
                for (var i = 0; i < 3; i++) {
                    var srT = srTrains[Train_number];
                    srT.draw_nobori(ctx, 2);
                }
                break;
            case TRAIN.Rapid:
                for (var i = 0; i < 3; i++) {
                    var rT = rTrains[Train_number];
                    rT.draw_nobori(ctx, 2);
                }
        }
    } else if (direction == 'kudari') {}
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