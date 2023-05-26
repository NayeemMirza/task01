import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  countNumber = ''
  result: any = {}
  isResultReady = false;
  compareItemOne: any = '';
  compareItemTwo: any = '';
  lenghtError = false;
  contentError = false;
  isTure = false;
  constructor() { }

  ngOnInit(): void {
    this.result
  }

  getCountNumber() {
    this.result = {}
    if (this.countNumber!=='') { 
      this.isResultReady = true
    } else{
      this.isResultReady = false
    }
    let lowercaseCountNumber = this.countNumber.toLowerCase()
    for (let char of lowercaseCountNumber) {
      if (/[a-z0-9]/.test(char)) {
        this.result[char] = ++this.result[char] || 1
      }
    }
    return this.result
  }

  compareItem() {
    let lookup:any = {}
    let vauleOne = this.compareItemOne.trim()
    let vauleTwo = this.compareItemTwo.trim()
    if(vauleOne.length !== vauleTwo.length){
      this.lenghtError = true 
      this.isTure = false
      return false
    } else {
      this.lenghtError = false
    }
    for(let val1 of vauleOne){
      lookup[val1] ? lookup[val1]++ : lookup[val1] = 1
    }
    for(let val2 of vauleTwo){
      if(!lookup[val2]){
        this.contentError = true
        this.isTure = false
        return false
      } else {
        lookup[val2] =-1 
        this.contentError = false
        this.isTure = true
      }
    }
    return true
  }
}


