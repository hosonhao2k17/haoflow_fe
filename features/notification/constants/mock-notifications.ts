import { Notification } from "../interfaces/notification.interface";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Hoàn thành mục tiêu tiết kiệm",
    message: "Bạn đã đạt 80% mục tiêu tiết kiệm 50tr trong quý này. Tiếp tục phát huy!",
    type: "success",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    link: "/finance/target",
  },
  {
    id: "2",
    title: "Nhắc nhở kế hoạch ngày",
    message: "Kế hoạch \"Chiến lược quay lại lối sống cũ\" còn 5 task chưa hoàn thành.",
    type: "warning",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    link: "/plan/daily-plan",
  },
  {
    id: "3",
    title: "Giao dịch mới",
    message: "Đã ghi nhận giao dịch \"Ăn trưa\" -65.000 ₫ từ ví Momo.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    link: "/finance/transaction",
  },
  {
    id: "4",
    title: "Ngân sách sắp vượt",
    message: "Danh mục \"Ăn uống\" đã dùng 85% ngân sách tháng. Cân nhắc chi tiêu.",
    type: "warning",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    link: "/finance/budget",
  },
  {
    id: "5",
    title: "Chào mừng trở lại",
    message: "Chúc bạn một ngày làm việc hiệu quả. Đừng quên xem kế hoạch hôm nay.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];
