interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    priority: "low" | "medium" | "high";
    createdAt: string;
    updatedAt: string;
    discription?: string;
}
interface TaskData {
    title: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    createdAt: string;
}