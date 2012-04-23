VERSION = 1.7.2
NODEJS = $(if $(shell test -f /usr/bin/nodejs && echo "true"),nodejs,node)

all: build/dist/node-jquery.js build/dist/package.json

deps/jquery/.git:
	git submodule update --init --recursive

build/dist/jquery.js: deps/jquery/.git
	mkdir -p build
	make -C deps/jquery PREFIX=../../build jquery

build/dist/node-jquery.js: src/header.js build/dist/jquery.js src/footer.js
	cat src/header.js build/dist/jquery.js src/footer.js > build/dist/node-jquery.js

build/dist/package.json: build/dist/node-jquery.js
	cat package.node.json | sed 's/{VERSION}/${VERSION}/' > build/dist/package.json

build/dist/node_modules/jsdom: build/dist/package.json
	cd build/dist ; npm install
	
build/dist/node_module/nodeunit: build/dist/package.json
	cd build/dist ; npm install -d

package: build/dist/node-jquery.js build/dist/package.json
	cd build/dist; npm pack ./

install: build/dist/node-jquery.js build/dist/package.json
	npm install ./build/dist

publish: build/dist/node-jquery.js build/dist/package.json
	npm publish --force build/dist/.

test:	build/dist/node-jquery.js \
		build/dist/package.json \
		build/dist/node_modules/jsdom \
		build/dist/node_modules/nodeunit
	cd build/dist ; \
	cp -r ../../test . ;\
	npm install && npm install -d ;\
	$(NODEJS) node_modules/nodeunit/bin/nodeunit test/

clean:
	rm -rf build dist

dist: clean all package

.PHONY: all clean dist install package publish test
