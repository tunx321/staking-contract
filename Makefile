include .env

compile:
	npx hardhat compile

deploy:
	npx hardhat run scripts/deploy.js --network ${NETWORK}


verify:
ifdef address
	npx hardhat verify --network ${NETWORK} ${address} "86400"
else
	echo "need to specify which contract to verify using address=value"
endif


run:
	npm run start


ctest:
	npx hardhat test