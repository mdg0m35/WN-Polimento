import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lista } from 'src/app/admin/model/lista';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  lista$!:Observable< Lista[]>;
  displayedColumns = ['nome','telefone','rua','numero','cidade','bairro','tipo','data','hora','polimentoCompleto','localizacao','Excluir']

  constructor(private service:ServicesService) {
    this.lista$ = this.service.listarTodos()
  }

  ngOnInit(): void {


  }



  deletar(id:any){
    this.service.excluir(id).subscribe(retorno => {
      location.reload()
      this.service.exibirMensangens(
        'SISTEMA',
        'Excluido com sucesso',
        'toast-error'
      )

    });
  }
  //Pegar endereço cadastrado e levar p/ Google Maps
  localizacao(rua:string,numero:string,bairro:string,cidade:string){
    const url= "https://www.google.com.br/maps/place/R."+(`${rua},+${numero}+-+${bairro},+${cidade}+`)
    open(url,'_blank')
  }


}
