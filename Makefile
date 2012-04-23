NODEJS = $(if $(shell test -f /usr/bin/nodejs && echo "true"),nodejs,node)

all: build/dist/node-jquery.js

deps/jquery/.git:
	git submodule update --init --recursive

build/dist/jquery.js: deps/jquery/.git
	mkdir -p build
	make -C deps/jquery PREFIX=../../build jquery

build/dist/node-jquery.js: src/header.js build/dist/jquery.js src/footer.js
	cat src/header.js build/dist/jquery.js src/footer.js > build/dist/node-jquery.js

node_modules/jsdom:
	npm install
	
node_module/nodeunit:
	npm install -d

package: build/dist/node-jquery.js
	npm pack .

publish: build/dist/node-jquery.js
	npm publish --force .

test:	build/dist/node-jquery.js
	npm test

clean:
	rm -rf build dist

dist: clean all

.PHONY: all clean dist install package publish test
