FROM golang:1.22.4

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go install github.com/cosmtrek/air@v1.40.4

CMD ["make", "start"]
