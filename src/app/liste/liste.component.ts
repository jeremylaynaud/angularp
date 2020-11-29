import { Component, OnInit } from '@angular/core';
import { BienService } from '../bien.service';
import { Bien } from './bien';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  

  heroes: Bien[];

  constructor(private heroService: BienService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getBiens()
    .subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Bien): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deletebien(hero).subscribe();
  }
  add(titre: string, descrisption: string, images: string, catégories: string): void {
    titre = titre.trim();
    if (!titre) { return; }
    this.heroService.addBien({ titre, descrisption, images ,catégories} as Bien)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  
}
