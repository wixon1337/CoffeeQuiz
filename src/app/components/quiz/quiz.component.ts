import { Component, OnInit } from '@angular/core';
import { JServiceService } from 'src/app/services/j-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private jService: JServiceService) { }

  ngOnInit() {
    //this.jService.getClues().subscribe(data => console.log(data));
    this.jService.getRandom().subscribe(data => console.log(data));
    //this.jService.getCategories().subscribe(data => console.log(data));
    //this.jService.getCategory(1).subscribe(data => console.log(data));
  }

}
