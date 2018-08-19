import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { Principal } from 'app/core';
import { StudentProfileService } from './student-profile.service';

@Component({
    selector: 'jhi-student-profile',
    templateUrl: './student-profile.component.html'
})
export class StudentProfileComponent implements OnInit, OnDestroy {
    studentProfiles: IStudentProfile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private studentProfileService: StudentProfileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.studentProfileService.query().subscribe(
            (res: HttpResponse<IStudentProfile[]>) => {
                this.studentProfiles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStudentProfiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStudentProfile) {
        return item.id;
    }

    registerChangeInStudentProfiles() {
        this.eventSubscriber = this.eventManager.subscribe('studentProfileListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
