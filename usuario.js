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