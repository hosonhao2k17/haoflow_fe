
import { Lock, Mail } from "lucide-react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Field, FieldLabel } from "../ui/field"
import { Button } from "../ui/button"



const LoginForm = () => {


    return (
       <Card className="w-full max-w-sm shadow-xl shadow-blue-500">
            <h1 className="text-3xl uppercase font-bold text-center text-primary">Đăng nhập</h1>
            <CardContent>
                <form action="">
                    <Field className="max-w-sm">
                        <FieldLabel className="text-primary"> Email</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="Nhập email của bạn...."/>
                            <InputGroupAddon align="inline-end">
                                <Mail />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field className="max-w-sm">
                        <FieldLabel className="text-primary"> Mật khẩu</FieldLabel>
                        <InputGroup>
                            <InputGroupInput placeholder="Nhập mật khẩu của bạn...."/>
                            <InputGroupAddon align="inline-end">
                                <Lock />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center p-5">
                <Button className="w-full text-md hover:">
                    Đăng nhập
                    <Lock />
                </Button>
            </CardFooter>
       </Card>
    )
}

export default LoginForm