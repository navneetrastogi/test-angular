import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IConversation } from 'app/shared/model/conversation.model';
import { ConversationService } from './conversation.service';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/entities/teacher';
import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from 'app/entities/parent';

@Component({
    selector: 'jhi-conversation-update',
    templateUrl: './conversation-update.component.html'
})
export class ConversationUpdateComponent implements OnInit {
    private _conversation: IConversation;
    isSaving: boolean;

    teachers: ITeacher[];

    parents: IParent[];
    createdOnDp: any;
    sentOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private conversationService: ConversationService,
        private teacherService: TeacherService,
        private parentService: ParentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ conversation }) => {
            this.conversation = conversation;
        });
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacher[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parentService.query().subscribe(
            (res: HttpResponse<IParent[]>) => {
                this.parents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.conversation.id !== undefined) {
            this.subscribeToSaveResponse(this.conversationService.update(this.conversation));
        } else {
            this.subscribeToSaveResponse(this.conversationService.create(this.conversation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConversation>>) {
        result.subscribe((res: HttpResponse<IConversation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTeacherById(index: number, item: ITeacher) {
        return item.id;
    }

    trackParentById(index: number, item: IParent) {
        return item.id;
    }
    get conversation() {
        return this._conversation;
    }

    set conversation(conversation: IConversation) {
        this._conversation = conversation;
    }
}
