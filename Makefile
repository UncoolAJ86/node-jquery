NODEJS = $(if $(shell test -f /usr/bin/nodejs && echo "true"),nodejs,node)

SUBMODULES = deps/jquery \
			 deps/jsdom \
			 deps/nodeunit

define depend
$(1):
	git submodule update --init --recursive $(1)
endef

all: wrapper



$(foreach dep,$(SUBMODULES),$(eval $(call depend,$(dep))))

build/dist/jquery.js: deps/jquery
	mkdir -p build
	make -C deps/jquery PREFIX=../../build jquery

wrapper: dist/node-jquery.js

dist:
	mkdir -p dist

dist/node-jquery.js: dist src/header.js build/dist/jquery.js src/footer.js
	cat src/header.js build/dist/jquery.js src/footer.js > dist/node-jquery.js

dist/package.json: dist/node-jquery.js
	cp package.node.json dist/package.json

clean:
	rm -rf build dist

package: dist/package.json
	cd dist; npm pack ./

install: dist/package.json
	npm uninstall jquery ; npm install ./dist

npm: dist/node-jquery.js dist/package.json
	cp package.node.json dist/package.json; cd dist; npm publish --force ./


test: dist/node-jquery.js dist/package.json
	cd dist ; npm install && npm install -d
	$(NODEJS) dist/node_modules/nodeunit/bin/nodeunit test/

.PHONY: all wrapper clean test npm
