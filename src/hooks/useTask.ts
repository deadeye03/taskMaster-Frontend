"use client"

import { useState, useCallback } from "react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"


interface UseTaskReturn {
    tasks: Task[]
    isLoading: boolean
    error: string | null
    currentTab: string
    addTask: (title: string) => Promise<void>
    toggleTask: (task: Task) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    switchTab: (tab: string) => Promise<void>
    clearError: () => void
}

export const useTask = (initialTasks: Task[] = [], backendUrl?: string): UseTaskReturn => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentTab, setCurrentTab] = useState("current")
    const { toast } = useToast()

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    const addTask = useCallback(
        async (title: string) => {
            if (!backendUrl) {
                const errorMsg = "BACKEND_URL is not defined"
                console.error(errorMsg)
                setError(errorMsg)
                return
            }

            if (!title || title.trim() === "") {
                const errorMsg = "Task cannot be empty"
                console.error(errorMsg)
                setError(errorMsg)
                toast({
                    title: "Error",
                    description: "Task cannot be empty.",
                    variant: "destructive",
                })
                return
            }

            setIsLoading(true)
            setError(null)

            const trimmedTitle = title.trim()

            try {
                // Optimistically update the UI
                const newTask: Task = {
                    id: crypto.randomUUID(),
                    title: trimmedTitle,
                    isCompleted: false,
                    priority: "low",
                    createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                    updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                }

                setTasks((prevTasks) => [...prevTasks, newTask])

                // Send the new task to the backend
                const response = await fetch(`${backendUrl}/api/v1/tasks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: trimmedTitle,
                        isCompleted: false,
                        priority: "low",
                    }),
                })

                const result = await response.json()

                if (!response.ok) {
                    throw new Error(result.data?.errorData || "Failed to add task")
                }

                toast({
                    title: "Success",
                    description: "Task added successfully! ✅",
                })
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : "Failed to add task"
                console.error("Failed to add task:", error)
                setError(errorMsg)

                // Revert optimistic update on error
                setTasks((prevTasks) => prevTasks.filter((task) => task.title !== trimmedTitle))

                toast({
                    title: "Error",
                    description: "Failed to add task. Please try again. ❌",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        },
        [backendUrl, toast],
    )

    const toggleTask = useCallback(
        async (task: Task) => {
            if (!backendUrl) {
                const errorMsg = "BACKEND_URL is not defined"
                console.error(errorMsg)
                setError(errorMsg)
                return
            }

            setIsLoading(true)
            setError(null)

            // Optimistically update the UI
            setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, isCompleted: !task.isCompleted } : t)))

            try {
                const response = await fetch(`${backendUrl}/api/v1/tasks/${task.id}/complete`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ isCompleted: !task.isCompleted }),
                })

                const result = await response.json()

                if (!response.ok) {
                    throw new Error(result.data?.errorData || "Failed to update task")
                }

                toast({
                    title: "Success",
                    description: `Task marked as ${!task.isCompleted ? "completed" : "incomplete"}! ✅`,
                })
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : "Failed to update task"
                console.error("Failed to update task:", error)
                setError(errorMsg)

                // Revert optimistic update on error
                setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, isCompleted: task.isCompleted } : t)))

                toast({
                    title: "Error",
                    description: "Failed to update task. Please try again. ❌",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        },
        [backendUrl, toast],
    )

    const deleteTask = useCallback(
        async (id: string) => {
            if (!backendUrl) {
                const errorMsg = "BACKEND_URL is not defined"
                console.error(errorMsg)
                setError(errorMsg)
                return
            }

            setIsLoading(true)
            setError(null)

            // Store the task for potential rollback
            const taskToDelete = tasks.find((task) => task.id === id)

            // Optimistically update the UI
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))

            try {
                const response = await fetch(`${backendUrl}/api/v1/tasks/${id}`, {
                    method: "DELETE",
                })

                if (!response.ok) {
                    throw new Error("Failed to delete task")
                }

                toast({
                    title: "Success",
                    description: "Task deleted successfully! ✅",
                })
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : "Failed to delete task"
                console.error("Failed to delete task:", error)
                setError(errorMsg)

                // Revert optimistic update on error
                if (taskToDelete) {
                    setTasks((prevTasks) => [...prevTasks, taskToDelete])
                }

                toast({
                    title: "Error",
                    description: "Failed to delete task. Please try again. ❌",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        },
        [backendUrl, tasks, toast],
    )

    const switchTab = useCallback(
        async (tab: string) => {
            if (!backendUrl) {
                console.error("BACKEND_URL is not defined")
                return
            }

            setCurrentTab(tab)
            setIsLoading(true)
            setError(null)

            try {
                if (tab === "current") {
                    setTasks(initialTasks)
                } else {
                    const response = await fetch(`${backendUrl}/api/v1/tasks`)

                    if (!response.ok) {
                        throw new Error("Failed to fetch all tasks")
                    }

                    const result = await response.json()
                    setTasks(result.data.tasks)
                }
            } catch (error) {
                const errorMsg = error instanceof Error ? error.message : "Failed to fetch tasks"
                console.error("Failed to fetch tasks:", error)
                setError(errorMsg)

                toast({
                    title: "Error",
                    description: "Failed to fetch tasks. Please try again. ❌",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        },
        [backendUrl, initialTasks, toast],
    )

    return {
        tasks,
        isLoading,
        error,
        currentTab,
        addTask,
        toggleTask,
        deleteTask,
        switchTab,
        clearError,
    }
}
