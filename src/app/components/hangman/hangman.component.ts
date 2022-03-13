import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {

  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  keys: any;
  secret = 'Brainergy';
  lives = 5
  isOver = false;
  characters: { value: string; guessed: boolean }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.keys = this.alphabet.split('').map((key) => {
      return {
        value: key,
        guessed: false,
      };
    });
    this.characters = this.secret
        .split('')
        .map((char) => ({ value: char, guessed: false }));
  }

  onKeyClick(key: any) {
    if (key.guessed) {
      return;
    }
    key.guessed = true;
    this.guesses(key);
  }

  guesses(key: any) {
    if(this.secret.toUpperCase().includes(key.value)) {
      this.characters = this.characters.map((char) => {
        if (char.value.toUpperCase() === key.value) {
          return { ...char, guessed: true };
        }
        return char;
      });

    } else {
      this.countLives();
    }
    
  }

  countLives() {
    this.lives -= 1
    if(this.lives < 1) {
      this.isOver = true;
    }
  }
}
