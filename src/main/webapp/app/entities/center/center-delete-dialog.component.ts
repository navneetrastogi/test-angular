import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICenter } from 'app/shared/model/center.model';
import { CenterService } from './center.service';

@Component({
    selector: 'jhi-center-delete-dialog',
    templateUrl: './center-delete-dialog.component.html'
})
export class CenterDeleteDialogComponent {
    center: ICenter;

    constructor(private centerService: CenterService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.centerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'centerListModification',
                content: 'Deleted an center'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-center-delete-popup',
    template: ''
})
export class CenterDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ center }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CenterDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.center = center;
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
