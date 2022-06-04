import { Component, OnInit } from '@angular/core';
import { loginModelo } from 'src/app/models/loginModelo';
import { ServicesService } from 'src/app/service/services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


usuario: loginModelo = new loginModelo;

  constructor(private loginService:ServicesService){}
  ngOnInit(): void {

  }
  submitLogin(){
    console.log(this.usuario)
   this.loginService.LoginUsuario(this.usuario);
   //alert("Teste")

 }

}
