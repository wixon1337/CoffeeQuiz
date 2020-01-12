import { Component, OnInit } from '@angular/core';
import { JServiceService } from 'src/app/services/j-service.service';
import { Clue } from 'src/app/models/Clue';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  newData;
  clue: Clue;
  /*   question: string;
    answer: string;
    airdate: string;
    category: string;
    id: number;
    value: number; */

  constructor(private jService: JServiceService) { }

  ngOnInit() {
    //this.jService.getClues().subscribe(data => console.log(data));
    this.jService.getRandom().subscribe(data => {
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
      /*       this.question = this.newData[0].question;
            this.answer = this.newData[0].answer;
            let airdateArray = this.newData[0].airdate.split('T');
            this.airdate = airdateArray[0];
            this.category = this.newData[0].category.title;
            this.id = this.newData[0].id;
            this.value = this.newData[0].value; */
    });
    //this.jService.getCategories().subscribe(data => console.log(data));
    // this.jService.getCategory(1).subscribe(data => console.log(data));
  }

  airdateFormat(airdate: string): string {
    let airdateArray = airdate.split('T');
    return airdateArray[0];
  }

}
