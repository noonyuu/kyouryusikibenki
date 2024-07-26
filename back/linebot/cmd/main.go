package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/line/line-bot-sdk-go/linebot"
)

func loadEnv() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Panicln("読み込み出来ませんでした: %v", err)
	}
}

func main() {
	loadEnv()
	// GeminiInit()
	server := gin.Default()

	var bot *linebot.Client
	var err error

	// jwt, err := Jwt()
	fmt.Println("30")
	if err != nil {
		bot, err = linebot.New(
			os.Getenv("LINE_BOT_CHANNEL_SECRET"),
			os.Getenv("LINE_BOT_CHANNEL_TOKEN"),
		)
		if err != nil {
			log.Fatal(err)
		}
		return
	} else {
		bot, err = linebot.New(
			os.Getenv("LINE_BOT_CHANNEL_SECRET"),
			os.Getenv("LINE_BOT_CHANNEL_TOKEN"),
		)
		if err != nil {
			log.Fatal(err)
		}
		// return
	}
	fmt.Println("50")
	server.GET("/", func(c *gin.Context) {

		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	server.POST("/callback", func(c *gin.Context) {
		fmt.Println("59")
		events, err := bot.ParseRequest(c.Request)
		if err != nil {
			if err == linebot.ErrInvalidSignature {
				log.Print(err)
			}
			return
		}
		fmt.Println("67")
		for _, event := range events {
			if event.Type == linebot.EventTypeMessage {
				switch message := event.Message.(type) {
				case *linebot.TextMessage:
					if _, err = bot.ReplyMessage(event.ReplyToken, linebot.NewTextMessage(message.Text)).Do(); err != nil {
						log.Print(err)
						return
					}
					data := map[string]string{
						"word": message.Text,
						"day":  time.Now().Format(time.DateTime),
					}
					jsonData, err := json.Marshal(data)
					if err != nil {
						fmt.Println("Error marshalling JSON:", err)
						return
					}
					// https://benki.noonyuu.com/app/v1/word-listにデータを入れる
					client := &http.Client{}
					req, err := http.NewRequest("POST", "https://benki.noonyuu.com/app/v1/word-list", bytes.NewBuffer(jsonData))
					if err != nil {
						log.Fatal(err)
					}
					req.Header.Set("key", "83478174581347835789132478103574")
					resp, err := client.Do(req)
					if err != nil {
						log.Fatal(err)
					}
					defer resp.Body.Close()
					fmt.Println(resp.Status)
					b, err := ioutil.ReadAll(resp.Body)
					if err != nil {
						log.Fatal(err)
					}
					fmt.Printf("%s", b)

				case *linebot.StickerMessage:
					// スタンプメッセージに対する返信
					replyMessage := linebot.NewTextMessage("スタンプを送らないで...")
					if _, err := bot.ReplyMessage(event.ReplyToken, replyMessage).Do(); err != nil {
						log.Print("ReplyMessage Error:", err)
					}
				}
			}
		}
		c.Status(http.StatusOK)
	})
	server.Run(":3012")
}
