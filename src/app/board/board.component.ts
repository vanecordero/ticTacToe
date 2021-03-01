import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

 // bIsActive: boolean=true;
  squares:any[];
  bIsXNext: boolean;
  bSeeGame:boolean = true;
  bNoWinner:boolean = false;
  sWinner: any='';
  scoreOne:number=0;
  scoreTwo:number=0;
  over:boolean=false;


  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.squares = Array(9).fill(null);
    this.bNoWinner = false;
    this.over=false;
    this.bSeeGame = true;
    
    this.sWinner = '';
    this.bIsXNext=true;
    //this.bIsActive=true;
  }
  get player(){
    return this.bIsXNext? 'X':'O';
  }

  makeMove(idx:number){
    if(!this.squares[idx]){
      this.squares.splice(idx,1,this.player);
      this.bIsXNext=!this.bIsXNext;
    }
    this.sWinner = this.calculateWinner();
    
  }

  calculateWinner(){
    // Lineas ganadoras
    const lines=[
      [0,1,2], // -
      [3,4,5], // -
      [6,7,8], // -
      [0,3,6], // |
      [1,4,7], // |
      [2,5,8], // |
      [0,4,8], // /
      [2,4,6] // \
    ];

    // iterar eentre el array para saber quien gana
    for (let i=0; i<lines.length; i++){
      const [a,b,c]=lines[i];
      if( // si tienes la misma letra gana
        this.squares[a]&&
        this.squares[a]=== this.squares[b]&&
        this.squares[a]=== this.squares[c]
      ){
        this.bSeeGame=false;
        this.score(this.squares[a]);
        this.over=true;
      //  this.bIsActive=false;
        return this.squares[a];
      }
      
    }
    // Si se llena sin ganadores
      if(!this.squares.includes(null)){
        this.bSeeGame=false;
      //  this.bIsActive=false;
        this.bNoWinner=true;
        
      }
    return "";
  }

  score(player:any){
    if(player=='X'){
      this.scoreOne+=1;
      
    } else{
      this.scoreTwo+=1;
    }
  }

  restar(){
    this.squares = Array(9).fill(null);
  }

}
