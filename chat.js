class Chat{
    _aMensajes;
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

    getMensajes(){ return this._aMensajes; }
    NumMensajes(){ return this._aMensajes.length; }
    DiaMasMensajes(){ return  this._iDiaFreq.indexOf(Math.max.apply(0, this._iDiaFreq.slice(1, 32))); }
    MesMasMensajes(){ return  this._iMesFreq.indexOf(Math.max.apply(0,this._iMesFreq.slice(1, 13))); }
    AñoMasMensajes(){ return  this._iAñoFreq.indexOf(Math.max.apply(0,this._iAñoFreq.slice(1, 101))); }
    FechaMasMensajes() { return Object.keys(this._daFechaFreq).reduce((a, b) => this._daFechaFreq[a] > this._daFechaFreq[b] ? a : b); }
    DiaSemanaFrecuencia() { return this._iDiaSemanaFreq.slice(0,8)}
    sDiaSemanaFrecuencia() { 
        var v = {}; self = this;
        Object.keys(this._iDiaSemanaFreq.slice(0,8)).forEach(d => v[Chat.ConvertirDiaString(d)] = self._iDiaSemanaFreq[d]);
        return v;
    }
    DiaSemanaMasMensajes() { return Chat.ConvertirDiaString(Object.keys(this._iDiaSemanaFreq).reduce((a, b) => this._iDiaSemanaFreq[a] > this._iDiaSemanaFreq[b] ? a : b)); }
    UsuarioMasMensajes() { return Object.keys(this._userMsgFreq).reduce((a, b) => this._userMsgFreq[a] > this._userMsgFreq[b] ? a : b); }
    UsuarioMasPalabras() { return Object.keys(this._userPalabraFreq).reduce((a, b) => this._userPalabraFreq[a] > this._userPalabraFreq[b] ? a : b); }
}