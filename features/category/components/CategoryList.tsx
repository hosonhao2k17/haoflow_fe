"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CircleEllipsis, EllipsisVertical, Menu, Pencil, Trash, X } from "lucide-react"
import { useState } from "react"
import { TaskCategory } from "../interfaces/task-catgegory.interface"


interface Props {
    items: TaskCategory[]
}

const CategoryList = ({items}: Props) => {


    return (
        <div className="grid grid-cols-4 gap-3 w-full">
            
                {/* item */}
                {
                    items.map((item) => (
                    <Card className="relative  mx-auto w-full max-w-sm pt-0">
                        <img
                            src={item.thumbnail ?? "https://cdn-icons-png.freepik.com/512/8028/8028200.png"}
                            alt="Event cover"
                            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                        />
                        <CardHeader>
                            <CardAction>
                                <DropdownMenu
                                >   
                                    <DropdownMenuTrigger>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="rounded-full"
                                        >
                                            <Menu />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-15" align="start">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                Sửa
                                                <DropdownMenuShortcut>
                                                    <Pencil />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Xóa
                                                <DropdownMenuShortcut>
                                                    <Trash />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardAction>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>
                                {item.description}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className="w-full">Xem chi tiết</Button>
                        </CardFooter>
                    </Card>
                    ))
                }
                
        </div>
    )
}

export default CategoryList