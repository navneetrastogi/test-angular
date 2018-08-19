import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentProfile } from 'app/shared/model/student-profile.model';

@Component({
    selector: 'jhi-student-profile-detail',
    templateUrl: './student-profile-detail.component.html'
})
export class StudentProfileDetailComponent implements OnInit {
    studentProfile: IStudentProfile;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentProfile }) => {
            this.studentProfile = studentProfile;
        });
    }

    previousState() {
        window.history.back();
    }
}
