package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
	database, err:= db.Connect(os.Getenv("MONGODB_URI"))
}
