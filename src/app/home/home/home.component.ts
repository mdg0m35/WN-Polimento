import { Component, OnInit } from '@angular/core';
import { Lista } from 'src/app/admin/model/lista';
import { ServicesService } from 'src/app/service/services.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cadastro: Lista={
    nome: '',
    rua: '',
    telefone: '',
    tipo: '',
    numero: '',
    cidade: '',
    bairro: '',
    complemento: '',
    data: '',
    hora: '',
    polimentoCompleto: 'sim'
  };

  constructor(private service:ServicesService) { }

  ngOnInit(): void {
  }

  salvarAgendamento() :void{
   this.service.cad(this.cadastro).subscribe(retorno =>{
    this.service.exibirMensangens(
      'Agendado com sucesso',
      'Em instante você recebera uma confirmação em seu Whatsapp',
     'toast-success'
    );
    location.reload();
   });
  }

 encaminhar(){
  const url ='https://www.google.com.br'
   open(url,'_blank')
    }

}


