"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Check, X, Calendar, Flag, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { format } from "date-fns"
import { useTask } from "@/hooks/useTask"


interface DemoProps {
  allTasks: Task[]
}

export const Demo = ({ allTasks }: DemoProps) => {
  const [newTaskInput, setNewTaskInput] = useState("")

  // Use NEXT_PUBLIC_BACKEND_URL for client-side access
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://taskmaster-backend-4j92.onrender.com"

  const { tasks, isLoading, error, currentTab, addTask, toggleTask, deleteTask, switchTab, clearError } = useTask(
    allTasks,
    backendUrl,
  )

  const handleAddTask = async () => {
    if (newTaskInput.trim()) {
      await addTask(newTaskInput)
      setNewTaskInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleAddTask()
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-600 border-yellow-200"
      default:
        return "bg-green-100 text-green-600 border-green-200"
    }
  }

  const completedTasks = tasks.filter((t: Task) => t.isCompleted).length
  const remainingTasks = tasks.filter((t: Task) => !t.isCompleted).length

  return (
    <section id="to-do-list" className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See It in
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Try our interactive demo and experience how easy it is to manage your tasks.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Today's Tasks</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(), "dd MMMM yyyy")}</span>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription className="flex items-center justify-between">
                  {error}
                  <Button variant="ghost" size="sm" onClick={clearError}>
                    Dismiss
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Add Task Input */}
            <div className="flex gap-3 mb-8">
              <Input
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 h-12 text-lg"
                onKeyPress={handleKeyPress}
                disabled={isLoading || currentTab === "previous"} // Disable input in previous tab
              />
              <Button
                onClick={handleAddTask}
                disabled={isLoading || !newTaskInput.trim()}
                className="h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between mb-6">
              <Badge
                className={`cursor-pointer transition-colors ${currentTab === "current"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                  }`}
                onClick={() => switchTab("current")}
              >
                <span className="text-sm font-medium">Current Day Tasks</span>
              </Badge>
              <Badge
                className={`cursor-pointer transition-colors ${currentTab === "previous" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                onClick={() => switchTab("previous")}
              >
                <span className="text-sm font-medium">All Previous Tasks</span>
              </Badge>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center justify-center py-4 mb-4">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span className="text-sm text-gray-600">Loading...</span>
              </div>
            )}

            {/* Task List */}
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No tasks yet!</p>
                  <p className="text-sm">Add a task above to get started.</p>
                </div>
              ) : (
                tasks.map((task: Task) => (
                  <div
                    key={task.id}
                    className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${task.isCompleted
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-200 hover:border-purple-200"
                      }`}
                  >
                    <button
                      onClick={() => toggleTask(task)}
                      disabled={isLoading}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${task.isCompleted ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-purple-400"
                        } disabled:opacity-50`}
                    >
                      {task.isCompleted && <Check className="w-4 h-4 text-white" />}
                    </button>

                    <span
                      className={`flex-1 text-lg ${task.isCompleted ? "line-through text-gray-500" : "text-gray-900"}`}
                    >
                      {task.title}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}
                    >
                      <Flag className="w-3 h-3 inline mr-1" />
                      {task.priority}
                    </span>

                    {currentTab === "current" ? (
                      <button
                        onClick={() => deleteTask(task.id)}
                        disabled={isLoading}
                        className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    ) : (
                      <p className="text-sm text-gray-500">{format(new Date(task.createdAt), "dd MMMM yyyy")}</p>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Completed: {completedTasks}</span>
                <span>Remaining: {remainingTasks}</span>
                <span>Total: {tasks.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
