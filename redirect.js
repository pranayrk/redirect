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

async function RedirectTo(redir) {
    console.log(redir);
    if (redir.length < 5) {
        return;
    }
    console.log(MAP_REPO + redir.substring(0, 2) + ".map.yml");
    fetch(MAP_REPO + redir.substring(0, 2) + ".map.yml")
        .then(res => res.text())
        .then(textString => {
            mapping = YAML.parse(textString);
            console.log(mapping[redir]);
            window.location.href = mapping[redir];
        });
}


RedirectTo(GetURLParameter("redirect"));