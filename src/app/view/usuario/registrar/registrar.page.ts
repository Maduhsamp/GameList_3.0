import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  cadastro!: FormGroup;

  constructor(public alertController : AlertController,
    private router: Router,
    private auth : AuthService,
     private alert : Alert,
     private builder: FormBuilder) {
       this.cadastro = new FormGroup({
         email: new FormControl(''),
         senha: new FormControl(''),
         confSenha: new FormControl('')
       });
      }

  ngOnInit() {
    this.cadastro = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this.cadastro.controls;
  }

  submitForm(){
    if(!this.cadastro.valid){
      this.presentAlert("Lista de Jogos",  "Cadastrar", "Todos os campos são obrigatórios!");
      return false;
    }else{
      this.registrar();
    }
 }

 private registrar() : void{
   console.log(this.cadastro.value['email'],
   this.cadastro.value['senha'])
   this.presentAlert("Lista de Jogos", "Cadastrar", "Seja Bem vindo!");
   this.router.navigate(["/logar"]);
 }

 async presentAlert(titulo: string, subtitulo: string, mensagem: string) {
  const alert = await this.alertController.create({
  header: titulo,
  subHeader: subtitulo,
  message: mensagem,
  buttons: ['OK']
  });
  await alert.present();
  const { role } = await alert.onDidDismiss();
  }
}