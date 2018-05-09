start-database:
	mongod --bind_ip_all

start-client:
	cd ./angular-client; docker-build -t client; docker run -it

start-server-local:
	cd ./go-server; go run main.go

start-client-local:
	cd ./angular-client; ng serve		