$(function() {
    $('#setting-show').click(function() {
        $('#setting-modal').fadeIn();
    });

    $('.close-modal').click(function() {
        $('#setting-modal').fadeOut();
    });

    $('#submit-btn').click(function() {
        var line=document.getElementById("choice-line").value;
        var direction=document.getElementById("choice-direction").value;
        var train=document.getElementById("choice-train").value;
        var date=document.getElementById("choice-date").value;
        var time=document.getElementById("choice-time").value;
        if (date==="") {
            date="設定なし";
        }
        if (time==="") {
            time="設定なし";
        }
        $('#setting-line').text(line);
        $('#setting-direction').text(direction);
        $('#setting-train').text(train);
        $('#setting-date').text(date);
        $('#setting-time').text(time);
    })
});