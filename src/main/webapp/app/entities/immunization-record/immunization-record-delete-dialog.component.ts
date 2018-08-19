import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';
import { ImmunizationRecordService } from './immunization-record.service';

@Component({
    selector: 'jhi-immunization-record-delete-dialog',
    templateUrl: './immunization-record-delete-dialog.component.html'
})
export class ImmunizationRecordDeleteDialogComponent {
    immunizationRecord: IImmunizationRecord;

    constructor(
        private immunizationRecordService: ImmunizationRecordService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.immunizationRecordService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'immunizationRecordListModification',
                content: 'Deleted an immunizationRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-immunization-record-delete-popup',
    template: ''
})
export class ImmunizationRecordDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ immunizationRecord }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ImmunizationRecordDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.immunizationRecord = immunizationRecord;
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
