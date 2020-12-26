const appvar = "1.0.1";
document.getElementById("var").innerHTML = appvar;

const $ = require(`${__dirname}/script/jquery-3.5.1.min.js`);

window.onload = function () {
    document.getElementsByClassName("loading")[0].classList.add("load-succ-a");
    setTimeout(() => {
        document.getElementsByClassName("loading")[0].classList.add("load-succ");
        document.getElementsByClassName("loading")[0].classList.remove("load-succ-a");
    }, 1000);
    
    if (fs.statSync(`${__dirname}/../config.json`)) {
        set_lang(JSON.parse(fs.readFileSync(`${__dirname}/../config.json`)).lang_code);
    }
};

$(function () {
    // #で始まるリンクをクリックしたら実行されます
    $('a[href^="#"]').click(function () {
        // スクロールの速度
        var speed = 400; // ミリ秒で記述
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
        return false;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
});
/*document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});*/