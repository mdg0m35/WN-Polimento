import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, take, tap } from 'rxjs';
import { map,catchError} from 'rxjs/operators';
import { Lista } from '../admin/model/lista';
import { loginModelo } from '../models/loginModelo';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private API ="http://localhost:8080/api/agendamento";

  //autenticação

  private usuarioAutenticado: boolean = false;


  constructor(private http:HttpClient,private toastr: ToastrService,private router:Router)  { }

  listarTodos():Observable<Lista[]>{
    return this.http.get<Lista[]>(this.API).pipe(
    map(retorno => retorno),
    catchError(erro=> this.exibirErro(erro))
    );

  }
  buscarID(id:number):Observable<Lista>{
      return this.http.get<any>(`${this.API}/${id}`).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  cad(list: Lista):Observable<Lista>{
      return this.http.post<Lista>(this.API,list).pipe(
      catchError(erro => this.exibirErro(erro))
    );

  }

  excluir(id:string){
    const url = (`${this.API}/${id}`)
    return this.http.delete(url).pipe(
      catchError(erro => this.exibirErro(erro))

    )


  }

  exibirErro(e: any):Observable<any>{
    this.exibirMensangens('ERRO!!!','Não foi possivel realizar a operação','toast-error');
    return EMPTY;
  }

  exibirMensangens(titulo:string,mensagem:string,tipo:string):void{
    this.toastr.show(mensagem,titulo,{closeButton:true,progressBar:true},tipo)
  }


  //Autenticação
  LoginUsuario(usuario:loginModelo){
   if(usuario.usuario === 'ita' &&
      usuario.senha === 'itaadmin') {

        this.usuarioAutenticado = true;

        this.router.navigate(['/admin'])

   } else{
     this.usuarioAutenticado = false;
     this.exibirMensangens('ERRO!!!','Usuário ou Senha incorretos','toast-error');

   }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado
  }

}
