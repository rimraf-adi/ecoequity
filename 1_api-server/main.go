package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"http1/controllers"

)

func main(){
	fmt.Println("hello world")
	e := echo.New()
	e.GET("/", controllers.HelloWorld)

	e.Start(":8000")
}

