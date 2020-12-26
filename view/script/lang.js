const fs = require("fs");
var language = "ja_jp";
var lang = JSON.parse(fs.readFileSync(`${__dirname}/languages/${language}.json`, "utf-8"));

fs.readdir(`${__dirname}/languages`, async (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    var temp = ""
    await files.forEach(file => {
        if (file.endsWith(".json")) {
            temp += `<option value="${file.match(/(.*)(\.json)$/)[1]}" ${(language == file.match(/(.*)(\.json)$/)[1])?"selected":""}>${JSON.parse(fs.readFileSync(`${__dirname}/languages/${file}`, "utf-8")).lang_name}</option>`
        }
    });
    document.getElementById("lang_list").innerHTML = temp;
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});

async function set_lang(lang_code) {
    language = lang_code;
    lang = await JSON.parse(fs.readFileSync(`${__dirname}/languages/${language}.json`, "utf-8"));

    document.title = lang.title;
    Object.keys(lang).forEach(function (key) {
        if (document.getElementById(key)) {
            document.getElementById(key).innerHTML = lang[key];
        }
    });

    load_word();
}

document.title = lang.title;
Object.keys(lang).forEach(function (key) {
    if (document.getElementById(key)) {
        document.getElementById(key).innerHTML = lang[key];
    }
});