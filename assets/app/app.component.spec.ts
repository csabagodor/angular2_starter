/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { LogContentComponent } from './log/log-content.component';

describe('AppComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpModule
			],
			declarations: [
				AppComponent,
				LogComponent,
				LogContentComponent
			]
		});
		TestBed.compileComponents();
	});

	it('should create the app', async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it(`should have as title 'app works!'`, async(() => {
		let fixture = TestBed.createComponent(AppComponent);
		let app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('app works!');
	}));

});
