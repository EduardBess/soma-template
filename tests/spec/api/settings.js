describe("settings", function () {

	var settings;

	beforeEach(function () {
		createContainer();
		createTemplate();
		settings = soma.template.settings;
	});

	afterEach(function () {
		disposeTemplate();
		disposeContainer();
	});

	it("settings value", function () {
		expect(settings).toBeDefined();
		expect(settings).toEqual(jasmine.any(Object));
	});

	it("tokens values", function () {
		expect(settings.tokens).toBeDefined();
		expect(settings.tokens).toEqual(jasmine.any(Object));
		expect(settings.tokens.start()).toEqual('{{');
		expect(settings.tokens.end()).toEqual('}}');
	});

	it("attributes values", function () {
		expect(settings.attributes).toBeDefined();
		expect(settings.attributes).toEqual(jasmine.any(Object));
		expect(settings.attributes.skip).toEqual('data-skip');
		expect(settings.attributes.repeat).toEqual('data-repeat');
		expect(settings.attributes.src).toEqual('data-src');
		expect(settings.attributes.href).toEqual('data-href');
		expect(settings.attributes.show).toEqual('data-show');
		expect(settings.attributes.hide).toEqual('data-hide');
		expect(settings.attributes.cloak).toEqual('data-cloak');
	});

	it("attributes vars", function () {
		expect(settings.vars).toBeDefined();
		expect(settings.vars).toEqual(jasmine.any(Object));
		expect(settings.vars.index).toEqual('$index');
		expect(settings.vars.key).toEqual('$key');
	});

	it("change token start", function () {
		settings.tokens.start('[-(');
		expect(settings.tokens.start()).toEqual('\\[\\-\\(');
		var t1 = createTemplateWithContent('[-(name}}');
		t1.scope.name = "john";
		t1.render();
		expect(t1.element.innerHTML).toEqual('john');
		settings.tokens.start('{{');
	});

	it("change token end", function () {
		settings.tokens.end(']');
		expect(settings.tokens.end()).toEqual('\\]');
		var t1 = createTemplateWithContent('{{name]');
		t1.scope.name = "john";
		t1.render();
		expect(t1.element.innerHTML).toEqual('john');
		settings.tokens.end('}}');
	});

	it("change skip", function () {
		settings.attributes.skip = 'custom-skip';
		var t1 = createTemplateWithContent('<span custom-skip>{{name}}</span>');
		t1.scope.name = 'john';
		t1.render();
		expect(t1.element.firstChild.innerHTML).toEqual('{{name}}');
	});

	it("change src", function () {
		settings.attributes.src = 'custom-src';
		var t1 = createTemplateWithContent('<span custom-src="{{name}}"></span>');
		t1.scope.name = 'john';
		t1.render();
		expect(t1.element.firstChild.getAttribute('src')).toEqual('john');
	});

	it("change href", function () {
		settings.attributes.href = 'custom-href';
		var t1 = createTemplateWithContent('<span custom-href="{{name}}"></span>');
		t1.scope.name = 'soundstep.com';
		t1.render();
		expect(t1.element.firstChild.getAttribute('href')).toEqual('soundstep.com');
	});

	it("change show", function () {
		settings.attributes.show = 'custom-show';
		var t1 = createTemplateWithContent('<span custom-show="true"></span>');
		t1.scope.name = 'soundstep.com';
		t1.render();
		expect(t1.element.firstChild.style.display).toEqual('block');
	});

	it("change hide", function () {
		settings.attributes.hide = 'custom-hide';
		var t1 = createTemplateWithContent('<span custom-hide="true"></span>');
		t1.scope.name = 'soundstep.com';
		t1.render();
		expect(t1.element.firstChild.style.display).toEqual('none');
	});

	it("change cloak", function () {
		settings.attributes.cloak = 'custom-cloak';
		var t1 = createTemplateWithContent('<span class="custom-cloak"></span>');
		t1.scope.name = 'soundstep.com';
		t1.render();
		expect(t1.element.firstChild.getAttribute('class')).not.toEqual('custom-cloak');
	});

	it("change cloak", function () {
		settings.attributes.repeat = 'custom-repeat';
		var t1 = createTemplateWithContent('<span custom-repeat="item in items"></span>');
		t1.scope.items = [1, 2, 3];
		t1.render();
		expect(t1.element.childNodes.length).toEqual(3);
	});

	it("change index", function () {
		settings.vars.index = 'new-index';
		var t1 = createTemplateWithContent('<span custom-repeat="item in items">{{new-index}}</span>');
		t1.scope.items = [1, 2, 3];
		t1.render();
		expect(t1.element.childNodes[0].firstChild.nodeValue).toEqual('0');
		expect(t1.element.childNodes[1].firstChild.nodeValue).toEqual('1');
		expect(t1.element.childNodes[2].firstChild.nodeValue).toEqual('2');
	});

	it("change index", function () {
		settings.vars.key = 'new-key';
		var t1 = createTemplateWithContent('<span custom-repeat="item in items">{{new-key}}</span>');
		t1.scope.items = {item1:1, item2:2, item3:3};
		t1.render();
		expect(t1.element.childNodes[0].firstChild.nodeValue).toEqual('item1');
		expect(t1.element.childNodes[1].firstChild.nodeValue).toEqual('item2');
		expect(t1.element.childNodes[2].firstChild.nodeValue).toEqual('item3');
	});

});