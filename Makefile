default: FORCE help

help: FORCE
	@echo "make publish"

publish: FORCE
	ssh dse@webonastick.com "bash -c 'cd git/dse.d/split-flap && git pull && npm run build'"

.PHONY: FORCE
