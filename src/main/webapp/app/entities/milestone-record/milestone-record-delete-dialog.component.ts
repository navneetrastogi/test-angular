import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMilestoneRecord } from 'app/shared/model/milestone-record.model';
import { MilestoneRecordService } from './milestone-record.service';

@Component({
    selector: 'jhi-milestone-record-delete-dialog',
    templateUrl: './milestone-record-delete-dialog.component.html'
})
export class MilestoneRecordDeleteDialogComponent {
    milestoneRecord: IMilestoneRecord;

    constructor(
        private milestoneRecordService: MilestoneRecordService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.milestoneRecordService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'milestoneRecordListModification',
                content: 'Deleted an milestoneRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-milestone-record-delete-popup',
    template: ''
})
export class MilestoneRecordDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ milestoneRecord }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MilestoneRecordDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.milestoneRecord = milestoneRecord;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
