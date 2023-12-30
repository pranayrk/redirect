async function GenerateQRCodes(start, end) {
    if (isNaN(start) || isNaN(end)) {
        return;
    }

    if (start.toString().length != 5 || end.toString().length != 5) {
        return;
    }

    if (start > end) {
        let temp = end;
        start = end;
        end = temp;
    }


    document.getElementById("form").remove();

    const QrDiv = document.getElementById("qrcode");

    for (i = start; i <= end; i++) {

        let div_i = document.createElement("div");
        div_i.id = "div-" + i;
        QrDiv.appendChild(div_i);
        div_i.innerHTML = "<p>" + i + "</p>";

        let qrcode = new QRCode('div-' + i, {
            text: "https://pranayrk.github.io/redirect/?redirect=" + i,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        await new Promise(r => setTimeout(r, 200));
    }

}