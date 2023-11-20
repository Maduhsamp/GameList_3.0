import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.page.html',
  styleUrls: ['./logar.page.scss'],
})
export class LogarPage implements OnInit {
  logar: FormGroup;

  constructor( public alertController : AlertController,
    private router: Router,
    public formBuilder : FormBuilder,
    private alert : Alert,
    private auth: AuthService
  ) {
    this.logar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });
  }

  ngOnInit() {
    this.logar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  get errorControl() {
    return this.logar.controls;
  }

  submitForm() {
    if (!this.logar.valid) {
      this.presentAlert("Lista de Jogos", "Logar", "Todos os campos são obrigatórios!");
      return false;
    } else {
      this.login();
    }
  }

  private login() : void{
    this.presentAlert("Lista de Jogos", "Logar", "Seja Bem vindo!");
    this.router.navigate(["/home"]);
  }
    public siginGithub() : void{ }
    public siginGoogle() : void{ }
    public irParaSignUp() : void{
    this.router.navigate(["/signup"]);
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
   

  logarComGmail() {
    this.auth
      .logarComGoogle()
      .then((res) => {
        this.alert.presentAlert('OK', 'Seja bem Vindo!');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.alert.presentAlert('Erro', 'Erro ao Logar com o Google! Tente Novamente');
        console.log(error);
      });
  }

  logarComGithub(){
    this.auth
      .logarComGithub()
      .then((res) => {
        this.alert.presentAlert('OK', 'Seja bem Vindo!');
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.alert.presentAlert('Erro', 'Erro ao Logar com o Github! Tente Novamente');
        console.log(error);
      });
  }

  irParaRegistrar() {
    this.router.navigate(['/registrar']);
  }
}
