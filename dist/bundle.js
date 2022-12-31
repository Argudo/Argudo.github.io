(()=>{"use strict";class e{static aUsuarios=[];_sNombre;constructor(e){this._sNombre=e}getNombre(){return this._sNombre}static getUsuarios(){return e.aUsuarios}static setUsuarios(s){e.aUsuarios=s}static exiseUsuario(s){for(var a of e.aUsuarios)if(a._sNombre==s)return!0;return!1}static buscarUsuario(s){for(var a of e.aUsuarios)if(a._sNombre==s)return a;throw new Error("No se ha encontrado el usuario")}}class s{_dFecha;_iAño;_iMes;_iDia;_dHora;_iNumPalabras;_sUsuario;_sMensaje;_sMensajeOriginal;static _userUltMsg;constructor(a){this._sMensajeOriginal=a;var r,[t,...i]=a.split("]"),n=(i=i.join("]")).split(":")[0];if(e.exiseUsuario(n))this._sUsuario=e.buscarUsuario(n),s._userUltMsg=e.buscarUsuario(n);else if(e.aUsuarios.length<2){var u=new e(n);e.aUsuarios.push(u),this._sUsuario=u,s._userUltMsg=u}else this._sUsuario=s._userUltMsg;if(this._sMensaje=i.split(":")[1],r="["==t.split(" ")[0].slice(1).substr(0,1)?t.split(" ")[0].slice(2):t.split(" ")[0].slice(1),this._dHora=t.split(" ")[1],this._iAño=parseInt(r.split("/")[2]),this._iMes=parseInt(r.split("/")[1]),this._iDia=parseInt(r.split("/")[0]),this._dFecha=new Date(this._iAño,this._iMes,this._iDia),void 0!==this._sMensaje&&(this._iNumPalabras=this._sMensaje.split(" ").length),null==i||i.length<1||null==this._dFecha||null==this._sUsuario)return null}getDia(){return this._iDia}getMes(){return this._iMes}getAño(){return this._iAño}getDiaSemana(){return this._dFecha.getDay()}getNumPalabras(){return this._iNumPalabras}getUsuario(){return this._sUsuario}toString(){return`Fecha: ${this._iDia}/${this._iMes}/${this._iAño}, Hora: ${this._dHora} - ${this._sUsuario.getNombre()}: ${this._sMensaje}`}}class a{_aMensajes;_aUsuarios;_iDiaFreq=[0];_iMesFreq=[0];_iAñoFreq=[0];_iSemanaFreq=[0];_iDiaSemanaFreq=[];_daFechaFreq={};_userMsgFreq={};_userPalabraFreq={};constructor(s){this._aMensajes=s.filter((e=>null!=e));for(var a=0;a<31;a++)this._iDiaFreq.push(0);for(a=0;a<12;a++)this._iMesFreq.push(0);for(a=0;a<100;a++)this._iAñoFreq.push(0);for(var r of this._aMensajes)this._iDiaFreq[r.getDia()]++,this._iMesFreq[r.getMes()]++,this._iAñoFreq[r.getAño()]++,this._daFechaFreq[`${r.getDia()}/${r.getMes()}/${r.getAño()}`]=null==this._daFechaFreq[`${r.getDia()}/${r.getMes()}/${r.getAño()}`]?1:this._daFechaFreq[`${r.getDia()}/${r.getMes()}/${r.getAño()}`]+1,this._iDiaSemanaFreq[`${r.getDiaSemana()}`]=null==this._iDiaSemanaFreq[`${r.getDiaSemana()}`]?1:this._iDiaSemanaFreq[`${r.getDiaSemana()}`]+1,this._userMsgFreq[`${r.getUsuario().getNombre()}`]=null==this._userMsgFreq[`${r.getUsuario().getNombre()}`]?1:this._userMsgFreq[`${r.getUsuario().getNombre()}`]+1,this._userPalabraFreq[`${r.getUsuario().getNombre()}`]=null==this._userPalabraFreq[`${r.getUsuario().getNombre()}`]?r.getNumPalabras():this._userPalabraFreq[`${r.getUsuario().getNombre()}`]+r.getNumPalabras(),this._aUsuarios=e.getUsuarios()}push(){this._aMensajes.push(msg),this.ActualizarFrecuencias()}ActualizarFrecuencias(){for(var e of this._aMensajes)e.getDia()>0&&e.getDia()<32&&this._iDiaFreq[e.getDia()]++,e.getMes()>0&&e.getMes()<13&&this._iMesFreq[e.getMes()]++,e.getAño()>0&&e.getAño()<100&&this._iAñoFreq[e.getAño()]++}static ConvertirDiaString(e){switch(parseInt(e)){case 0:return"Domingo";case 1:return"Lunes";case 2:return"Martes";case 3:return"Miercoles";case 4:return"Jueves";case 5:return"Viernes";case 6:return"Sabado"}}static ConvertirMesString(e){switch(parseInt(e)){case 0:return"Enero";case 1:return"Febrero";case 2:return"Marzo";case 3:return"Abril";case 4:return"Mayo";case 5:return"Junio";case 6:return"Julio";case 7:return"Agosto";case 8:return"Septiembre";case 9:return"Octubre";case 10:return"Noviembre";case 11:return"Diciembre"}}getUsuarios(){return this._aUsuarios}getMensajes(){return this._aMensajes}NumMensajes(){return this._aMensajes.length}DiaMasMensajes(){return this._iDiaFreq.indexOf(Math.max.apply(0,this._iDiaFreq.slice(1,32)))}MesMasMensajes(){return this._iMesFreq.indexOf(Math.max.apply(0,this._iMesFreq.slice(1,13)))}MesFrecuencia(){return this._iMesFreq.slice(1,13)}sMesFrecuencia(){var e={};return self=this,Object.keys(this._iMesFreq.slice(1,13)).forEach((s=>e[a.ConvertirMesString(s)]=self._iMesFreq[s])),e}AñoMasMensajes(){return this._iAñoFreq.indexOf(Math.max.apply(0,this._iAñoFreq.slice(1,101)))}FechaMasMensajes(){return Object.keys(this._daFechaFreq).reduce(((e,s)=>this._daFechaFreq[e]>this._daFechaFreq[s]?e:s))}DiaSemanaFrecuencia(){return this._iDiaSemanaFreq.slice(0,8)}sDiaSemanaFrecuencia(){var e={};return self=this,Object.keys(this._iDiaSemanaFreq.slice(0,8)).forEach((s=>e[a.ConvertirDiaString(s)]=self._iDiaSemanaFreq[s])),e}DiaSemanaMasMensajes(){return a.ConvertirDiaString(Object.keys(this._iDiaSemanaFreq).reduce(((e,s)=>this._iDiaSemanaFreq[e]>this._iDiaSemanaFreq[s]?e:s)))}UsuarioFrecuencia(){return this._userMsgFreq}UsuarioMasMensajes(){return Object.keys(this._userMsgFreq).reduce(((e,s)=>this._userMsgFreq[e]>this._userMsgFreq[s]?e:s))}UsuarioMasPalabras(){return Object.keys(this._userPalabraFreq).reduce(((e,s)=>this._userPalabraFreq[e]>this._userPalabraFreq[s]?e:s))}}document.getElementById("convert");const r=document.getElementById("info-ch");document.getElementsByClassName("fileUpload")[0].addEventListener("change",(function(){var t;t=this.files,[...t].forEach((t=>function(t){var i=[];e.aUsuarios=[];var n=document.getElementsByTagName("ul")[0];null!=n&&n.remove();var u=new FileReader;u.readAsText(t),u.addEventListener("load",(()=>{console.log(u.result);var t=u.result.split("\n");for(var n of t)null!=n&&n.length>20&&i.push(new s(n));var o=new a(i);console.log(o),r.innerHTML=`<h3 id="Usuarios"><b>Conversación entre ${e.aUsuarios[0].getNombre()} y ${e.aUsuarios[1].getNombre()} </b></h3>\n        <div>\n            <div id="output">\n                <p>Mensajes totales: ${i.length}</p>\n                <p>Fecha con más mensajes: ${o.FechaMasMensajes()}</p>\n                <p>Día del mes que mas habláis: ${o.DiaMasMensajes()}</p>\n                <p>Mes del año que mas habláis: ${function(e){const s=new Date;return s.setMonth(e-1),s.toLocaleString("es-Es",{month:"long"})}(o.MesMasMensajes())}</p>\n                <p>Año con más mensajes: ${o.AñoMasMensajes()}</p>\n                <p>Día de la semana que mas habláis: ${o.DiaSemanaMasMensajes()}</p>\n                <p>Usuario con más mensajes: ${o.UsuarioMasMensajes()}</p>\n                <p>Usuario con más palabras: ${o.UsuarioMasPalabras()}</p>\n            </div>\n            <canvas id="msgxdia" style="background: white; width: 40%"></canvas>\n            <canvas id="msgxmes" style="background: white; width: 40%"></canvas>\n            <canvas id="msgxuser" style="background: white; width: 40%"></canvas>\n            <button class="button" id="btnConvert" onclick="GenerarImagen()">Exportar a PNG</button>\n        </div>`,new Chart(document.getElementById("msgxdia"),{type:"bar",data:{labels:Object.keys(o.sDiaSemanaFrecuencia()),datasets:[{label:"Mensajes por día de la semana",data:Object.values(o.sDiaSemanaFrecuencia()),borderWidth:1}]},options:{scales:{y:{beginAtZero:!0}}}}),new Chart(document.getElementById("msgxuser"),{type:"bar",data:{labels:Object.keys(o.UsuarioFrecuencia()),datasets:[{label:"Mensajes por usuario",data:Object.values(o.UsuarioFrecuencia()),borderWidth:1}]},options:{scales:{y:{beginAtZero:!0}}}}),new Chart(document.getElementById("msgxmes"),{type:"bar",data:{labels:Object.keys(o.sMesFrecuencia()),datasets:[{label:"Mensajes por mes",data:Object.values(o.MesFrecuencia()),borderWidth:1}]},options:{scales:{y:{beginAtZero:!0}}}}),document.getElementById("info").style.visibility="visible"}))}(t)))})),document.getElementById("drop_zone")})();