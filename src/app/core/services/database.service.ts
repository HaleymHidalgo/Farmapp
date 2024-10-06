import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertsService } from './alerts.service';
import { TipoUsuario } from '../models/tipo-usuario';
import { Usuario } from '../models/usuario';

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

  tabla_usuario = 'CREATE TABLE IF NOT EXISTS "USUARIO" ("id_usuario" INTEGER PRIMARY KEY autoincrement,	"email" TEXT NOT NULL UNIQUE,	"password" TEXT NOT NULL,	"nombre" TEXT NOT NULL,	"apellido_p" TEXT NOT NULL,	"apellido_m" TEXT NOT NULL,	"direccion" TEXT NOT NULL, "telefono" TEXT NOT NULL, "res_seguridad" TEXT NOT NULL, "id_pregunta" INTEGER NOT NULL,		"id_tipo_usuario" INTEGER NOT NULL,	"id_cont_emergencia" INTEGER,	"img_url" TEXT,	FOREIGN KEY ("id_tipo_usuario") REFERENCES "TIPO_USUARIO"("id_tipo"),	FOREIGN KEY ("id_cont_emergencia") REFERENCES "CONTACTO_EMERGENCIA"("id_contacto"), FOREIGN KEY ("id_pregunta") REFERENCES "PREGUNTA_SEGURIDAD" ("id_pregunta"));';

  tabla_indicacion = 'CREATE TABLE IF NOT EXISTS "INDICACION" ("id_indicacion" INTEGER PRIMARY KEY autoincrement,	"id_medicamento" INTEGER NOT NULL,	"id_usuario" INTEGER NOT NULL,  "dosis" INTEGER NOT NULL,	"dias_tratamiento" INTEGER NOT NULL,	"nr_horas" INTEGER NOT NULL,	"medicamento_img" TEXT,	"receta_img" TEXT,	FOREIGN KEY ("id_usuario") REFERENCES "USUARIO"("id_usuario"), FOREIGN KEY ("id_medicamento") REFERENCES "MEDICAMENTO"("id_medicamento"));';

  tabla_alarma = 'CREATE TABLE IF NOT EXISTS "ALARMA" ("id_indicacion" INTEGER NOT NULL,	"fecha_hora" TEXT NOT NULL, "status" INTEGER NOT NULL,	FOREIGN KEY ("id_indicacion") REFERENCES "INDICACION"("id_indicacion"));';

  //Variables que contiene las sentencias de población de tablas
  datos_tipoUsuario = "INSERT or IGNORE INTO tipo_usuario (id_tipo, nombre) VALUES (1, 'Autocuidado'), (2, 'Soporte');";

  datos_medicamento = "INSERT or IGNORE INTO medicamento (id_medicamento, nombre, formato) VALUES (1, 'Paracetamol', 500), (2, 'Ibuprofeno', 250), (3, 'Amoxicilina', 500), (4, 'Omeprazol', 100);";

  datos_preguntaSeguridad = "INSERT or IGNORE INTO pregunta_seguridad (id_pregunta, pregunta) VALUES (1, '¿Cual es el nombre de tu mascota?'), (2, '¿Cual es el nombre de tu primer amor?'), (3, '¿Cual es el nombre de tu mejor amigo?');";

  datos_usuario = "INSERT or IGNORE INTO usuario (id_usuario, email, password, nombre, apellido_p, apellido_m, direccion, telefono, res_seguridad, id_pregunta, id_tipo_usuario, img_url) VALUES (1, 'haleym@gmail.com', '123', 'Haleym', 'Hidalgo', 'Torres', 'Calle 1 #123', '+56949857762', 'Etham', 1, 1, 'https://www.google.com');";

  //Variables que contienen los observables
  private listadoTipoUsuario = new BehaviorSubject([]);

  private usuarioActual = new BehaviorSubject <Usuario>({
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
    img_url: ""
  });
  
  constructor(private sqlite:SQLite, private platform:Platform, private alerts:AlertsService) {
    this.crearDB();
  }

  //Función que inicializa la base de datos
  crearDB() {
    this.platform.ready().then(() => {
      //Eliminamos la base de datos si existe
      /*
      this.sqlite.deleteDatabase({
        name: 'farmapp.db',
        location: 'default'
      }).then(() => {
        this.alerts.mostrar('DB Eliminada', "La base de datos ha sido eliminada con exito");
      }).catch(error => {
        this.alerts.mostrar('Error al eliminar DB', JSON.stringify(error));
      });
      */
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
      await this.database.executeSql(this.datos_usuario,[]);
    } catch (error) {
      this.alerts.mostrar('Error al poblar tablas', JSON.stringify(error));
    };
  }

  //-----> Funciones de Fetch (get/obtener) <-----

  //Fetch's de las tablas
  fetchTipoUsuario():Observable<TipoUsuario[]> {
    return this.listadoTipoUsuario.asObservable();
  }

  fetchUsuarioActual():Observable<Usuario>{
    return this.usuarioActual.asObservable();
  }

  //-----> Funciones de Consulta (Select) <-----
  public iniciarSesion(email:string, password:string) {
    return this.database.executeSql('SELECT * FROM usuario WHERE email = ? AND password = ?',[email, password])
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
          img_url: res.rows.item(0).img_url
        };
        //Actualizamos el observable del Usuario
        this.usuarioActual.next(data); 
      }      
    })
    .catch(error => {
      this.alerts.mostrar('Error al buscar usuario', JSON.stringify(error));
    });
  }

  //-----> Funciones de Inserción (Insert) <-----
  public registrarUsuario(usuario:Usuario) {
    return this.database.executeSql('INSERT INTO usuario (email, password, nombre, apellido_p, apellido_m, direccion, telefono, res_seguridad, id_pregunta, id_tipo_usuario, img_url) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [usuario.email, usuario.password, usuario.nombre, usuario.apellido_p, usuario.apellido_m, usuario.direccion, usuario.telefono, usuario.res_seguridad, usuario.id_pregunta, usuario.id_tipo_usuario, usuario.img_url])
    .then(() => {
      this.usuarioActual.next(usuario);
    })
    .catch(error => {
      this.alerts.mostrar('Error al registrar usuario', JSON.stringify(error));
    });
  }

}
