FROM golang:1.8 as build
WORKDIR /go/src/github.com/farrellw/golang-angular-skeleton/go-server
COPY . .
RUN go get -d -v ./...
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=build /go/src/github.com/farrellw/golang-angular-skeleton/go-server .
CMD ["./main"]