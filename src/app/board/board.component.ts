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
  kaka:boolean=false;
  unTouch:boolean=false;
  stop:boolean=false;


  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.squares = Array(9).fill(null);
    this.stop=false;
    this.bNoWinner = false;
    this.over=false;
    this.unTouch=false;
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
      console.log(this.squares.splice(idx,1,this.player))
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
        this.stop=true;
        this.lineWind(lines[i]);
        this.score(this.squares[a]);        
        this.unTouch=true;
        
      setTimeout(() =>{ 
        this.over=true; 
        setTimeout(() =>{
          this.bSeeGame=false;
          }, 300); 
         return this.squares[a];
        }, 1500); 
        break;
      }      
    }
    // Si se llena sin ganadores
    if(!this.squares.includes(null) && !this.stop){
      this.bSeeGame=false;
    //  this.bIsActive=false;
      this.bNoWinner=true;
    }
    
    return "";
  }

  /* sumar el score*/
  score(player:any){
    if(player=='X'){
      this.scoreOne+=1;
    } else{
      this.scoreTwo+=1;
    }
   
  }

  /* Reiniciar partida */
  restar(){
    this.squares = Array(9).fill(null);
    this.unTouch=false;
    this.stop=false;
  }

  /* Marcar lalinea ganadora */
  lineWind(lines:any){
    setTimeout(function(){ 
      for(let i in lines){
      document.getElementsByClassName('sqrElment')[lines[i]].classList.add("winLines");
      }
    }, 200); 
  }




}
