import { TableModel, type TaskModel } from "@/models/TableModel";

export const Table1 = new Map<string, TaskModel>([
  ["a", { duration: 7, earlyDate: 0, lateDate: 0,  previousTasks: [], nextTasks: [] }],
  ["b", { duration: 7, earlyDate: 0, lateDate: 0,  previousTasks: ["a"], nextTasks: [] }],
  ["c", { duration: 15, earlyDate: 0, lateDate: 0,  previousTasks: ["b"], nextTasks: [] }],
  ["d", { duration: 30, earlyDate: 0, lateDate: 0, previousTasks: ["c"], nextTasks: [] }],
  ["e", { duration: 45, earlyDate: 0, lateDate: 0, previousTasks: ["d"], nextTasks: [] }],
  ["f", { duration: 15, earlyDate: 0, lateDate: 0, previousTasks: ["e"], nextTasks: [] }],
  ["g", { duration: 45, earlyDate: 0, lateDate: 0, previousTasks: ["d"], nextTasks: [] }],
  ["h", { duration: 60, earlyDate: 0, lateDate: 0, previousTasks: ["d"], nextTasks: [] }],
  ["i", { duration: 20, earlyDate: 0, lateDate: 0, previousTasks: ["h"], nextTasks: [] }],
  ["j", { duration: 30, earlyDate: 0, lateDate: 0, previousTasks: ["i"], nextTasks: [] }],
  ["k", { duration: 30, earlyDate: 0, lateDate: 0, previousTasks: ["f"], nextTasks: [] }],
  ["l", { duration: 15, earlyDate: 0, lateDate: 0, previousTasks: ["k"], nextTasks: [] }],
  ["m", { duration: 30, earlyDate: 0, lateDate: 0, previousTasks: ["g", "j", "l"], nextTasks: [] }],
  ["n", { duration: 15, earlyDate: 0, lateDate: 0, previousTasks: ["m"], nextTasks: [] }],
  ["o", { duration: 30, earlyDate: 0, lateDate: 0, previousTasks: ["n"], nextTasks: [] }],
  ["p", { duration: 15, earlyDate: 0, lateDate: 0, previousTasks: ["m"], nextTasks: [] }],
  ["q", { duration: 15, earlyDate: 0, lateDate: 0, previousTasks: ["o"], nextTasks: [] }],
  ["r", { duration: 15, earlyDate: 0, lateDate: 0, previousTasks: ["q"], nextTasks: [] }],
  ["s", { duration: 30, earlyDate: 0, lateDate: 0, previousTasks: ["q"], nextTasks: [] }],
  ["t", { duration: 7, earlyDate: 0, lateDate: 0, previousTasks: ["p"], nextTasks: [] }],
  ["u", { duration: 4, earlyDate: 0, lateDate: 0, previousTasks: ["r", "t"], nextTasks: [] }],
  ["v", { duration: 2, earlyDate: 0, lateDate: 0, previousTasks: ["s", "t"], nextTasks: [] }],
  ["w", { duration: 7, earlyDate: 0, lateDate: 0, previousTasks: ["r", "s"], nextTasks: [] }],
]);

export const Table2 = new Map<string, TaskModel>([
    ["A", { duration: 6, earlyDate: 0, lateDate: 0,  previousTasks: ["P"], nextTasks: [] }],
    ["B", { duration: 4, earlyDate: 0, lateDate: 0, previousTasks: ["G"], nextTasks: [] }],
    ["C", { duration: 6, earlyDate: 0, lateDate: 0, previousTasks: ["K"], nextTasks: [] }],
    ["D", { duration: 3, earlyDate: 0, lateDate: 0, previousTasks: ["N"], nextTasks: [] }],
    ["E", { duration: 2, earlyDate: 0, lateDate: 0, previousTasks: ["K"], nextTasks: [] }],
    ["F", { duration: 7, earlyDate: 0, lateDate: 0, previousTasks: ["H", "J"], nextTasks: [] }],
    ["G", { duration: 3, earlyDate: 0, lateDate: 0, previousTasks: [], nextTasks: [] }],
    ["H", { duration: 1, earlyDate: 0, lateDate: 0, previousTasks: ["E", "G"], nextTasks: [] }],
    ["I", { duration: 2, earlyDate: 0, lateDate: 0, previousTasks: ["M", "J"], nextTasks: [] }],
    ["J", { duration: 3, earlyDate: 0, lateDate: 0, previousTasks: ["C", "E", "G"], nextTasks: [] }],
    ["K", { duration: 5, earlyDate: 0, lateDate: 0, previousTasks: [], nextTasks: [] }],
    ["L", { duration: 8, earlyDate: 0, lateDate: 0, previousTasks: ["O", "Q"], nextTasks: [] }],
    ["M", { duration: 7, earlyDate: 0, lateDate: 0, previousTasks: ["B", "C"], nextTasks: [] }],
    ["N", { duration: 3, earlyDate: 0, lateDate: 0, previousTasks: ["I"], nextTasks: [] }],
    ["O", { duration: 4, earlyDate: 0, lateDate: 0, previousTasks: ["A", "F", "I"], nextTasks: [] }],
    ["P", { duration: 4, earlyDate: 0, lateDate: 0, previousTasks: ["H", "N"], nextTasks: [] }],
    ["Q", { duration: 1, earlyDate: 0, lateDate: 0, previousTasks: ["A"], nextTasks: [] }],
])

export const Table3 = new Map<string, TaskModel>([
    ["A", { duration: 8, earlyDate: 0, lateDate: 0,  previousTasks: [], nextTasks: [] }],
    ["B", { duration: 12, earlyDate: 0, lateDate: 0, previousTasks: [], nextTasks: [] }],
    ["C", { duration: 8, earlyDate: 0, lateDate: 0, previousTasks: ["A"], nextTasks: [] }],
    ["D", { duration: 4, earlyDate: 0, lateDate: 0, previousTasks: ["A"], nextTasks: [] }],
    ["E", { duration: 16, earlyDate: 0, lateDate: 0, previousTasks: ["A"], nextTasks: [] }],
    ["F", { duration: 24, earlyDate: 0, lateDate: 0, previousTasks: ["B"], nextTasks: [] }],
    ["G", { duration: 20, earlyDate: 0, lateDate: 0, previousTasks: ["C", "D"], nextTasks: [] }],
    ["H", { duration: 16, earlyDate: 0, lateDate: 0, previousTasks: ["E", "F", "G"], nextTasks: [] }],
    ["I", { duration: 12, earlyDate: 0, lateDate: 0, previousTasks: ["C", "D"], nextTasks: [] }],
    ["J", { duration: 20, earlyDate: 0, lateDate: 0, previousTasks: ["E", "F", "G"], nextTasks: [] }],
    ["K", { duration: 20, earlyDate: 0, lateDate: 0, previousTasks: ["H", "I", "J"], nextTasks: [] }],
    ["L", { duration: 24, earlyDate: 0, lateDate: 0, previousTasks: ["H", "I", "J"], nextTasks: [] }],
])

const DefaultTable1 = new TableModel(
    "Test 1",
    Table1
)

const DefaultTable2 = new TableModel(
    "Test 2",
    Table2
)

const DefaultTable3 = new TableModel(
    "Test 3",
    Table3
)

export {
    DefaultTable1,
    DefaultTable2,
    DefaultTable3
}

