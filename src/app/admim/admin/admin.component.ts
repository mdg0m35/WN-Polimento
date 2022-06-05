import { Component, OnInit } from '@angular/core';
import { Lista } from 'src/app/admin/model/lista';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  lista: Lista[]=[];
  displayedColumns = ['nome','telefone','rua','numero','cidade','bairro','tipo','data','hora','polimentoCompleto','localizacao','Excluir']

  constructor(private service:ServicesService) { }

  ngOnInit(): void {
    this.listaCad();

  }

  listaCad(): void{
    this.service.listarTodos()
    .subscribe(dados => this.lista = dados)
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
