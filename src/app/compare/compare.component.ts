import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  @Input() character: any;

  constructor() { }

  ngOnInit() {
    console.log(this.character);
  }

}
