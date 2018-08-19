import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IKudos } from 'app/shared/model/kudos.model';
import { KudosService } from './kudos.service';

@Component({
    selector: 'jhi-kudos-update',
    templateUrl: './kudos-update.component.html'
})
export class KudosUpdateComponent implements OnInit {
    private _kudos: IKudos;
    isSaving: boolean;
    createdOnDp: any;
    lastModifiedOnDp: any;

    constructor(private kudosService: KudosService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ kudos }) => {
            this.kudos = kudos;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.kudos.id !== undefined) {
            this.subscribeToSaveResponse(this.kudosService.update(this.kudos));
        } else {
            this.subscribeToSaveResponse(this.kudosService.create(this.kudos));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IKudos>>) {
        result.subscribe((res: HttpResponse<IKudos>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get kudos() {
        return this._kudos;
    }

    set kudos(kudos: IKudos) {
        this._kudos = kudos;
    }
}
