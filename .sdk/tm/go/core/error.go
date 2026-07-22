package core

type MyipError struct {
	IsMyipError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMyipError(code string, msg string, ctx *Context) *MyipError {
	return &MyipError{
		IsMyipError: true,
		Sdk:              "Myip",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MyipError) Error() string {
	return e.Msg
}
