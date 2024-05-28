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
    let series = redirFull.substring(0, 2);
    const redir = redirFull.substring(2,);
    if(!series.match(/[a-zA-Z]{2}/i)) {
        return;
    }
    series = series.toLowerCase();
    if (redir.length < 5) {
        return;
    }
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
                const redirectTo = mapping[redir];
                if(redirectTo instanceof String) {
                    window.open(redirectTo, '_blank');
                    return;
                }
                if(redirectTo instanceof Array) {
                    replaceHTML = "<ul id=\"links\">";
                    redirectTo.forEach((link) => {
                            if(typeof link == 'string') {
                               replaceHTML += "<li><a href=\""+ link +"\">" + link + "</a></li>"; 
                            }
                            else if(link instanceof Object) {
                                if('link' in link) {
                                    const linkto = link['link'].trim();
                                    let name = "";
                                    if('name' in link) {
                                        name = link['name'].trim();
                                    }
                                    else {
                                        name = linkto;
                                    }
                                    replaceHTML += "<li><a href=\" " + linkto + " \">" + name + "</a></li>";
                                 }
                            }
                        });
                    replaceHTML += "</ul>"
                    document.body.innerHTML = replaceHTML;
                    return;
                }
                if(redirectTo instanceof Object) {
                    replaceHTML = "";
                    if('link' in redirectTo) {
                        window.open(redirectTo['link'], '_blank');
                        return;
                    }
                    if('title' in redirectTo) {
                        replaceHTML += "<h2 id=\"title\">" + redirectTo['title'].trim() + "</h2>"
                    }
                    if('links' in redirectTo && redirectTo['links'] instanceof Array) {
                        replaceHTML += "<ul id=\"links\">";
                        redirectTo['links'].forEach((link) => {
                            if(typeof link == 'string') {
                               replaceHTML += "<li><a href=\""+ link.trim() +"\">" + link.trim() + "</a></li>"; 
                            }
                            else if(link instanceof Object) {
                                if('link' in link) {
                                    const linkto = link['link'].trim();
                                    let name = "";
                                    if('name' in link) {
                                        name = link['name'].trim();
                                    }
                                    else {
                                        name = linkto;
                                    }
                                    replaceHTML += "<li><a href=\" " + linkto + " \">" + name + "</a></li>";
                                 }
                            }
                        });
                        replaceHTML += "</ul>"
                    }
                    document.body.innerHTML = replaceHTML;
                    return;
                }
                });
}


RedirectTo(GetURLParameter("redirect"));
