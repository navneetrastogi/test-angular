import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIllnessRecord } from 'app/shared/model/illness-record.model';
import { IllnessRecordService } from './illness-record.service';

@Component({
    selector: 'jhi-illness-record-delete-dialog',
    templateUrl: './illness-record-delete-dialog.component.html'
})
export class IllnessRecordDeleteDialogComponent {
    illnessRecord: IIllnessRecord;

    constructor(
        private illnessRecordService: IllnessRecordService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.illnessRecordService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'illnessRecordListModification',
                content: 'Deleted an illnessRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-illness-record-delete-popup',
    template: ''
})
export class IllnessRecordDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ illnessRecord }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IllnessRecordDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.illnessRecord = illnessRecord;
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
