import { Bell, MessageCircle } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { RoleName } from "@/common/constants/app.constant"
import { useUserStore } from "@/store/user.store"

const AdminHeader = () => {
  const { user } = useUserStore()

  return (
    <div className="border-b border-gray-200 flex justify-between items-center px-6 py-4 bg-white">

      <h1 className="uppercase text-2xl font-bold tracking-wide text-gray-800">
        Trang quản trị
      </h1>

      <div className="flex items-center gap-6">

        <button className="relative text-gray-600 hover:text-primary transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="relative text-gray-600 hover:text-primary transition">
          <MessageCircle size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
            <AvatarFallback>
              {user?.fullName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-800">
              {user?.fullName}
              Hào đẹp trai
            </p>

            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                user?.role?.name === RoleName.ADMIN
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {user?.role?.name}
              admin
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminHeader