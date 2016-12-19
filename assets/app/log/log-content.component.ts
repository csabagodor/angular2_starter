import { Component, Input } from "@angular/core";
import {Log} from './log.model';

@Component({
	selector: "app-log-content",
	template: `
		<div>{{log.title}} - {{log.description}}</div>
	`
})
export class LogContentComponent {
	@Input() log: Log;
	
	constructor() {
		
	}
}