import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAttendance } from 'app/shared/model/attendance.model';

@Component({
    selector: 'jhi-attendance-detail',
    templateUrl: './attendance-detail.component.html'
})
export class AttendanceDetailComponent implements OnInit {
    attendance: IAttendance;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ attendance }) => {
            this.attendance = attendance;
        });
    }

    previousState() {
        window.history.back();
    }
}
