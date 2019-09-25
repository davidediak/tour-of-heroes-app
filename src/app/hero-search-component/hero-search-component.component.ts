import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search-component',
  templateUrl: './hero-search-component.component.html',
  styleUrls: ['./hero-search-component.component.css']
})
export class HeroSearchComponentComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(333),

      distinctUntilChanged(),

      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
