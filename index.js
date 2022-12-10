const btnConvert = document.getElementById('convert');
const infoch = document.getElementById('info-ch')
var aMensajes = [];

function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('es-Es', {
      month: 'long',
    });
}

let dropArea = document.getElementById('drop_zone')
dropArea.addEventListener('dragleave', handlerFunction, false)
dropArea.addEventListener('dragover', handlerFunction, false)
dropArea.addEventListener('drop', handlerFunction, false)

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}
;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files)
}

function handleFiles(files) {
    ([...files]).forEach(f => CalcularEstadisticas(f))
}
  


function CalcularEstadisticas(file){
    var aMensajes = [];
    Usuario.aUsuarios = [];
    var ul = document.getElementsByTagName('ul')[0];
    if(ul != null) ul.remove();
    var reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener('load', () => {
        console.log(reader.result);
        aMsg = reader.result.split('\n');;
        for(msg of aMsg){
           if(msg != null && msg.length > 20) aMensajes.push(new Mensaje(msg));
        }
        var chat = new Chat(aMensajes);
        console.log(chat);
        infoch.innerHTML = `<h3 id="Usuarios"><b>Conversación entre ${Usuario.aUsuarios[0].getNombre()} y ${Usuario.aUsuarios[1].getNombre()} </b></h3>
        <div>
            <div id="output">
                <p>Mensajes totales: ${aMensajes.length}</p>
                <p>Fecha con más mensajes: ${chat.FechaMasMensajes()}</p>
                <p>Día del mes que mas habláis: ${chat.DiaMasMensajes()}</p>
                <p>Mes del año que mas habláis: ${toMonthName(chat.MesMasMensajes())}</p>
                <p>Año con más mensajes: ${chat.AñoMasMensajes()}</p>
                <p>Día de la semana que mas habláis: ${(chat.DiaSemanaMasMensajes())}</p>
                <p>Usuario con más mensajes: ${chat.UsuarioMasMensajes()}</p>
                <p>Usuario con más palabras: ${chat.UsuarioMasPalabras()}</p>
            </div>
            <canvas id="msgxdia" style="background: white; width: 40%"></canvas>
            <canvas id="msgxmes" style="background: white; width: 40%"></canvas>
            <canvas id="msgxuser" style="background: white; width: 40%"></canvas>
            <button class="button" id="btnConvert" onclick="GenerarImagen()">Exportar a PNG</button>
        </div>`;
        new Chart(document.getElementById("msgxdia"), {
            type: 'bar',
            data: {
              labels: Object.keys(chat.sDiaSemanaFrecuencia()),
              datasets: [{
                label: 'Mensajes por día de la semana',
                data: Object.values(chat.sDiaSemanaFrecuencia()),
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
        });
        new Chart(document.getElementById("msgxuser"), {
            type: 'bar',
            data: {
              labels: Object.keys(chat.UsuarioFrecuencia()),
              datasets: [{
                label: 'Mensajes por usuario',
                data: Object.values(chat.UsuarioFrecuencia()),
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
        });
        new Chart(document.getElementById("msgxmes"), {
            type: 'bar',
            data: {
              labels: Object.keys(chat.sMesFrecuencia()),
              datasets: [{
                label: 'Mensajes por mes',
                data: Object.values(chat.MesFrecuencia()),
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
        });

        document.getElementById('info').style.visibility = 'visible';
    });
}

function GenerarImagen(){
    const btn = document.getElementById("btnConvert");
    btn.style.visibility = 'hidden';
    console.log("Generando imagen");
    $objetivo = document.querySelector("#info-ch")
    html2canvas($objetivo).then(canvas => {
        //document.body.appendChild(canvas)
        var img = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = img;
        link.click();
    });
    btn.style.visibility = 'visible';
}



