PROTO_PATH:=$(PWD)/../../proto

proto-cp:
	cp -r $(PROTO_PATH) .

proto-rm:
	rm -rf proto

proto: proto-cp buf-generate proto-rm

buf-generate:
	buf generate --template buf.gen.yaml

clean: rm-proto ## Clean directory
