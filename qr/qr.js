async function GenerateQRCodes(start, end) {
    if (isNaN(start) || isNaN(end)) {
        alert("Check numbers");
        return;
    }

    if (start.toString().length != 5 || end.toString().length != 5) {
        alert("Check numbers");
        return;
    }

    if (start > end) {
        let temp = end;
        start = end;
        end = temp;
    }


    document.getElementById("form").remove();

    const QrDiv = document.getElementById("qrcodes");

    for (i = start; i <= end; i++) {

        let div_i = document.createElement("div");
        div_i.id = "div-" + i;
        div_i.className = "qrcode";
        QrDiv.appendChild(div_i);
        div_i.innerHTML = "<p style=\"text-align:center;\">" + i + "</p>";

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
    alert("done");

}