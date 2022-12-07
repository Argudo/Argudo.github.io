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

class Usuario{
    static aUsuarios = [];
    _sNombre;

    constructor(nombre) {
        this._sNombre = nombre;
    }
    
    getNombre(){ return this._sNombre; }

    exiseUsuario(nombre){
        for(var _usuario of Usuario.aUsuarios){
            if(_usuario._sNombre == nombre) return true;
        }
        return false;
    }

    buscarUsuario(nombre){
        for(var _usuario of Usuario.aUsuarios){
            if(_usuario._sNombre == nombre) return _usuario;
        }
        return null;
    }
}

class Mensaje{
    _iAño;
    _iMes;
    _iDia;
    _dHora;
    _sUsuario;
    _sMensaje;
    _sMensajeOriginal;

    constructor(msg){
        this._sMensajeOriginal = msg;
        var [info, ..._msg] = msg.split(']');
        _msg = _msg.join(']');

        var sUsuario = _msg.split(':')[0];
        if(!new Usuario().exiseUsuario(sUsuario)){
            //TODO: Si es una conversación entre dos y existen ya dos usuarios preguntar a cual de los dos pertenece el mensaje
            var usuario = new Usuario(sUsuario)
            Usuario.aUsuarios.push(usuario);
            this._sUsuario = usuario;
        }
        else
            this._sUsuario = new Usuario().buscarUsuario(sUsuario);

        this._sMensaje = _msg.split(':')[1];
        
        var fecha, hora;
        info.split(' ')[0].slice(1).substr(0, 1) == '[' ?  fecha = info.split(' ')[0].slice(2) : fecha = info.split(' ')[0].slice(1);
        this._dHora = info.split(' ')[1];
        this._iAño = parseInt(fecha.split('/')[2]);
        this._iMes = parseInt(fecha.split('/')[1]);
        this._iDia = parseInt(fecha.split('/')[0]);
    }

    getDia(){ return this._iDia; }
    getMes(){ return this._iMes; }
    getAño(){ return this._iAño; }
    toString(){ return `Fecha: ${this._iDia}/${this._iMes}/${this._iAño}, Hora: ${this._dHora} - ${this._sUsuario.getNombre()}: ${this._sMensaje}`; }

}

class Chat{
    _aMensajes;
    _iDiaFreq = [0];
    _iMesFreq = [0];
    _iAñoFreq = [0];
    _dFechaFreq = {};

    constructor(mensajes){
        this._aMensajes = mensajes;
        for(var i = 0; i < 31; i++){ this._iDiaFreq.push(0); }
        for(var i = 0; i < 12; i++){ this._iMesFreq.push(0); }
        for(var i = 0; i < 100; i++){ this._iAñoFreq.push(0); }
        for(var msg of this._aMensajes){
            this._iDiaFreq[msg.getDia()]++;
            this._iMesFreq[msg.getMes()]++;
            this._iAñoFreq[msg.getAño()]++;
            this._dFechaFreq[`${msg.getDia()}/${msg.getMes()}/${msg.getAño()}`] = this._dFechaFreq[`${msg.getDia()}/${msg.getMes()}/${msg.getAño()}`] == null ? 1 : this._dFechaFreq[`${msg.getDia()}/${msg.getMes()}/${msg.getAño()}`] + 1;
        }
    }

    getMensajes(){ return this._aMensajes; }
    NumMensajes(){ return this._aMensajes.length; }
    DiaMasMensajes(){ return  this._iDiaFreq.indexOf(Math.max.apply(0, this._iDiaFreq.slice(1, 32))); }
    MesMasMensajes(){ return  this._iMesFreq.indexOf(Math.max.apply(0,this._iMesFreq.slice(1, 13))); }
    AñoMasMensajes(){ return  this._iAñoFreq.indexOf(Math.max.apply(0,this._iAñoFreq.slice(1, 101))); }
    FechaMasMensajes() { return Object.keys(this._dFechaFreq).reduce((a, b) => this._dFechaFreq[a] > this._dFechaFreq[b] ? a : b); }
    
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
}


btnConvert.addEventListener('click', () => {
    var aMensajes = [];
    Usuario.aUsuarios = [];
    var reader = new FileReader();
    reader.readAsText(document.getElementById('file').files[0]);
    reader.addEventListener('load', () => {
        console.log(reader.result);
        aMsg = reader.result.split('\n');;
        for(msg of aMsg){
           if(msg != null && msg.length > 10) aMensajes.push(new Mensaje(msg));
        }
        var chat = new Chat(aMensajes);
        console.log(chat);
        pOutput.innerHTML = `<p>Usuario: ${Usuario.aUsuarios[0].getNombre()}</p>`;
        pOutput.innerHTML += `<p>Usuario: ${Usuario.aUsuarios[1].getNombre()}</p>`;
        pOutput.innerHTML += `<hr><p>Mensajes totales: ${aMensajes.length}</p>`;
        pOutput.innerHTML += `<p>Fecha con más mensajes: ${chat.FechaMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Día del mes que mas habláis: ${chat.DiaMasMensajes()}</p>`;
        pOutput.innerHTML += `<p>Mes del año que mas habláis: ${toMonthName(chat.MesMasMensajes())}</p>`;
        pOutput.innerHTML += `<p>Año con más mensajes: ${chat.AñoMasMensajes()}</p>`;
        console.log(aMensajes);
    });
});
