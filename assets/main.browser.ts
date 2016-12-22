import './polyfills';
/*
 * Angular bootstraping
 */
import { AppState } from './app/app.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader, removeNgStyles, createInputTransfer, createNewHosts } from '@angularclass/hmr';
import { AppComponent } from './app/app.component';
import { ApplicationRef, NgModule } from '@angular/core';
import { LogComponent } from './app/log/log.component';
import { LogContentComponent } from './app/log/log-content.component';
import AppModule from './app/app.module';

@NgModule({
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		HttpModule,
		AppModule,
	],
	declarations: [
		LogComponent,
		LogContentComponent,
		AppComponent
	],
	providers: [
		AppState
	]
})
class MainModule {
	constructor(public appRef: ApplicationRef, public appState: AppState) {
	}

	hmrOnInit(store) {
		if (!store || !store.state) {
			return;
		}
		console.log('HMR store', JSON.stringify(store, null, 2));
		// restore state
		this.appState.setState(store.state);
		// restore input values
		if ('restoreInputValues' in store) {
			store.restoreInputValues();
		}
		this.appRef.tick();
		Object.keys(store).forEach(prop => delete store[prop]);
	}

	hmrOnDestroy(store) {
		const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
		const currentState = this.appState.getState();
		store.state = currentState;
		// recreate elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// save input values
		store.restoreInputValues = createInputTransfer();
		// remove styles
		removeNgStyles();
	}

	hmrAfterDestroy(store) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}
}

export function main() {
	return platformBrowserDynamic().bootstrapModule(MainModule);
}

// boot on document ready
bootloader(main);
