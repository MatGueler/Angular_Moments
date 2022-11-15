import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentsService } from 'src/app/services/moments.service';
import { environment } from 'src/environments/environment';
import { Moment } from 'src/types/momentType';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;

  faTimes = faTimes;
  faEdit = faEdit;

  baseApiUrl = environment.baseApiUrl;

  constructor(
    private momentService: MomentsService,
    private messageService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id: string) {
    await this.momentService.removeMoment(id).subscribe();

    this.messageService.addMessage('Momento excluído!');
    this.router.navigate(['/']);
  }
}
