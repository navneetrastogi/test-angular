import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TestangularOrganizationModule } from './organization/organization.module';
import { TestangularCenterModule } from './center/center.module';
import { TestangularRoomModule } from './room/room.module';
import { TestangularScheduleModule } from './schedule/schedule.module';
import { TestangularEventModule } from './event/event.module';
import { TestangularActivityModule } from './activity/activity.module';
import { TestangularActivityTypeModule } from './activity-type/activity-type.module';
import { TestangularPhotoModule } from './photo/photo.module';
import { TestangularVideoModule } from './video/video.module';
import { TestangularStudentModule } from './student/student.module';
import { TestangularStudentProfileModule } from './student-profile/student-profile.module';
import { TestangularTeacherModule } from './teacher/teacher.module';
import { TestangularHolidayModule } from './holiday/holiday.module';
import { TestangularKudosModule } from './kudos/kudos.module';
import { TestangularKudosRecordModule } from './kudos-record/kudos-record.module';
import { TestangularMilestoneModule } from './milestone/milestone.module';
import { TestangularMilestoneRecordModule } from './milestone-record/milestone-record.module';
import { TestangularIncidentModule } from './incident/incident.module';
import { TestangularGalleryModule } from './gallery/gallery.module';
import { TestangularPaymentModule } from './payment/payment.module';
import { TestangularImmunizationRecordModule } from './immunization-record/immunization-record.module';
import { TestangularIllnessRecordModule } from './illness-record/illness-record.module';
import { TestangularAttendanceModule } from './attendance/attendance.module';
import { TestangularParentModule } from './parent/parent.module';
import { TestangularPermissionModule } from './permission/permission.module';
import { TestangularFeatureModule } from './feature/feature.module';
import { TestangularNotificationModule } from './notification/notification.module';
import { TestangularTaskModule } from './task/task.module';
import { TestangularTaskTypeModule } from './task-type/task-type.module';
import { TestangularConversationModule } from './conversation/conversation.module';
import { TestangularTimelineModule } from './timeline/timeline.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TestangularOrganizationModule,
        TestangularCenterModule,
        TestangularRoomModule,
        TestangularScheduleModule,
        TestangularEventModule,
        TestangularActivityModule,
        TestangularActivityTypeModule,
        TestangularPhotoModule,
        TestangularVideoModule,
        TestangularStudentModule,
        TestangularStudentProfileModule,
        TestangularTeacherModule,
        TestangularHolidayModule,
        TestangularKudosModule,
        TestangularKudosRecordModule,
        TestangularMilestoneModule,
        TestangularMilestoneRecordModule,
        TestangularIncidentModule,
        TestangularGalleryModule,
        TestangularPaymentModule,
        TestangularImmunizationRecordModule,
        TestangularIllnessRecordModule,
        TestangularAttendanceModule,
        TestangularParentModule,
        TestangularPermissionModule,
        TestangularFeatureModule,
        TestangularNotificationModule,
        TestangularTaskModule,
        TestangularTaskTypeModule,
        TestangularConversationModule,
        TestangularTimelineModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularEntityModule {}
