import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AlertsService } from './alerts.service';
import { TipoUsuario } from '../models/tipo-usuario';
import { Usuario } from '../models/usuario';
import { PreguntaSeguridad } from '../models/pregunta-seguridad';
import { ListadoUsuarios } from '../models/listado-usuarios';
import { ListadoMedicamentos } from '../models/listado-medicamentos';
import { CredencialesUsuario } from '../models/credenciales-usuario';
import { Alarma } from '../models/alarma';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
//Aqui vamos a definir todos los atributos que necitaremos

  //Variable de conexión
  private database!: SQLiteObject;

  //Variables de control del Estado de la base de datos
  public isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //Variables que contienen las sentencias de creación de tablas
  tabla_tipoUsuario = 'CREATE TABLE IF NOT EXISTS "TIPO_USUARIO" ("id_tipo" INTEGER PRIMARY KEY autoincrement, "nombre" TEXT NOT NULL);';

  tabla_medicamento = 'CREATE TABLE IF NOT EXISTS "MEDICAMENTO" ("id_medicamento" INTEGER PRIMARY KEY autoincrement,	"nombre" TEXT NOT NULL, "formato" INTEGER NOT NULL);';

  tabla_contactoEmergencia = 'CREATE TABLE IF NOT EXISTS "CONTACTO_EMERGENCIA" (	"id_contacto" INTEGER PRIMARY KEY autoincrement,	"nombre" TEXT NOT NULL,	"apellido_p" TEXT NOT NULL,	"apellido_m" TEXT NOT NULL,	"email" TEXT NOT NULL,	"direccion" TEXT NOT NULL, "telefono" TEXT NOT NULL,	"img_url" TEXT NOT NULL);';

  tabla_preguntaSeguridad = 'CREATE TABLE IF NOT EXISTS "PREGUNTA_SEGURIDAD" ("id_pregunta" INTEGER PRIMARY KEY autoincrement,	"pregunta" TEXT NOT NULL);';

  tabla_usuario = 'CREATE TABLE IF NOT EXISTS "USUARIO" ("id_usuario" INTEGER PRIMARY KEY autoincrement,	"email" TEXT NOT NULL UNIQUE,	"password" TEXT NOT NULL,	"nombre" TEXT NOT NULL,	"apellido_p" TEXT NOT NULL,	"apellido_m" TEXT NOT NULL,	"direccion" TEXT NOT NULL, "telefono" TEXT NOT NULL, "res_seguridad" TEXT NOT NULL, "id_pregunta" INTEGER NOT NULL, "id_tipo_usuario" INTEGER NOT NULL,	"id_cont_emergencia" INTEGER,	"img_url" BLOB, activo BOOLEAN NOT NULL,	FOREIGN KEY ("id_tipo_usuario") REFERENCES "TIPO_USUARIO"("id_tipo"),	FOREIGN KEY ("id_cont_emergencia") REFERENCES "CONTACTO_EMERGENCIA"("id_contacto"), FOREIGN KEY ("id_pregunta") REFERENCES "PREGUNTA_SEGURIDAD" ("id_pregunta"));';

  tabla_indicacion = 'CREATE TABLE IF NOT EXISTS "INDICACION" ("id_indicacion" INTEGER PRIMARY KEY autoincrement,	"id_medicamento" INTEGER NOT NULL,	"id_usuario" INTEGER NOT NULL,  "dosis" INTEGER NOT NULL,	"dias_tratamiento" INTEGER NOT NULL,	"nr_horas" INTEGER NOT NULL,	"medicamento_img" TEXT,	"receta_img" TEXT,	FOREIGN KEY ("id_usuario") REFERENCES "USUARIO"("id_usuario"), FOREIGN KEY ("id_medicamento") REFERENCES "MEDICAMENTO"("id_medicamento"));';

  tabla_alarma = 'CREATE TABLE IF NOT EXISTS "ALARMA" ("id_alarma" INTEGER PRIMARY KEY autoincrement, "id_indicacion" INTEGER NOT NULL,	"fecha_hora" TEXT NOT NULL, "status" INTEGER NOT NULL,	FOREIGN KEY ("id_indicacion") REFERENCES "INDICACION"("id_indicacion"));';

  //Variables que contiene las sentencias de población de tablas
  datos_tipoUsuario = "INSERT or IGNORE INTO tipo_usuario (id_tipo, nombre) VALUES (1, 'Autocuidado'), (2, 'Soporte');";

  datos_medicamento = "INSERT or IGNORE INTO medicamento (id_medicamento, nombre, formato) VALUES (1, 'Paracetamol', 500), (2, 'Ibuprofeno', 250), (3, 'Amoxicilina', 500), (4, 'Omeprazol', 100), (5, 'Bisoprolol', 2.5);";

  datos_preguntaSeguridad = "INSERT or IGNORE INTO pregunta_seguridad (id_pregunta, pregunta) VALUES (1, '¿Cual es el nombre de tu mascota?'), (2, '¿Cual es el nombre de tu primer amor?'), (3, '¿Cual es el nombre de tu mejor amigo?');";

  datos_usuario = "INSERT or IGNORE INTO usuario (id_usuario, email, password, nombre, apellido_p, apellido_m, direccion, telefono, res_seguridad, id_pregunta, id_tipo_usuario, activo) VALUES (1, 'haleym@gmail.com', '123', 'Haleym', 'Hidalgo', 'Torres', 'Calle 1 #123', '+56949857762', 'Etham', 1, 1, ?);";


  //--------- Datos de prueba para las alarmas ------------
  datos_usuario2 = "INSERT or IGNORE INTO USUARIO (id_usuario, email, password, nombre, apellido_p, apellido_m, direccion, telefono, res_seguridad, id_pregunta, id_tipo_usuario, activo) VALUES (2, 'juan@gmail.com', '123', 'Juan', 'Gómez', 'López', 'Av. Siempreviva 742', '+56987654321', 'Rocky', 1, 1, ?);";

  datos_indicacion = "INSERT or IGNORE INTO INDICACION (id_indicacion, id_medicamento, id_usuario, dosis, dias_tratamiento, nr_horas) VALUES (1, 1, 2, 400, 7, 8);";

  datos_alarma = "INSERT or IGNORE INTO ALARMA (id_alarma, id_indicacion, fecha_hora, status) VALUES (1, 1, '2024-10-12T06:30:00', 0);";
  
  datos_soporte = "INSERT or IGNORE INTO usuario (id_usuario, email, password, nombre, apellido_p, apellido_m, direccion, telefono, res_seguridad, id_pregunta, id_tipo_usuario, activo) VALUES (3, 'dondup@gmail.com', '123', 'Dondup', 'Berrios', 'Perez', 'Calle 1 #123', '+56949857762', 'Firulais', 1, 2, ?);";
  
  //Variables que contienen los observables
  private listadoTipoUsuario = new BehaviorSubject([]);

  private listadoMedicamentos = new Subject<ListadoMedicamentos[]>();

  private listadoPreguntasSeguridad = new BehaviorSubject<PreguntaSeguridad[]>([]);

  private listadoUsuarios = new Subject<ListadoUsuarios[]>();

  private credencialesUsuario = new Subject<CredencialesUsuario>();

  private usuarioActual = new BehaviorSubject<Usuario>({
    id_usuario: 0,
    email: "",
    password: "",
    nombre: "",
    apellido_p: "",
    apellido_m: "",
    direccion: "",
    telefono: "",
    id_tipo_usuario: 0,
    id_pregunta: 0,
    res_seguridad: "",
    id_cont_emergencia: 0,
    img_url: "",
    activo: false
  });
  
  constructor(private sqlite:SQLite, private platform:Platform, private alerts:AlertsService) {
    this.crearDB();
  }

  //Función que inicializa la base de datos
  crearDB() {
    this.platform.ready().then(() => {
      //Creamos la base de datos
      this.sqlite.create({
        name: 'farmapp.db',
        location: 'default'
      })
      .then((db:SQLiteObject) => {
        this.database = db;
        this.crearTablas();
        this.isDBReady.next(true);
      })
      .catch(error => {
        this.alerts.mostrar('Error al crear DB', JSON.stringify(error));
      });

    })
  }

  //Función que observa el stado de la base de datos
  dbState() {
    return this.isDBReady.asObservable();
  }

  //Función que crea las tablas
  async crearTablas() {
    //Ejecutamos de manera asincrona las sentencias de creación de tablas
    try {
      await this.database.executeSql(this.tabla_tipoUsuario,[]);
      await this.database.executeSql(this.tabla_medicamento,[]);
      await this.database.executeSql(this.tabla_contactoEmergencia,[]);
      await this.database.executeSql(this.tabla_preguntaSeguridad,[]);
      await this.database.executeSql(this.tabla_usuario,[]);
      await this.database.executeSql(this.tabla_indicacion,[]);
      await this.database.executeSql(this.tabla_alarma,[]);
    } catch (error) {
      this.alerts.mostrar('Error al crear tablas', JSON.stringify(error));
    }

    //Ejecutamos de manera asincrona las sentencias de población de tablas
    try {
      //Poblamos las tablas
      await this.database.executeSql(this.datos_tipoUsuario,[]);
      await this.database.executeSql(this.datos_medicamento,[]);
      await this.database.executeSql(this.datos_preguntaSeguridad,[]);
      await this.database.executeSql(this.datos_usuario,[true]);
      await this.database.executeSql(this.datos_usuario2,[false]);
      await this.database.executeSql(this.datos_soporte,[true]);
      await this.database.executeSql(this.datos_indicacion,[]);
      await this.database.executeSql(this.datos_alarma,[]);      
    } catch (error) {
      this.alerts.mostrar('Error al poblar tablas', JSON.stringify(error));
    };
  }

  //funcion que borra el usuario de la base de datos
  public async eliminarSesion(){
    try {
      this.usuarioActual.next({
        id_usuario: 0,
        email: "",
        password: "",
        nombre: "",
        apellido_p: "",
        apellido_m: "",
        direccion: "",
        telefono: "",
        id_tipo_usuario: 0,
        id_pregunta: 0,
        res_seguridad: "",
        id_cont_emergencia: 0,
        img_url: "",
        activo: false
      });
    } catch (error) {
      this.alerts.mostrar('Error al borrar el cache usuario', JSON.stringify(error));
    }
  }

  //-----> Funciones de Fetch (get/) <-----

  //Fetch's de las tablas
  fetchTipoUsuario():Observable<TipoUsuario[]> {
    return this.listadoTipoUsuario.asObservable();
  }

  fetchUsuarioActual():Observable<Usuario>{
    return this.usuarioActual.asObservable();
  }

  fetchPreguntasSeguridad():Observable<PreguntaSeguridad[]> {
    return this.listadoPreguntasSeguridad.asObservable();
  }

  fetchListadoUsuarios():Observable<ListadoUsuarios[]>{
    this.obtenerListadoUsuarios();
    return this.listadoUsuarios.asObservable();
  }

  fetchListadoMedicamentos():Observable<ListadoMedicamentos[]>{
    this.obtenerListadoMedicamentos();
    return this.listadoMedicamentos.asObservable();
  }

  fetchCredencialesUsuario(){
    return this.credencialesUsuario.asObservable();
  }

  //-----> Funciones de Consulta (Select) <-----
  public validarUsuario(email:string, password:string){
    return new Promise<boolean> ((resolve, reject) => {
      this.database.executeSql('SELECT * FROM usuario WHERE email = ? AND password = ? AND activo = ?' ,[email, password, true])
      .then(res => {
        //Si el usuario existe, retornamos el registro
        if(res.rows.length > 0) {
          let data: Usuario = {
            id_usuario: res.rows.item(0).id_usuario,
            email: res.rows.item(0).email,
            password: res.rows.item(0).password,
            nombre: res.rows.item(0).nombre,
            apellido_p: res.rows.item(0).apellido_p,
            apellido_m: res.rows.item(0).apellido_m,
            direccion: res.rows.item(0).direccion,
            telefono: res.rows.item(0).telefono,
            id_tipo_usuario: res.rows.item(0).id_tipo_usuario,
            id_pregunta: res.rows.item(0).id_pregunta,
            res_seguridad: res.rows.item(0).res_seguridad,
            id_cont_emergencia: res.rows.item(0).id_cont_emergencia,
            img_url: res.rows.item(0).img_url,
            activo: res.rows.item(0).activo
          };
          //Actualizamos el observable del Usuario
          this.usuarioActual.next(data);
          resolve(true);
        }
        resolve(false);
      })
      .catch(error => {
        this.alerts.mostrar('Error al buscar usuario', JSON.stringify(error));
      });
    }) 
  }

  public async obtenerUsuario(id_usuario:number) {
    return this.database.executeSql('SELECT * FROM usuario WHERE id_usuario = ?',[id_usuario])
    .then(res => {
      //Si el usuario existe, retornamos el registro
      if(res.rows.length > 0) {
        let data: Usuario = {
          id_usuario: res.rows.item(0).id_usuario,
          email: res.rows.item(0).email,
          password: res.rows.item(0).password,
          nombre: res.rows.item(0).nombre,
          apellido_p: res.rows.item(0).apellido_p,
          apellido_m: res.rows.item(0).apellido_m,
          direccion: res.rows.item(0).direccion,
          telefono: res.rows.item(0).telefono,
          id_tipo_usuario: res.rows.item(0).id_tipo_usuario,
          id_pregunta: res.rows.item(0).id_pregunta,
          res_seguridad: res.rows.item(0).res_seguridad,
          id_cont_emergencia: res.rows.item(0).id_cont_emergencia,
          img_url: res.rows.item(0).img_url,
          activo: res.rows.item(0).activo
        };
        //Actualizamos el observable del Usuario
        this.usuarioActual.next(data); 
      }      
    })
    .catch(error => {
      this.alerts.mostrar('Error al buscar usuario', JSON.stringify(error));
    });
  }

  /**
   * @example obtenerAlarmasDia(1, '2024-09-01')
   * @param id_usuario tipo numerico
   * @param fecha en formato 'YYYY-MM-DD'
   * @returns Alarma[{},...,{}]
   */
  public obtenerAlarmas(id_usuario:number, fecha:string){
    return new Promise<Alarma[]>((resolve, reject) => {
      this.database.executeSql(`
      SELECT  al.id_alarma AS id_alarma,
              al.id_indicacion AS id_indicacion,
              al.fecha_hora AS fecha_hora, 
              al.status AS status,
              med.nombre AS medicamentoNombre,
              ind.dosis AS dosis
      FROM alarma al
      JOIN indicacion ind ON al.id_indicacion = ind.id_indicacion
      JOIN usuario usr ON usr.id_usuario = ind.id_usuario
      JOIN medicamento med ON ind.id_medicamento = med.id_medicamento
      WHERE usr.id_usuario = ? AND al.fecha_hora LIKE ?
      ORDER BY al.fecha_hora ASC;`,
      [id_usuario, fecha + '%'])
      .then(res => {
        if(res.rows.length > 0) {
          let alarmas:Alarma[] = [];
          for (let i = 0; i < res.rows.length; i++) {
            alarmas.push({
              id_alarma: res.rows.item(i).id_alarma,
              id_indicacion: res.rows.item(i).id_indicacion,
              fecha_hora: res.rows.item(i).fecha_hora,
              status: res.rows.item(i).status,
              medicamentoNombre: res.rows.item(i).medicamentoNombre,
              indicacionDosis: res.rows.item(i).dosis
            });
          }
          resolve(alarmas);
        }
        else {
          this.alerts.mostrar('No hay alarmas', 'No se encontraron alarmas para este dia');
          resolve([]);
        }
      })
      .catch(error => {
        this.alerts.mostrar('Error al buscar alarmas', JSON.stringify(error));
      });
    });
  }

  public obtenerMedicamentos() {
    return this.database.executeSql('SELECT * FROM medicamento',[])
    .then(res => {
      let medicamentos:ListadoMedicamentos[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        medicamentos.push({
          id_medicamento: res.rows.item(i).id_medicamento,
          nombre: res.rows.item(i).nombre,
          formato: res.rows.item(i).formato
        });
      }
      this.listadoMedicamentos.next(medicamentos);
    })
    .catch(error => {
      this.alerts.mostrar('Error al buscar medicamentos', JSON.stringify(error));
    });
  }

  public emailExiste(email:string) {
    return this.database.executeSql('SELECT email FROM usuario WHERE email = ?',[email])
    .then(res => {
      if(res.rows.length > 0) {
        return true;
      }
      else {
        return false;
      }
    })
    .catch(error => {
      this.alerts.mostrar('Error al buscar email', JSON.stringify(error));
    });
  }

  public obtenerPreguntasSeguridad() {
    return this.database.executeSql('SELECT * FROM pregunta_seguridad',[])
    .then(res => {
      let preguntas:PreguntaSeguridad[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        preguntas.push({
          id_pregunta: res.rows.item(i).id_pregunta,
          pregunta: res.rows.item(i).pregunta
        });
      }
      this.listadoPreguntasSeguridad.next(preguntas);
    })
    .catch(error => {
      this.alerts.mostrar('Error al buscar preguntas de seguridad', JSON.stringify(error));
    });
  }

  //Listado de usuarios para el perfil de soporte
  private async obtenerListadoUsuarios(){
    return this.database.executeSql('SELECT id_usuario, nombre, apellido_p, apellido_m FROM usuario',[])
    .then(res => {
      let lista:ListadoUsuarios[] = [];
      if(res.rows.length > 0) {
        for(var i = 0; i < res.rows.length; i++){
          lista.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            apellido_p: res.rows.item(i).apellido_p,
            apellido_m: res.rows.item(i).apellido_m,
          });
        }

        this.listadoUsuarios.next(lista);
      }

    })
    .catch(error => {
      this.alerts.mostrar('Error al obtener lista de usuarios', JSON.stringify(error));
    });

  }

  //Listado de medicamentos para el perfil de soporte
  private async obtenerListadoMedicamentos(){
    return this.database.executeSql('SELECT * FROM medicamento',[])
    .then(res => {
      let lista:ListadoMedicamentos[] = [];
      if(res.rows.length > 0) {
        for(var i = 0; i < res.rows.length; i++){
          lista.push({
            id_medicamento: res.rows.item(i).id_medicamento,
            nombre: res.rows.item(i).nombre,
            formato: res.rows.item(i).formato,
          });
        }

        this.listadoMedicamentos.next(lista);
      }

    })
    .catch(error => {
      this.alerts.mostrar('Error al obtener lista de medicamentos', JSON.stringify(error));
    });

  }

  //Pregunta y respuesta de seguridad para ayuda del soporte
  public async obtenerCredencialesUsuario(id_usuario: number){
    return this.database.executeSql('SELECT u.id_usuario AS id_usuario, u.nombre AS nombre, u.apellido_p AS apellido_p, u.res_seguridad AS res_seguridad, p.pregunta AS pregunta, u.id_tipo_usuario AS id_tipo_usuario FROM usuario u JOIN pregunta_seguridad p ON u.id_pregunta = p.id_pregunta WHERE id_usuario = ?',[id_usuario])
    .then(res => {
      if(res.rows.length > 0) {

        let credenciales:CredencialesUsuario = {
          "id_usuario": res.rows.item(0).id_usuario,
          "nombre": res.rows.item(0).nombre,
          "apellido_p": res.rows.item(0).apellido_p,
          "pregunta": res.rows.item(0).pregunta,
          "res_seguridad": res.rows.item(0).res_seguridad,
          "id_tipo_usuario": res.rows.item(0).id_tipo_usuario
        };
        
        this.credencialesUsuario.next(credenciales);
      }

    })
    .catch(error => {
      this.alerts.mostrar('Error al obtener credenciales de usuario', JSON.stringify(error));
    });

  }

  public async obtenerUsuarioPorEmail(email:string){
    return new Promise<number>((resolve, reject) => {
      this.database.executeSql('SELECT id_usuario, id_tipo_usuario FROM usuario WHERE email = ?',[email])
      .then(res => {
        if(res.rows.length === 1) {
          let data = res.rows.item(0).id_usuario as number;
          resolve(data);
        }else{
          this.alerts.mostrar('Usuario no encontrado', 'No se encontro el usuario');
          reject();
        }
      })
      .catch(error => {
        this.alerts.mostrar('Error al buscar usuario por Email', JSON.stringify(error));
        reject();
      });
    });
  }

  //-----> Funciones de Inserción (Insert) <-----
  public async registrarUsuario(usuario:Usuario) {
    return this.database.executeSql('INSERT INTO usuario (email, password, nombre, apellido_p, apellido_m, direccion, telefono, res_seguridad, id_pregunta, id_tipo_usuario, img_url, activo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    [usuario.email, usuario.password, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.direccion, usuario.telefono, usuario.res_seguridad, usuario.id_pregunta, usuario.id_tipo_usuario, usuario.img_url, usuario.activo])
    .then(() => {
      this.usuarioActual.next(usuario);
    })
    .catch(error => {
      this.alerts.mostrar('Error al registrar usuario', JSON.stringify(error));
    });
  }

  public registrarIndicacion(id_medicamento:number, dosis:number, dias_tratamiento:number, nr_horas:number):Promise<number> {
    return this.database.executeSql('INSERT INTO indicacion (id_medicamento, id_usuario, dosis, dias_tratamiento, nr_horas) VALUES (?,?,?,?,?) RETURNING id_indicacion',
    [id_medicamento, this.usuarioActual.value.id_usuario, dosis, dias_tratamiento, nr_horas])
    .then((res) => {
      return res.rows.item(0).id_indicacion;
    })
    .catch(error => {
      this.alerts.mostrar('Error al registrar indicación', JSON.stringify(error));
    });
  }

  public registrarAlarmas(alarmas:Alarma[]) {
    let sentencia = ""
    for (let i = 0; i < alarmas.length; i++) {
      if (i > 0) {
        sentencia += ', ';
      }
      sentencia += `(${alarmas[i].id_indicacion}, '${alarmas[i].fecha_hora}', ${alarmas[i].status})`;
    }
    return this.database.executeSql(`INSERT INTO alarma (id_indicacion, fecha_hora, status) VALUES ${sentencia};`,[])
    .then(()=> {
      this.alerts.mostrar('Alarmas registradas', 'Se han registrado las alarmas con exito');
    })
    .catch(error => this.alerts.mostrar('Error al registrar alarmas', JSON.stringify(error)));
  }

  public async registrarMedicamento(nombre:string, formato:number){
    return this.database.executeSql('INSERT INTO medicamento (nombre, formato) VALUES (?,?)', [nombre, formato])
    .then(() => {
      this.alerts.mostrar('Exito', "medicamento registrado: " + nombre);
      this.obtenerListadoMedicamentos();
    })
    .catch(error => {
      this.alerts.mostrar('Error al registrar usuario', JSON.stringify(error));
    });
  }

  //-----> Funciones de Actualización (Update) <-----
  public async actualizarUsuario(id_usuario:number, nombre:string, apellido_p:string, apellido_m:string, email:string, telefono:string, direccion:string, img_url:any) {
    try {
      await this.database.executeSql('UPDATE usuario SET nombre = ?, apellido_p = ?, apellido_m = ?, email = ?, telefono = ?, direccion = ?, img_url = ? WHERE id_usuario = ?', [nombre, apellido_p, apellido_m, email, telefono, direccion, img_url, id_usuario]);
      this.alerts.mostrar('Usuario actualizado', 'Los datos del usuario han sido actualizados con exito');
      //Actualizamos el observable del Usuario
      this.obtenerUsuario(id_usuario);
    } catch (error) {
      this.alerts.mostrar('Error al actualizar usuario', JSON.stringify(error));
    }
  }

  public async actualizarPassword(id_usuario:number, password:string){
    return this.database.executeSql('UPDATE usuario SET password = ? WHERE id_usuario = ?', [password, id_usuario])
    .then(() => {
      this.alerts.mostrar('Exito ', 'Su contraseña ha sido cambiada');
      this.obtenerCredencialesUsuario(id_usuario);
    })
    .catch(error => {
      this.alerts.mostrar('Error al actualizar contraseña de usuario', JSON.stringify(error));
    });
  }

  //FUnciones de eliminar (Delete)
  public async eliminarMedicamento(id_medicamento:number){
    return this.database.executeSql('DELETE FROM medicamento WHERE id_medicamento = ?', [id_medicamento])
    .then(() => {
      this.alerts.mostrar('Exito ', 'Medicamento eliminado de la BD');
      this.obtenerListadoMedicamentos();
    })
    .catch(error => {
      this.alerts.mostrar('Error al eliminar medicamento', JSON.stringify(error));
    });
  }

  public cambiarEstadoAlarma(id_alarma:number) {
    return this.database.executeSql('UPDATE alarma SET status = ? WHERE id_alarma = ?', [true, id_alarma])
    .then(() => {
      this.alerts.mostrar('Alarma actualizada', 'La alarma ha sido actualizada con exito');
    })
    .catch(error => {
      this.alerts.mostrar('Error al actualizar alarma', JSON.stringify(error));
    });
  }

  public cambiarEstadoUsuario(id_usuario:number, estado:boolean) {
    return this.database.executeSql('UPDATE usuario SET activo = ? WHERE id_usuario = ?', [estado, id_usuario])
    .catch(error => {
      this.alerts.mostrar('Error al deshabilitar usuario', JSON.stringify(error));
    });
  }

}