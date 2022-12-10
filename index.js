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

function handleFiles(files) {
    ([...files]).forEach(f => CalcularEstadisticas(f))
}
  


function CalcularEstadisticas(file){
    try{    
        var aMensajes = [];
        var aUsuarios = [];
        var ul = document.getElementsByTagName('ul')[0];
        if(ul != null) ul.remove();
        window.alert("Prelectura");
        var reader = new FileReader();
        reader.readAsText(file);
        window.alert("Lectura");
        reader.addEventListener('load', () => {
            window.alert(reader.result);
            aMsg = reader.result.split('\n');
            window.alert("Spliteado");
            for(msg of aMsg){
                if(msg != null && msg.length > 20) aMensajes.push(new Mensaje(msg));
            }
            window.alert("Pre-Chat");
            var chat = new Chat(aMensajes);
            console.log(chat);
            window.alert(chat.NumMensajes());
            aUsuarios = chat.getUsuarios();
            infoch.innerHTML = `<h3 id="Usuarios"><b>Conversación entre ${aUsuarios[0].getNombre()} y ${aUsuarios[1].getNombre()} </b></h3>
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
    catch(e){
        window.alert("Error al procesar el archivo " + e);
    }
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

class Usuario{
    static aUsuarios = [];
    _sNombre;

    constructor(nombre) {
        this._sNombre = nombre;
    }
    
    getNombre(){ return this._sNombre; }
    static getUsuarios(){ return Usuario.aUsuarios; }
    static setUsuarios(usuarios){ Usuario.aUsuarios = usuarios; }

    static exiseUsuario(nombre){
        for(var _usuario of Usuario.aUsuarios){
            if(_usuario._sNombre == nombre) return true;
        }
        return false;
    }

    static buscarUsuario(nombre){
        for(var _usuario of Usuario.aUsuarios){
            if(_usuario._sNombre == nombre) return _usuario;
        }
        throw new Error('No se ha encontrado el usuario');
    }
}

class Chat{
    _aMensajes;
    _aUsuarios;
    _iDiaFreq = [0];
    _iMesFreq = [0];
    _iAñoFreq = [0];
    _iSemanaFreq = [0];
    _iDiaSemanaFreq = [];
    _daFechaFreq = {};
    _userMsgFreq = {};
    _userPalabraFreq = {};

    constructor(mensajes){
        this._aMensajes = mensajes.filter(m => m != null);
        for(var i = 0; i < 31; i++){ this._iDiaFreq.push(0); }
        for(var i = 0; i < 12; i++){ this._iMesFreq.push(0); }
        for(var i = 0; i < 100; i++){ this._iAñoFreq.push(0); }
        for(var msg of this._aMensajes){
            this._iDiaFreq[msg.getDia()]++;
            this._iMesFreq[msg.getMes()]++;
            this._iAñoFreq[msg.getAño()]++;
            this._daFechaFreq[`${msg.getDia()}/${msg.getMes()}/${msg.getAño()}`] = this._daFechaFreq[`${msg.getDia()}/${msg.getMes()}/${msg.getAño()}`] == null ? 1 : this._daFechaFreq[`${msg.getDia()}/${msg.getMes()}/${msg.getAño()}`] + 1;
            this._iDiaSemanaFreq[`${msg.getDiaSemana()}`] = this._iDiaSemanaFreq[`${msg.getDiaSemana()}`] == null ? 1 : this._iDiaSemanaFreq[`${msg.getDiaSemana()}`] + 1;
            this._userMsgFreq[`${msg.getUsuario().getNombre()}`] = this._userMsgFreq[`${msg.getUsuario().getNombre()}`] == null ? 1 : this._userMsgFreq[`${msg.getUsuario().getNombre()}`] + 1;
            this._userPalabraFreq[`${msg.getUsuario().getNombre()}`] = this._userPalabraFreq[`${msg.getUsuario().getNombre()}`] == null ? msg.getNumPalabras() : this._userPalabraFreq[`${msg.getUsuario().getNombre()}`] + msg.getNumPalabras();
            this._aUsuarios = Usuario.getUsuarios();
        }
    }

    
    push(){ 
        this._aMensajes.push(msg);
        this.ActualizarFrecuencias();
    }

    ActualizarFrecuencias(){         
        for(var msg of this._aMensajes){
            if(msg.getDia() > 0 && msg.getDia() < 32)
            this._iDiaFreq[msg.getDia()]++;
            if(msg.getMes() > 0 && msg.getMes() < 13)
            this._iMesFreq[msg.getMes()]++;
            if(msg.getAño() > 0 && msg.getAño() < 100)
            this._iAñoFreq[msg.getAño()]++;
        }
    }

    static ConvertirDiaString(sDia){
        var iDia = parseInt(sDia);
        switch(iDia){
            case 0: return "Domingo";
            case 1 : return "Lunes";
            case 2 : return "Martes";
            case 3 : return "Miercoles";
            case 4 : return "Jueves";
            case 5 : return "Viernes";
            case 6 : return "Sabado";
        }
    }

    static ConvertirMesString(sMes){
        var iMes = parseInt(sMes);
        switch(iMes){
            case 0: return "Enero";
            case 1 : return "Febrero";
            case 2 : return "Marzo";
            case 3 : return "Abril";
            case 4 : return "Mayo";
            case 5 : return "Junio";
            case 6 : return "Julio";
            case 7 : return "Agosto";
            case 8 : return "Septiembre";
            case 9 : return "Octubre";
            case 10 : return "Noviembre";
            case 11 : return "Diciembre";
        }
    }

    getUsuarios(){ return this._aUsuarios; }
    getMensajes(){ return this._aMensajes; }
    NumMensajes(){ return this._aMensajes.length; }
    DiaMasMensajes(){ return  this._iDiaFreq.indexOf(Math.max.apply(0, this._iDiaFreq.slice(1, 32))); }
    MesMasMensajes(){ return  this._iMesFreq.indexOf(Math.max.apply(0,this._iMesFreq.slice(1, 13))); }
    MesFrecuencia() { return this._iMesFreq.slice(1,13)}
    sMesFrecuencia() {
        var v = {}; self = this;
        Object.keys(this._iMesFreq.slice(1,13)).forEach(d => v[Chat.ConvertirMesString(d)] = self._iMesFreq[d]);
        return v;
    }
    AñoMasMensajes(){ return  this._iAñoFreq.indexOf(Math.max.apply(0,this._iAñoFreq.slice(1, 101))); }
    FechaMasMensajes() { return Object.keys(this._daFechaFreq).reduce((a, b) => this._daFechaFreq[a] > this._daFechaFreq[b] ? a : b); }
    DiaSemanaFrecuencia() { return this._iDiaSemanaFreq.slice(0,8)}
    sDiaSemanaFrecuencia() { 
        var v = {}; self = this;
        Object.keys(this._iDiaSemanaFreq.slice(0,8)).forEach(d => v[Chat.ConvertirDiaString(d)] = self._iDiaSemanaFreq[d]);
        return v;
    }
    DiaSemanaMasMensajes() { return Chat.ConvertirDiaString(Object.keys(this._iDiaSemanaFreq).reduce((a, b) => this._iDiaSemanaFreq[a] > this._iDiaSemanaFreq[b] ? a : b)); }
    UsuarioFrecuencia() { return this._userMsgFreq; }
    UsuarioMasMensajes() { return Object.keys(this._userMsgFreq).reduce((a, b) => this._userMsgFreq[a] > this._userMsgFreq[b] ? a : b); }
    UsuarioMasPalabras() { return Object.keys(this._userPalabraFreq).reduce((a, b) => this._userPalabraFreq[a] > this._userPalabraFreq[b] ? a : b); }
}

class Mensaje{
    _dFecha;
    _iAño;
    _iMes;
    _iDia;
    _dHora;
    _iNumPalabras;
    _sUsuario;
    _sMensaje;
    _sMensajeOriginal;
    static _userUltMsg;

    constructor(msg){
        this._sMensajeOriginal = msg;
        var [info, ..._msg] = msg.split(']');
        _msg = _msg.join(']');

        
        var sUsuario = _msg.split(':')[0];
        if(!Usuario.exiseUsuario(sUsuario)){
            if(Usuario.aUsuarios.length < 2){
                //TODO: Si es una conversación entre dos y existen ya dos usuarios preguntar a cual de los dos pertenece el mensaje
                var usuario = new Usuario(sUsuario)
                Usuario.aUsuarios.push(usuario);
                this._sUsuario = usuario;
                Mensaje._userUltMsg = usuario;
            }
            else this._sUsuario = Mensaje._userUltMsg;
        }
        else{
            this._sUsuario = Usuario.buscarUsuario(sUsuario);
            Mensaje._userUltMsg = Usuario.buscarUsuario(sUsuario);
        }
        
        this._sMensaje = _msg.split(':')[1];
        
        var fecha, hora;
        info.split(' ')[0].slice(1).substr(0, 1) == '[' ?  fecha = info.split(' ')[0].slice(2) : fecha = info.split(' ')[0].slice(1);
        this._dHora = info.split(' ')[1];
        this._iAño = parseInt(fecha.split('/')[2]);
        this._iMes = parseInt(fecha.split('/')[1]);
        this._iDia = parseInt(fecha.split('/')[0]);
        this._dFecha = new Date(this._iAño, this._iMes, this._iDia);
        if(typeof this._sMensaje != 'undefined')
            this._iNumPalabras = this._sMensaje.split(' ').length;

        if(_msg == null || _msg.length < 1 || this._dFecha == null || this._sUsuario == null) return null;
    }

    getDia(){ return this._iDia; }
    getMes(){ return this._iMes; }
    getAño(){ return this._iAño; }
    getDiaSemana(){ return  this._dFecha.getDay(); }
    getNumPalabras(){ return this._iNumPalabras; }
    getUsuario(){ return this._sUsuario; }
    toString(){ return `Fecha: ${this._iDia}/${this._iMes}/${this._iAño}, Hora: ${this._dHora} - ${this._sUsuario.getNombre()}: ${this._sMensaje}`; }

}

