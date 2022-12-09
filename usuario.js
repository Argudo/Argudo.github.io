class Usuario{
    static aUsuarios = [];
    _sNombre;

    constructor(nombre) {
        this._sNombre = nombre;
    }
    
    getNombre(){ return this._sNombre; }

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