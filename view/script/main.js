const appvar = "1.0.0";
document.getElementById("var").innerHTML = appvar;

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

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
});
/*document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});*/