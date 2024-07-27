package main

type MessageEvents struct {
	Events []MessageEvent `json:"events"`
}

type MessageEvent struct {
	ReplyToken string  `json:"replyToken"`
	Message    Message `json:"message"`
}

type Message struct {
	Type string `json:"type"`
	Text string `json:"text"`
}