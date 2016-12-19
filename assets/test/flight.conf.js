exports.config = {
	directConnect: false,

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		"browserName": "chrome"
	},

	// Spec patterns are relative to the current working directly when
	// protractor is called.
	specs: ["./flight.spec.js"],// "**/flightResult_spec.js"],

	useAllAngular2AppRoots: true,

	seleniumAddress: "http://localhost:4444/wd/hub",

	baseUrl: "http://local.liligo.com",

	params: {
		from: {
			short: "Paris",
			long: "Paris (PAR)",
			longMobile: "ParisPAR",
			keyword: "par",
			iata: "PAR"
		},
		to: {
			short: "New York",
			long: "New York (NYC)",
			longMobile: "New YorkNYC",
			keyword: "new",
			iata: "NYC"
		}
	},

	framework: "jasmine2"
};

