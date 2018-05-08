start-database:
	mongod --bind_ip_all

start-client:
	cd ./angular-client; docker-build -t client; docker run -it