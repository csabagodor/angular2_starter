import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class LogService {
	constructor(private http: Http) {
	}

	startPh() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:3000/log', JSON.stringify({
			title: 'teszt123',
			description: 'szöveg tewszt'
		}), { headers: headers })
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}

	getLogs() {
		return this.http.get('http://localhost:3000/log')
			.map((response: Response) => {
				return response.json().obj;
			})
			.catch((error: Response) => Observable.throw(error.json()));
	}
}
