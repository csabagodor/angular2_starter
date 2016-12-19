describe('flightSF', function () {

	beforeEach(function () {
		browser.get('http://localhost:3000/');
		browser.waitForAngular();
	});

	afterEach(function () {
		//browser.get('http://local.liligo.com');
		//**TEST valami commetn
		
		browser.executeScript('if(window.localStorage){window.localStorage.clear();}');
	});

	it('should load the page', function () {
		expect(browser.getTitle()).toEqual("angular2");
	});

	it('Clicking on the button', function () {
		$('#log_button').click();
	});
});


