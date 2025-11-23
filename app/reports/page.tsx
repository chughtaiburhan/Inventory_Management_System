"use client"

import React, { useState } from "react"
import { Calendar, Download, Filter, TrendingUp, TrendingDown, BarChart3, UtensilsCrossed, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const handleExport = () => {
    // Create CSV content
    const csvContent = [
      ["Menu Category", "Total Sales", "Orders", "Avg Order Value", "Trend", "Change"],
      ...reportData.map(item => [
        item.category,
        item.totalSales.toString(),
        item.totalOrders.toString(),
        item.avgOrderValue.toString(),
        item.trend,
        item.change.toString()
      ])
    ].map(row => row.join(",")).join("\n")

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `restaurant-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const revenueTrendData = [
    { date: "Jan", revenue: 125000 },
    { date: "Feb", revenue: 145000 },
    { date: "Mar", revenue: 160000 },
    { date: "Apr", revenue: 155000 },
    { date: "May", revenue: 180000 },
    { date: "Jun", revenue: 200000 },
    { date: "Jul", revenue: 220000 },
  ]

  const categoryPerformanceData = [
    { category: "Main Course", sales: 456780 },
    { category: "Appetizers", sales: 234560 },
    { category: "Beverages", sales: 123450 },
    { category: "Desserts", sales: 98760 },
  ]

  const reportData = [
    {
      category: "Main Course",
      totalSales: 456780,
      totalOrders: 2340,
      avgOrderValue: 195.23,
      trend: "up",
      change: 12.5,
    },
    {
      category: "Appetizers",
      totalSales: 234560,
      totalOrders: 1890,
      avgOrderValue: 124.13,
      trend: "up",
      change: 8.7,
    },
    {
      category: "Beverages",
      totalSales: 123450,
      totalOrders: 3456,
      avgOrderValue: 35.72,
      trend: "down",
      change: -2.3,
    },
    {
      category: "Desserts",
      totalSales: 98760,
      totalOrders: 1234,
      avgOrderValue: 80.03,
      trend: "up",
      change: 5.8,
    },
  ]

  return (
    <div className="flex-1 space-y-6 pr-6 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Restaurant Reports & Analytics</h1>
          <p className="text-gray-600">Track your restaurant performance, sales trends, and menu analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleExport()}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Period Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Report Period:</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">PKR 913,550</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">8,920</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+8.2%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold">PKR 102.45</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+3.8%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Category</p>
                <p className="text-2xl font-bold">Main Course</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600">50% of sales</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Menu Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Report Table */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Category Performance Report</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Menu Category</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Avg Order Value</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((item) => (
                <TableRow key={item.category}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>PKR {item.totalSales.toLocaleString()}</TableCell>
                  <TableCell>{item.totalOrders}</TableCell>
                  <TableCell>PKR {item.avgOrderValue}</TableCell>
                  <TableCell>
                    {item.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={item.change > 0 ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
