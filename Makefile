REGISTRY=cvcio
PROJECT=rtaa-72
TAG=`cat VERSION`
BUF_VERSION=1.7.0
CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
REG_PROJ=$(REGISTRY)/$(PROJECT)-$(MODULE)
REG_TAG=$(REGISTRY)/$(PROJECT)-$(MODULE):$(TAG)
SERVICES=app stream

keys:
	openssl req \
		-newkey rsa:2048 \
		-nodes -keyout server-key.key \
		-x509 -out server-cert.pem \
		-addext "subjectAltName = DNS:localhost"

tools:
	go get github.com/oxequa/realize
	go get github.com/golangci/golangci-lint

buf-install:
	curl -sSL \
    	"https://github.com/bufbuild/buf/releases/download/v${BUF_VERSION}/buf-$(shell uname -s)-$(shell uname -m)" \
    	-o "$(shell go env GOPATH)/bin/buf" && \
  	chmod +x "$(shell go env GOPATH)/bin/buf"

buf-generate:
	buf generate --template buf.gen.yaml

buf-update:
	buf mod update

buf-lint:
	buf lint

proto: buf-update buf-lint buf-generate

swag:
	swagger serve swagger/*.json

run-app:
	cd cmd/app; yarn serve
	
run-stream:
	realize start -n stream

test:
	go test -v ./...

lint:
	golangci-lint run -e vendor

services-build:
	for name in ${SERVICES}; do\
		cp cmd/$$name/Dockerfile.$$name .;\
		echo "Building image $$name";\
		docker build -f Dockerfile.$$name --rm -t $(REGISTRY)/$(PROJECT)-$$name:$(TAG) .;\
		docker tag $(REGISTRY)/$(PROJECT)-$$name:$(TAG) $(REGISTRY)/$(PROJECT)-$$name:latest;\
		rm Dockerfile.$$name;\
	done

services-push:
	for name in ${SERVICES}; do\
		docker push $(REGISTRY)/$(PROJECT)-$$name:$(TAG);\
		docker push $(REGISTRY)/$(PROJECT)-$$name:latest;\
	done

services-run:
	docker-compose -f docker-compose.yaml up

services: services-build services-run

# This included makefile should define the 'custom' target rule which is called here.
include $(INCLUDE_MAKEFILE)

.PHONY: release
release: custom 
