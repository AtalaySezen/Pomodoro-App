import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container-detail',
  templateUrl: './container-detail.component.html',
  styleUrls: ['./container-detail.component.scss']
})
export class ContainerDetailComponent {
  @Input() infoHeader: string;
  @Input() infoText: any;
  @Input() iconName: string;


}
