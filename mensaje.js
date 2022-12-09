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
        if(Usuario.aUsuarios.length < 2 && !Usuario.exiseUsuario(sUsuario)){
            //TODO: Si es una conversación entre dos y existen ya dos usuarios preguntar a cual de los dos pertenece el mensaje
            var usuario = new Usuario(sUsuario)
            Usuario.aUsuarios.push(usuario);
            this._sUsuario = usuario;
            Mensaje._userUltMsg = usuario;
        }
        else if(Usuario.aUsuarios.length >= 2){
            this._sUsuario = Mensaje._userUltMsg;
        }
        else{
            this._sUsuario = Usuario.buscarUsuario(sUsuario);
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