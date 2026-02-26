import { Button } from "@/components/ui/button"
import { BotMessageSquare } from "lucide-react"


interface Props {
    setOpen: (open: true) => void;
}

const AiFloatChat = ({
    setOpen
}: Props) => {



    return (
        <Button 
            className="fixed rounded-full bottom-8 right-8"
            size="lg"
            onClick={() => setOpen(true)}
        >
            <BotMessageSquare />
        </Button>
    )

}

export default AiFloatChat 