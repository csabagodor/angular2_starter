import { Component, OnInit } from '@angular/core';
import { LogService } from './log.service';
import { Log } from './log.model';
import { AppState } from '../app.service';

@Component({
	selector: 'app-log',
	template: `
		<div>
			<button class='btn btn-primary' (click)='onTest()'>Log test</button>
		</div>
		<hr>
		<app-log-content [log]='log' *ngFor='let log of logs'></app-log-content>
	`,
	providers: [LogService]
})
export class LogComponent implements OnInit {
	logs: Log[];

	constructor(public appState: AppState, private logService: LogService) {
	}

	ngOnInit() {
		this.logService.getLogs()
			.subscribe(
				(logs: Log[]) => {
					this.logs = logs;
				}
			);
	}

	onTest() {
		this.logService.startPh().subscribe(
			// result => console.log(result)
		);
	}
}
