import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	templateUrl: './app.component.pug',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title = 'app works!';

	constructor() {
		console.log('hihi');
	}
}