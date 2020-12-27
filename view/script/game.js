var wordlist = [];
var wordlistorig = [];
function load_word() {
    Object.keys(lang.words).forEach(function (key) {
        wordlist.push(lang.words[key])
        wordlistorig.push(key)
    });
}

var time_limit = 90;
var readytime = 3;
var score;
var correct;
var mistake;
var char_num = 0;
var word_char;
var random;
var now_game = false;
function ready() {
    readytime = 3;
    scoredis.innerHTML = "";
    play_btn.style.visibility = "hidden";
    var readytimer = setInterval(function () {
        count.innerHTML = lang.game_start_time1 + readytime + lang.game_start_time2;
        document.getElementById('startcaudio').pause();
        document.getElementById('startcaudio').currentTime = 0;
        document.getElementById('startcaudio').play();
        readytime--;
        if (readytime < 0) {
            clearInterval(readytimer);
            document.getElementById('startcaudio').pause();
            document.getElementById('startcaudio').currentTime = 0;
            document.getElementById('startaudio').pause();
            document.getElementById('startaudio').currentTime = 0;
            document.getElementById('startaudio').play();
            gameStart();
        }
    }, 1000);
}
function gameStart() {
    score = 0.0;
    mistake = 0;
    correct = 0;
    now_game = true;
    wordDisplay();
    var time_remaining = time_limit;
    var gametimer = setInterval(function () {
        count.innerHTML = lang.game_last_time + time_remaining;
        time_remaining--;
        if (time_remaining <= 0) {
            clearInterval(gametimer);
            finish();
        }
    }, 1000);
}
function wordDisplay() {
    random = Math.floor(Math.random() * wordlist.length);
    word.innerHTML = wordlist[random];
    orig.innerHTML = wordlistorig[random];
    charInsort();
    document.getElementById('switchaudio').pause();
    document.getElementById('switchaudio').currentTime = 0;
    document.getElementById('switchaudio').play();
}
function charInsort() {
    word_char = wordlist[random].charAt(char_num);
}
function finish() {
    score = Math.floor(Math.pow(correct, 2) * Math.pow((correct / (correct + mistake)), 5));
    scoredis.innerHTML = `<h2>${lang.game_score_point1}${(score == NaN) ? 0 : score}${lang.game_score_point2}</h2><hr>${lang.game_score_truetype}${correct}<br>${lang.game_score_falsetype}${mistake}<br>${lang.game_score_percent}${((correct / (correct + mistake) * 100).toFixed(1) == NaN) ? 0 : (correct / (correct + mistake) * 100).toFixed(1)}%<br><br><a href="#title" class="col s12 btn">${lang.back_to_title}</a>`;
    count.innerHTML = "";
    word.innerHTML = "";
    orig.innerHTML = "";
    play_btn.style.visibility = "visible";
    word_char = 0;
    random = 0;
    char_num = 0;
    document.getElementById('endaudio').pause();
    document.getElementById('endaudio').currentTime = 0;
    document.getElementById('endaudio').play();
}
document.onkeydown = function (e) {
    if (now_game) {
        if (e.keyCode == 189) {
            keyStr = "-";
        } else if (e.keyCode == 188) {
            keyStr = ","
        } else {
            var keyStr = String.fromCharCode(e.keyCode);
            keyStr = keyStr.toLowerCase();
        }
        if (keyStr == word_char) {
            word.innerHTML = "<span style='color: #2196f3;'>" + wordlist[random].substr(0, char_num + 1) + "</span>" + wordlist[random].substr(char_num + 1, wordlist[random].length);
            document.getElementById('missaudio').pause();
            document.getElementById('missaudio').currentTime = 0;
            document.getElementById('correctaudio').pause();
            document.getElementById('correctaudio').currentTime = 0;
            document.getElementById('correctaudio').play();
            char_num++;
            correct++;
            charInsort();
        } else {
            document.getElementById('missaudio').pause();
            document.getElementById('missaudio').currentTime = 0;
            document.getElementById('correctaudio').pause();
            document.getElementById('correctaudio').currentTime = 0;
            mistake++;
            document.getElementById('missaudio').play();
        }
        if (char_num == wordlist[random].length) {
            char_num = 0;
            wordDisplay();
        }
    }
};
