import { Component, OnInit, OnDestroy } from '@angular/core';
import { JServiceService } from 'src/app/services/j-service.service';
import { Clue } from 'src/app/models/Clue';
import { Category } from 'src/app/models/Category';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  newData;
  clue: Clue;
  private _unsubscribe$ = new Subject<void>();

  constructor(private jService: JServiceService) { }

  ngOnInit() {
    //this.jService.getClues().subscribe(data => console.log(data));
    this.jService.getRandom().pipe(takeUntil(this._unsubscribe$)).subscribe(data => {
      console.log(data)
      this.newData = data;
      this.clue = new Clue(
        this.newData[0].id,
        this.newData[0].question,
        this.newData[0].answer,
        this.airdateFormat(this.newData[0].airdate),
        new Category(this.newData[0].category.id, this.newData[0].category.title),
        this.newData[0].value
      )
    });
    //this.jService.getCategories().subscribe(data => console.log(data));
    // this.jService.getCategory(1).subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  airdateFormat(airdate: string): string {
    let airdateArray = airdate.split('T');
    return airdateArray[0];
  }

}
