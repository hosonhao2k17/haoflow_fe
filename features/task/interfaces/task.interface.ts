export interface Task {
  id: string
  todo: string
  startTime: string
  endTime: string
  orderIndex: number
  status: "todo" | "done" | "skipped"
}
