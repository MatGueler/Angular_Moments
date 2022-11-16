import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faComment,
  faCommenting,
  faEdit,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { CommentsService } from 'src/app/services/comments.service';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentsService } from 'src/app/services/moments.service';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/types/comments';
import { Moment } from 'src/types/momentType';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  newComment: boolean = false;
  commentForm!: FormGroup;

  faTimes = faTimes;
  faEdit = faEdit;
  faComment = faComment;
  faCommenting = faCommenting;

  baseApiUrl = environment.baseApiUrl;

  constructor(
    private momentService: MomentsService,
    private messageService: MessagesService,
    private commentService: CommentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: string) {
    await this.momentService.removeMoment(id).subscribe();

    this.messageService.addMessage('Momento excluído!');
    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;
    console.log(data);
    data.momentId = Number(this.moment!.id);

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messageService.addMessage('Comentário adicionado!');

    // - To reset commen form
    this.commentForm.reset();
    formDirective.resetForm();
  }
}
