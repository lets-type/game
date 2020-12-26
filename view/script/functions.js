function sett_adap() {
    set_lang(document.getElementById("lang_list").value);
    set_config(document.getElementById("lang_list").value);
}

function set_config(lang) {
    const config = {
        "lang_code": lang
    }
    fs.writeFileSync("./config.json",JSON.stringify(config));
}