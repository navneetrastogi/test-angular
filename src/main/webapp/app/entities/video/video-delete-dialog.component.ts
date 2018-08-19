import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVideo } from 'app/shared/model/video.model';
import { VideoService } from './video.service';

@Component({
    selector: 'jhi-video-delete-dialog',
    templateUrl: './video-delete-dialog.component.html'
})
export class VideoDeleteDialogComponent {
    video: IVideo;

    constructor(private videoService: VideoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.videoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'videoListModification',
                content: 'Deleted an video'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-video-delete-popup',
    template: ''
})
export class VideoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ video }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VideoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.video = video;
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
