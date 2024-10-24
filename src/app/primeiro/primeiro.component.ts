import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Aluno } from '../modelo/Aluno';
import { MediaPipe } from '../pipe/media.pipe';

@Component({
  selector: 'app-primeiro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MediaPipe],
  templateUrl: './primeiro.component.html',
  styleUrl: './primeiro.component.css'
})
export class PrimeiroComponent {

  // Objeto formulário
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(3)]),
    nota1 : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)]),
    nota2 : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)])
  });

  // Visibilidade dos botões
  btnCadastrar:boolean = true;

  //Vetor
  vetor:Aluno[] = [];
  
  // Armazenar o indice do aluno selecionado
  indice:number = -1;
  
  // Função para cadastrar o aluno
  cadastrar() {
    // Cadastro do aluno no vetor
    this.vetor.push(this.formulario.value as Aluno)
    //Limpeza dos inputs
    this.formulario.reset()
  
  }


  // Função para selecionar o aluno
  selecionar(indice:number){

    //Atribuir o indice
    this.indice = indice;

    //Atribuir os dados do aluno no forms
    this.formulario.setValue({
      nome: this.vetor[indice].nome,
      nota1: this.vetor[indice].nota1,
      nota2: this.vetor[indice].nota2
    })

    // Visibilidade dos botões
    this.btnCadastrar = false

  }

  // Função para alterar os dados do aluno
  alterar(){

    //Alterar vetor
    this.vetor[this.indice] = this.formulario.value as Aluno

    //Limpar os inputs
    this.formulario.reset()

    //Visibilidade dos botões
    this.btnCadastrar = true

  }

  //Função para remover o aluno
  remover(){
    
    // Remover pessoa do vetor
    this.vetor.splice(this.indice, 1)

    //Limpar os inputs
    this.formulario.reset()

    //Visibilidade
    this.btnCadastrar = true

  }

  //Função para cancelar
  cancelar(){

    //Limpar os inputs
    this.formulario.reset()

    //Visibilidade
    this.btnCadastrar = true

  }

}
