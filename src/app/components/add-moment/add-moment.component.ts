import { Component, Input, OnInit } from '@angular/core';
import { MomentsService } from 'src/app/services/moments.service';
import { Moment } from 'src/types/momentType';

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.css'],
})
export class AddMomentComponent implements OnInit {
  buttonText: string = 'Compartilhar';

  constructor(private momentService: MomentsService) {}

  ngOnInit(): void {}

  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    await this.momentService.createMoment(formData).subscribe();

    console.log('deu boa');
  }
}
