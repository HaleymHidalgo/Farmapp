import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  API_URL = 'https://api.emailjs.com/api/v1.0/email/send';
  PUBLIC_KEY = "BgX6nExH14bzyo8AA";
  SERVICE_ID = "service_8ef7zi9";
  TEMPLATE_ID = "template_s7d0mpv";


  constructor(private alert:AlertsService, private http: HttpClient) { }

  enviarCorreo(email: string, codigo: number):Observable<any> {
    //Parametros del correo
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    let body = {
      "service_id": this.SERVICE_ID,
      "template_id": this.TEMPLATE_ID,
      "user_id": this.PUBLIC_KEY,
      "template_params": {
        "email": email,
        "message": codigo
      }
    }

    // Enviamos el correo y manejamos el resultado con suscripción
    return this.http.post(this.API_URL, body, { headers });
  }
}
