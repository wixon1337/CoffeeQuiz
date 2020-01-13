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
  answer: string;
  time: number = 60;
  newTimer: number;
  categories;
  selectedCategory;
  interval;
  showAnswer: boolean = false;
  private _unsubscribe$ = new Subject<void>();

  constructor(private jService: JServiceService) { }

  ngOnInit() {
    this.jService.getCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
    this.newClue();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  airdateFormat(airdate: string): string {
    let airdateArray = airdate.split('T');
    return airdateArray[0];
  }

  newClue(): void {
    this.changeTimer();
    if (this.selectedCategory !== "null" && this.selectedCategory !== undefined) {
      this.getClueFromSelectedCategory(this.selectedCategory);
    } else {
      console.log("random")
      this.getRandomClue();
    }
    this.showAnswer = false;
    console.log("selected cat: " + this.selectedCategory)
  }

  getRandomClue(): void {
    this.jService.getRandom().pipe(takeUntil(this._unsubscribe$)).subscribe(data => {
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
  }

  getClueFromSelectedCategory(categoryId: number): void {
    this.jService.getCategory(categoryId).pipe(takeUntil(this._unsubscribe$)).subscribe(data => {
      this.newData = data;
      console.log(data);
      let clues = this.newData.clues;
      console.log(clues);
      let randomClueIndex = Math.floor(Math.random() * clues.length);
      this.clue = new Clue(
        this.newData.clues[randomClueIndex].id,
        this.newData.clues[randomClueIndex].question,
        this.newData.clues[randomClueIndex].answer,
        this.airdateFormat(this.newData.clues[randomClueIndex].airdate),
        new Category(this.newData.id, this.newData.title),
        this.newData.clues[randomClueIndex].value
      )
    })
  }

  submit(): void {
    if (this.answer && this.validation(this.answer) === this.validation(this.clue.answer)) {
      alert("Correct answer!");
    } else {
      alert("Wrong answer!");
    }
    this.showAnswer = true;
  }

  validation(inputString: string): string {
    return inputString.replace(/\s/g, '').toLowerCase().replace(/\"/g, '');
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        alert("Times up!");
        this.pauseTimer();
        this.showAnswer = true;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  changeTimer() {
    this.pauseTimer();
    if (this.newTimer) {
      this.time = this.newTimer;
    }
    this.startTimer();
  }
}
