VERSION = 1.7.2
NODEJS = $(if $(shell test -f /usr/bin/nodejs && echo "true"),nodejs,node)

SUBMODULES = deps/jquery

define depend
$(1):
	git submodule update --init --recursive $(1)
endef

all: build/dist/node-jquery.js build/dist/package.json

$(foreach dep,$(SUBMODULES),$(eval $(call depend,$(dep))))

build/dist/jquery.js: deps/jquery
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

npm: build/dist/node-jquery.js build/dist/package.json
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

distclean: clean
	rm -rf node_modules package.json

.PHONY: all dist clean test npm
