import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {

  apiUrl = 'http://localhost:3000/produtos';

  produtos: any[] = [];

  novoProduto: any = {
    nome: '',
    preco: 0,
    quantidade: 0
  };

  produtoEditando: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listar();
  }

  // 🔍 LISTAR
  listar() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(res => {
        this.produtos = res;
      });
  }

  // ➕ CADASTRAR
  cadastrar() {
    this.http.post(this.apiUrl, this.novoProduto)
      .subscribe(() => {
        this.novoProduto = { nome: '', preco: 0, quantidade: 0 };
        this.listar();
      });
  }

  // ❌ DELETAR
  deletar(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => {
        this.listar();
      });
  }

  // ✏️ EDITAR
  editar(produto: any) {
    this.produtoEditando = { ...produto };
  }

  // 💾 ATUALIZAR
  atualizar() {
    this.http.put(`${this.apiUrl}/${this.produtoEditando.id}`, this.produtoEditando)
      .subscribe(() => {
        this.produtoEditando = null;
        this.listar();
      });
  }

  cancelar() {
    this.produtoEditando = null;
  }
}