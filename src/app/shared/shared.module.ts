import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzListModule } from 'ng-zorro-antd/list';
@NgModule({
    imports:[
        FormsModule,
        ReactiveFormsModule,
        NgxErrorsModule,
        NzLayoutModule,
        NzDividerModule,
        NzGridModule,
        NzMessageModule,
        NzButtonModule,
        NzAvatarModule,
        NzIconModule,
        NzToolTipModule,
        NzModalModule,
        NzDatePickerModule,
        NzTimePickerModule,
        NzListModule
    ],   
    exports:[
        FormsModule,
        ReactiveFormsModule,
        NgxErrorsModule ,
        NzLayoutModule,
        NzDividerModule ,
        NzGridModule,
        NzMessageModule ,
        NzButtonModule,
        NzAvatarModule,
        NzIconModule,
        NzToolTipModule,
        NzModalModule,
        NzDatePickerModule,
        NzTimePickerModule,
        NzListModule ]  
})

export class SharedModule { }