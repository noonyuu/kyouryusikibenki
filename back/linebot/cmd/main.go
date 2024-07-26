package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

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
				// switch message := event.Message.(type) {
				// case *linebot.TextMessage:
					// CallAIを呼び出し、その結果をaiResponseに代入
					// aiResponse, err := CallAI(message.Text)
					// if err != nil {
					// 	log.Print(err)
					// 	aiResponse = linebot.TextMessage{Text: message.Text}
					// }
					fmt.Println("78")
					// aiResponseのTextフィールドの内容を新しいテキストメッセージとして送信
					// if _, err = bot.ReplyMessage(event.ReplyToken, linebot.NewTextMessage(aiResponse.Text)).Do(); err != nil {
					// 	log.Print(err)
					// }
				// case *linebot.StickerMessage:
					log.Print("Received StickerMessage")
					// スタンプメッセージに対する返信
					replyMessage := linebot.NewTextMessage("スタンプを送らないで...")
					if _, err := bot.ReplyMessage(event.ReplyToken, replyMessage).Do(); err != nil {
						log.Print("ReplyMessage Error:", err)
					}
				}
			}
		// }
		c.Status(http.StatusOK)
	})

	server.Run(":3012")
}
