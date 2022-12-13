import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // guardando a rota da api
  url: string = 'http://localhost:3000/usuarios'

  // HTTPclient = Fatch => interage com as apis
  constructor(private httpclient: HttpClient) { }

  // criando o metado pegar
  getUsuarios(): Observable<any>{ //Observable monitora o que acontece com o metado, oque acontece depois, durante, caso d~e erro 
            // para acessar a API
    return this.httpclient.get(this.url);
  }

  // criando metodo de cadastro 
  // recebe dados
  // "any" porque não tem nenhum model criado
  postUsuarios(dados: any): Observable<any>{
                            //acessa a api e cadastra os dados 
    return this.httpclient.post(this.url, dados);
  }
  
  // criando metodo deletar
  deletarUsuario(identificador: number):Observable<any>{
    return this.httpclient.delete(`${this.url}/${identificador}`)
  }

  // criando o metodo de editar
  editarUsuario(dados: any):Observable<any>{
    return this.httpclient.put(`${this.url}/${dados.id}`, dados)
    // put edita todos o objetos
    // patch edita a gosto
  }
}
