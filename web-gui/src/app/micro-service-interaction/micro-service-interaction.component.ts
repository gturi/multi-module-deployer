import { Component, Input, OnInit } from '@angular/core';
import { HttpRequestService } from '../utils/http-request.service';

@Component({
  selector: 'app-micro-service-interaction',
  templateUrl: './micro-service-interaction.component.html',
  styleUrls: ['./micro-service-interaction.component.scss']
})
export class MicroServiceInteractionComponent implements OnInit {

  @Input() serviceRole: string;
  @Input() servicePort: number;
  private serviceAddress: string;
  count: number = undefined;

  constructor(private httpRequestService: HttpRequestService) {
  }

  ngOnInit() {
    this.serviceAddress = `http://127.0.0.1:${this.servicePort}`;
  }

  getServiceStatus() {
    console.log(`${this.serviceAddress}/api/status`);
    const options = {responseType: 'text'};
    this.httpRequestService.get<any>(`${this.serviceAddress}/api/status`, options).then(res => {
      console.log(res);
    });
  }

  getCount() {
    this.httpRequestService.get<any>(`${this.serviceAddress}/api/ping`).then(res => {
      this.count = res.ping;
    });
  }
}