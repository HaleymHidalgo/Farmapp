import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertsService } from './alerts.service';
import { TipoUsuario } from '../models/tipo-usuario';
//Agregamos las importaciones necesarias para el manejo de la base de datos

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
//Aqui vamos a definir todos los atributos que necitaremos

  //Variable de conexión
  private database!: SQLiteObject;

  //Variables de control del Estado de la base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //Variables que contienen las sentencias de creación de tablas
  tabla_tipoUsuario = 'CREATE TABLE IF NOT EXISTS tipo_usuario (id_tipo INTEGER NOT NULL UNIQUE, nombre TEXT NOT NULL, PRIMARY KEY("id_tipo"));';

  tabla_medicamento = 'CREATE TABLE IF NOT EXISTS "MEDICAMENTO" ("id_medicamento" INTEGER NOT NULL UNIQUE,	"nombre" TEXT NOT NULL, "formato" INTEGER NOT NULL,	PRIMARY KEY("id_medicamento"), FOREIGN KEY ("id_medicamento") REFERENCES "INDICACION"("id_medicamento") ON UPDATE NO ACTION ON DELETE NO ACTION);';

  tabla_indicacion = 'CREATE TABLE IF NOT EXISTS "INDICACION" ("id_indicacion" INTEGER NOT NULL,	"id_medicamento" INTEGER NOT NULL,	"id_usuario" INTEGER NOT NULL,  "dosis" INTEGER NOT NULL,	"dias_tratamiento" INTEGER NOT NULL,	"nr_horas" INTEGER NOT NULL,	"medicamento_img" TEXT,	"receta_img" TEXT,	PRIMARY KEY("id_indicacion"),	FOREIGN KEY ("id_usuario") REFERENCES "USUARIO"("id_usuario")	ON UPDATE NO ACTION ON DELETE NO ACTION);';

  tabla_alarma = 'CREATE TABLE IF NOT EXISTS "ALARMA" ("id_indicación" INTEGER NOT NULL,	"fecha_hora" TEXT NOT NULL, "status" INTEGER NOT NULL	FOREIGN KEY ("id_indicación") REFERENCES "INDICACION"("id_indicacion")	ON UPDATE NO ACTION ON DELETE NO ACTION);';

  tabla_contactoEmergencia = 'CREATE TABLE IF NOT EXISTS "CONTACTO_EMERGENCIA" (	"id_contacto" INTEGER NOT NULL UNIQUE,	"nombre" TEXT NOT NULL,	"apellido_p" TEXT NOT NULL,	"apellido_m" TEXT NOT NULL,	"email" TEXT NOT NULL,	"direccion" TEXT NOT NULL,	"img_url" TEXT NOT NULL,	PRIMARY KEY("id_contacto"));';

  tabla_usuario = 'CREATE TABLE IF NOT EXISTS "USUARIO" ("id_usuario" INTEGER NOT NULL UNIQUE,	"email" TEXT NOT NULL,	"password" TEXT NOT NULL,	"nombre" TEXT NOT NULL,	"apellido_p" TEXT NOT NULL,	"apellido_m" TEXT NOT NULL,	"direccion" TEXT NOT NULL,	"id_tipo_usuario" INTEGER NOT NULL,	"id_cont_emergencia" INTEGER,	"img_url" TEXT,	PRIMARY KEY("id_usuario"),	FOREIGN KEY ("id_tipo_usuario") REFERENCES "TIPO_USUARIO"("id_tipo")	ON UPDATE NO ACTION ON DELETE NO ACTION,	FOREIGN KEY ("id_cont_emergencia") REFERENCES "CONTACTO_EMERGENCIA"("id_contacto")	ON UPDATE NO ACTION ON DELETE NO ACTION);';

  //Variables que contiene las sentencias de población de tablas
  datos_tipoUsuario = 'INSERT INTO tipo_usuario (id_tipo, nombre) VALUES (1, "Autocuidado"), (2, "Soporte");';

  //Variables que contienen los observables
  listadoTipoUsuario = new BehaviorSubject([]);
  
  constructor(private sqlite:SQLite, private platform:Platform, private alerts:AlertsService) {
    this.crearDB();
  }

  //Función que observa el stado de la base de datos
  dbState() {
    return this.isDBReady.asObservable();
  }

  //Función que inicializa la base de datos
  crearDB() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'farmapp.db',
        location: 'default'
      })
      .then((db:SQLiteObject) => {
        this.database = db;
        this.crearTablas();
        this.alerts.mostrar('DB Creada', "Grande Hale <3");
      })
      .catch(error => {
        this.alerts.mostrar('Error al crear DB', JSON.stringify(error));
      });
    })
  }

  //Función que crea las tablas
  async crearTablas() {
    //Ejecutamos de manera asincrona las sentencias de creación de tablas
    try {
      await this.database.executeSql(this.tabla_tipoUsuario,[]);
      /*
      await this.database.executeSql(this.tabla_medicamento,[]);
      await this.database.executeSql(this.tabla_indicacion,[]);
      await this.database.executeSql(this.tabla_alarma,[]);
      await this.database.executeSql(this.tabla_contactoEmergencia,[]);
      await this.database.executeSql(this.tabla_usuario,[]);
      */
    } catch (error) {
      this.alerts.mostrar('Error al crear tablas', JSON.stringify(error));
    }

    //Ejecutamos de manera asincrona las sentencias de población de tablas
    try {
      this.database.executeSql(this.datos_tipoUsuario,[]);
    } catch (error) {
      this.alerts.mostrar('Error al poblar tablas', JSON.stringify(error));
    };
  }

  //Fetch's de las tablas
  fetchTipoUsuario():Observable<TipoUsuario[]> {
    return this.listadoTipoUsuario.asObservable();
  }

}
