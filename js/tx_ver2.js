var cvs = document.createElement("canvas");
cvs.width = 880;
cvs.height = 640;
document.getElementById("system-container").appendChild(cvs);
var ctx = cvs.getContext("2d");

var numTrain = 3;

var TRAIN = {
    Normal: 1,
    SemiRapid: 2,
    Rapid: 3
};

var t_nobori;
var t_kudari;

var nTrains = [];
var nT_tables = [
    [8, 15, 20],
    [13, 20, 25],
    [32, 43, 59]
];

var srTrains = [];
var srT_tables = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var rTrains = [];
var rT_tables = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (var i = 0; i < 3; i++) {
    var srTrain = new N_Trains();
    srTrain.t_table = srT_tables[i];
    srTrains.push(srTrain);
}

for (var i = 0; i < 3; i++) {
    var rTrain = new N_Trains();
    rTrain.t_table = rT_tables[i];
    rTrains.push(rTrain);
}

for (var i = 0; i < 3; i++) {
    var nTrain = new N_Trains();
    nTrain.t_table = nT_tables[i];
    nTrains.push(nTrain);
}

function N_Trains() {
    var me = this;

    this.t_table = [100, 0, 0];

    this.draw = function(ctx, t, t_table) {
        ctx.drawImage(t_nobori, getPos_X(t, me.t_table), getPos_Y(t, me.t_table));
    };
}

function SR_Trains() {
    var me = this;

    this.t_table;

    this.x = 45;
    this.y = 545;

    this.draw = function(ctx, t) {
        ctx.drawImage(t_nobori, me.x, me.y);
    };
}

function R_Trains() {
    var me = this;

    this.x = 45;
    this.y = 545;

    this.t_table;

    this.draw = function(ctx, t) {
        ctx.drawImage(t_nobori, me.x, me.y);
    };
}

function getTrainType() {
    return TRAIN.Normal;
}

function getPos_X(time, t_table) {
    if (time > t_table[0]) {
        return 120;
    }
    return 45;
}

function getPos_Y(time, t_table) {
    if (time > t_table[0]) {
        return 500;
    }
    return 545;
}

function onLoad() {
    var Train_number = 0;
    switch (getTrainType()) {
        case TRAIN.Normal:
            var nT = nTrains[Train_number];
            nT.draw(ctx, 2);
            break;
        case TRAIN.SemiRapid:
            var srT = srTrains[Train_number];
            srT.draw(ctx, 2);
            break;
        case TRAIN.Rapid:
            var rT = rTrains[Train_number];
            rT.draw(ctx, 2);
    }
}

t_nobori = document.createElement("img");
t_nobori.addEventListener("load", onLoad);
t_nobori.src = "../img/train_nobori.png";