FROM golang:1.22.3

WORKDIR /app/linebot

RUN go install github.com/cosmtrek/air@v1.40.4

EXPOSE 3012

CMD ["make", "start"]
