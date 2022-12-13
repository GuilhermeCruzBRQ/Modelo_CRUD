import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud';

  // variavel que guarda a lista de usuarios
  listaUsuarios: any;

  // variavel que guarda o que tem nos inputs
  form!: FormGroup;

  // salvar id
    idElemento!:  number;

  cadastrando: boolean = true;

  // listar elementos
  // injetando serviço dentro do componente
  constructor(private servicoUsuario:UsuarioService, private formBuilder: FormBuilder){}

  // metodo que é executado quando o componente abre
  ngOnInit(){
    // fazendo conecção entre ts e html
    this.form = this.formBuilder.group({
      nome: "a",
      email: "a",
    })
    // quando meu componente abrir execute o metodo listar usuarios 
    this.listarUsuarios()
  }

  listarUsuarios(){
                                    // subscribe vem do observable
    this.servicoUsuario.getUsuarios().subscribe({
      // oque vai acontecer quando der certo?
      next:(usuario: any) => {
        // guardando os dados na variavel listaUsuarios
        this.listaUsuarios =  usuario;
        console.log(this.listaUsuarios);
      },

      // caso de errado
      error:(erro: any)=>{
        console.log('deu ruim ');
        
      }
    })

  }

  cadastrarUsuarios(){

    let nomeInput = this.form.controls["nome"].value
    let emailInput = this.form.controls["email"].value

    let dados = {
      id: 4,
      nome: nomeInput,
      email: emailInput
    }

    this.servicoUsuario.postUsuarios(dados).subscribe({
      // oque vai acontecer quando der certo?
      next:(usuario: any) => {
        // guardando os dados na variavel listaUsuarios
        console.log(usuario);
        this.listarUsuarios()
      },

      // caso de errado
      error:(erro: any)=>{
        console.log('deu ruim ');
      }
    })
  }

  deletarUsuario(id: number) {
    this.servicoUsuario.deletarUsuario(id).subscribe({
        // oque vai acontecer quando der certo?
        next:(usuario: any) => {
          // guardando os dados na variavel listaUsuarios
          console.log(usuario);
          this.listarUsuarios()
        },
  
        // caso de errado
        error:(erro: any)=>{
          console.log('deu ruim ');
        }
    })
  }

  // pegar dados e jogar na input
  pegarDados(dados: any){
    this.idElemento =  dados.id;
    this.form.controls["nome"].setValue(dados.nome);
    this.form.controls["email"].setValue(dados.email);
    this.cadastrando = false;

  }

  editarUsuario(){
    let nomeInput = this.form.controls["nome"].value
    let emailInput = this.form.controls["email"].value

    let dados = {
      id: this.idElemento,  
      nome: nomeInput,
      email: emailInput
    }

    this.servicoUsuario.editarUsuario(dados).subscribe({
      // oque vai acontecer quando der certo?
      next:(usuario: any) => {
        // guardando os dados na variavel listaUsuarios
        console.log(usuario);
        this.listarUsuarios()
      },

      // caso de errado
      error:(erro: any)=>{
        console.log('deu ruim ');
      }
    })
  }

}
