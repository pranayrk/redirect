const MAP_REPO = "https://pranayrk.github.io/redirect/redirect/";

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

async function RedirectTo(redirFull) {
    if (!redirFull) {
        return;
    }
    const series = redirFull.substring(0, 1);
    const redir = redirFull.substring(1,);
    if (redir.length < 5) {
        return;
    }
    console.log(MAP_REPO + series + "/" + redir.substring(0, 2) + ".map.yml");
    fetch(MAP_REPO + series + "/" + redir.substring(0, 2) + ".map.yml")
        .then(res => res.text())
        .then(textString => {
            if (!textString) {
                return;
            }
            mapping = YAML.parse(textString);
            if (!mapping) {
                return;
            }
            window.location.href = mapping[redir];
        });
}


RedirectTo(GetURLParameter("redirect"));