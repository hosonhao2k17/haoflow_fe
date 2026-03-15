import {
  Notification,
  NotificationType,
} from "../interfaces/notification.interface";

const now = Date.now();
const toDate = (ms: number) => new Date(ms);

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Hoàn thành mục tiêu tiết kiệm",
    body: "Bạn đã đạt 80% mục tiêu tiết kiệm 50tr trong quý này. Tiếp tục phát huy!",
    type: NotificationType.BUDGET_THRESHOLD,
    isRead: false,
    readAt: "",
    createdAt: toDate(now - 1000 * 60 * 30),
    updatedAt: toDate(now - 1000 * 60 * 30),
  },
  {
    id: "2",
    title: "Nhắc nhở kế hoạch ngày",
    body: "Kế hoạch \"Chiến lược quay lại lối sống cũ\" còn 5 task chưa hoàn thành.",
    type: NotificationType.REMIND_TASK,
    isRead: false,
    readAt: "",
    createdAt: toDate(now - 1000 * 60 * 60 * 2),
    updatedAt: toDate(now - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    title: "Giao dịch mới",
    body: "Đã ghi nhận giao dịch \"Ăn trưa\" -65.000 ₫ từ ví Momo.",
    type: NotificationType.SYSTEM,
    isRead: true,
    readAt: new Date().toISOString(),
    createdAt: toDate(now - 1000 * 60 * 60 * 5),
    updatedAt: toDate(now - 1000 * 60 * 60 * 5),
  },
  {
    id: "4",
    title: "Ngân sách sắp vượt",
    body: "Danh mục \"Ăn uống\" đã dùng 85% ngân sách tháng. Cân nhắc chi tiêu.",
    type: NotificationType.BUDGET_THRESHOLD,
    isRead: true,
    readAt: new Date().toISOString(),
    createdAt: toDate(now - 1000 * 60 * 60 * 24),
    updatedAt: toDate(now - 1000 * 60 * 60 * 24),
  },
  {
    id: "5",
    title: "Chào mừng trở lại",
    body: "Chúc bạn một ngày làm việc hiệu quả. Đừng quên xem kế hoạch hôm nay.",
    type: NotificationType.SYSTEM,
    isRead: true,
    readAt: new Date().toISOString(),
    createdAt: toDate(now - 1000 * 60 * 60 * 48),
    updatedAt: toDate(now - 1000 * 60 * 60 * 48),
  },
];
