import { Component, OnInit } from '@angular/core';
import { JServiceService } from 'src/app/services/j-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  newData;
  question: string;
  answer: string;
  airdate: string;
  category: string;
  id: string;
  value: number;

  constructor(private jService: JServiceService) { }

  ngOnInit() {
    //this.jService.getClues().subscribe(data => console.log(data));
    this.jService.getRandom().subscribe(data => {
      console.log(data)
      this.newData = data;
      this.question = this.newData[0].question;
      this.answer = this.newData[0].answer;
      let airdateArray = this.newData[0].airdate.split('T');
      this.airdate = airdateArray[0];
      this.category = this.newData[0].category.title;
      this.id = this.newData[0].id;
      this.value = this.newData[0].value;
    });
    //this.jService.getCategories().subscribe(data => console.log(data));
    // this.jService.getCategory(1).subscribe(data => console.log(data));
  }

}
