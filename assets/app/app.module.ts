import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {LogComponent} from './log/log.component';
import {LogContentComponent} from './log/log-content.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule
	],
	declarations: [
		LogComponent,
		LogContentComponent,
		AppComponent
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {}


