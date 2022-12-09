const btnConvert = document.getElementById('convert');
const pOutput = document.getElementById('output');
var aMensajes = [];

function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('es-Es', {
      month: 'long',
    });
}

let dropArea = document.getElementById('drop_zone')
dropArea.addEventListener('dragenter', handlerFunction, false)
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
        pOutput.innerHTML = `<p id="Usuarios"><b>Conversación entre ${Usuario.aUsuarios[0].getNombre()} y ${Usuario.aUsuarios[1].getNombre()} </b></p>`;
        pOutput.innerHTML += `<p>Mensajes totales: ${aMensajes.length}</p>`;
        pOutput.innerHTML += `<p>Fecha con más mensajes: ${chat.FechaMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Día del mes que mas habláis: ${chat.DiaMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Mes del año que mas habláis: ${toMonthName(chat.MesMasMensajes())}</p>`;
        pOutput.innerHTML += `<p>Año con más mensajes: ${chat.AñoMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Día de la semana que mas habláis: ${(chat.DiaSemanaMasMensajes())}</p>`;
        pOutput.innerHTML += `<p>Usuario que más habla: ${chat.UsuarioMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Usuario con más palabras: ${chat.UsuarioMasPalabras()}</p>`;
        console.log(aMensajes);

        var myBarchart = new Barchart(
            {
                canvas:myCanvas,
                seriesName:"Mensajes por día de la semana",
                padding:20,
                gridScale:5,
                gridColor:"#eeeeee",
                data:chat.sDiaSemanaFrecuencia(),
                colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
            }
        );

        myBarchart.draw();
        document.getElementById('info').style.visibility = 'visible';
    });
}


btnConvert.addEventListener('click', () => {
    var aMensajes = [];
    Usuario.aUsuarios = [];
    var ul = document.getElementsByTagName('ul')[0];
    if(ul != null) ul.remove();
    var reader = new FileReader();
    reader.readAsText(document.getElementById('file').files[0]);
    reader.addEventListener('load', () => {
        console.log(reader.result);
        aMsg = reader.result.split('\n');;
        for(msg of aMsg){
           if(msg != null && msg.length > 20) aMensajes.push(new Mensaje(msg));
        }
        var chat = new Chat(aMensajes);
        console.log(chat);
        pOutput.innerHTML = `<p>Usuario: ${Usuario.aUsuarios[0].getNombre()}</p>`;
        pOutput.innerHTML += `<p>Usuario: ${Usuario.aUsuarios[1].getNombre()}</p>`;
        pOutput.innerHTML += `<p>Mensajes totales: ${aMensajes.length}</p>`;
        pOutput.innerHTML += `<p>Fecha con más mensajes: ${chat.FechaMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Día del mes que mas habláis: ${chat.DiaMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Mes del año que mas habláis: ${toMonthName(chat.MesMasMensajes())}</p>`;
        pOutput.innerHTML += `<p>Año con más mensajes: ${chat.AñoMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Día de la semana que mas habláis: ${(chat.DiaSemanaMasMensajes())}</p>`;
        pOutput.innerHTML += `<p>Usuario que más habla: ${chat.UsuarioMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Usuario con más palabras: ${chat.UsuarioMasPalabras()}</p>`;
        console.log(aMensajes);

        var myBarchart = new Barchart(
            {
                canvas:myCanvas,
                seriesName:"Mensajes por día de la semana",
                padding:20,
                gridScale:5,
                gridColor:"#eeeeee",
                data:chat.sDiaSemanaFrecuencia(),
                colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
            }
        );

        myBarchart.draw();
    });
});


