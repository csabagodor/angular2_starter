import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';

@Component({
	selector: 'my-app',
	encapsulation: ViewEncapsulation.None,
	templateUrl: './app.component.pug',
	styleUrls: ['./app.component.scss'],
	providers: [
		AppState
	]
})

export class AppComponent {
	title = 'app works!';

	constructor(public appState: AppState) {
	}

}

