import { Component, OnInit } from '@angular/core';
import { BienService } from '../bien.service';
import jsonfile from './immofile.json';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  listeBiens;
  
  constructor(private bienService: BienService) {
    console.log(jsonfile);
    jsonfile.forEach(function affiche(evta) {
      evta
    })
  }

  ngOnInit(): void {
    this.bienService.getBiens().subscribe(biens => {
      this.listeBiens = biens;
    })
  }

}
