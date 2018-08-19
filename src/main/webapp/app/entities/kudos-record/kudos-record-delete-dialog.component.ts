import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKudosRecord } from 'app/shared/model/kudos-record.model';
import { KudosRecordService } from './kudos-record.service';

@Component({
    selector: 'jhi-kudos-record-delete-dialog',
    templateUrl: './kudos-record-delete-dialog.component.html'
})
export class KudosRecordDeleteDialogComponent {
    kudosRecord: IKudosRecord;

    constructor(
        private kudosRecordService: KudosRecordService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.kudosRecordService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'kudosRecordListModification',
                content: 'Deleted an kudosRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-kudos-record-delete-popup',
    template: ''
})
export class KudosRecordDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kudosRecord }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(KudosRecordDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.kudosRecord = kudosRecord;
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
