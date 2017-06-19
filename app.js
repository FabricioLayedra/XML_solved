var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/XML');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            lista =document.getElementById("lista-canciones")
            while (lista.hasChildNodes())
                lista.removeChild(lista.firstChild);
            let xmldoc = http_request.responseXML;
            let root_node = xmldoc.getElementsByTagName('cancion');
            txt = "Estas son sus canciones!";
            for (i = 0; i < root_node.length; i++) {
                let fila = document.createElement("LI");
                let content = document.createTextNode(root_node[i].getAttribute("titulo"));
                fila.appendChild(content);
                lista.appendChild(fila);
            }
            alert(txt);

        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('datos.xml');
    }
}
