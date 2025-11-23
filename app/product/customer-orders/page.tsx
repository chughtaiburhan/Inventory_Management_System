"use client"

import React, { useState } from "react"
import {
    Search,
    Plus,
    Filter,
    Download,
    Eye,
    Edit,
    Trash2,
    ShoppingCart,
    Clock,
    CheckCircle,
    DollarSign,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Order {
    id: string
    orderName: string
    menuItems: string[]
    quantity: number
    waiterName: string
    price: number
    orderTime: Date
    status: "Pending" | "Preparing" | "Completed" | "Cancelled"
    notes?: string
}

// Sample menu items for the restaurant
const MENU_ITEMS = [
    { name: "Margherita Pizza", price: 12.99 },
    { name: "Pepperoni Pizza", price: 14.99 },
    { name: "Chicken Burger", price: 10.99 },
    { name: "Beef Burger", price: 11.99 },
    { name: "Caesar Salad", price: 8.99 },
    { name: "Greek Salad", price: 9.99 },
    { name: "Pasta Carbonara", price: 13.99 },
    { name: "Pasta Bolognese", price: 12.99 },
    { name: "Grilled Chicken", price: 15.99 },
    { name: "Fish & Chips", price: 14.99 },
    { name: "Steak", price: 24.99 },
    { name: "Soup of the Day", price: 6.99 },
    { name: "French Fries", price: 4.99 },
    { name: "Onion Rings", price: 5.99 },
    { name: "Soft Drink", price: 2.99 },
    { name: "Coffee", price: 3.99 },
    { name: "Tea", price: 2.99 },
    { name: "Fresh Juice", price: 4.99 },
]

// Sample waiters
const WAITERS = ["Self", "John Smith", "Sarah Johnson", "Mike Wilson", "Emma Davis", "David Brown"]

export default function CustomerOrdersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    // Form states
    const [formData, setFormData] = useState({
        menuItem: "",
        quantity: 1,
        waiterName: "Self",
        notes: "",
    })

    // Sample orders data
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "ORD001",
            orderName: "Margherita Pizza",
            menuItems: ["Margherita Pizza"],
            quantity: 2,
            waiterName: "John Smith",
            price: 25.98,
            orderTime: new Date("2025-11-23T14:30:00"),
            status: "Completed",
            notes: "Extra cheese",
        },
        {
            id: "ORD002",
            orderName: "Chicken Burger",
            menuItems: ["Chicken Burger", "French Fries"],
            quantity: 1,
            waiterName: "Sarah Johnson",
            price: 15.98,
            orderTime: new Date("2025-11-23T15:15:00"),
            status: "Preparing",
            notes: "No onions",
        },
        {
            id: "ORD003",
            orderName: "Pasta Carbonara",
            menuItems: ["Pasta Carbonara"],
            quantity: 1,
            waiterName: "Self",
            price: 13.99,
            orderTime: new Date("2025-11-23T15:45:00"),
            status: "Pending",
        },
        {
            id: "ORD004",
            orderName: "Steak",
            menuItems: ["Steak", "Caesar Salad"],
            quantity: 1,
            waiterName: "Mike Wilson",
            price: 33.98,
            orderTime: new Date("2025-11-23T16:00:00"),
            status: "Preparing",
            notes: "Medium rare",
        },
    ])

    const generateOrderId = () => {
        const maxId = orders.reduce((max, order) => {
            const num = parseInt(order.id.replace("ORD", ""))
            return num > max ? num : max
        }, 0)
        return `ORD${String(maxId + 1).padStart(3, "0")}`
    }

    const calculatePrice = (menuItemName: string, quantity: number) => {
        const item = MENU_ITEMS.find((m) => m.name === menuItemName)
        return item ? item.price * quantity : 0
    }

    // Handle create order
    const handleCreateOrder = () => {
        if (!formData.menuItem) {
            toast.error("Please select a menu item")
            return
        }

        const newOrder: Order = {
            id: generateOrderId(),
            orderName: formData.menuItem,
            menuItems: [formData.menuItem],
            quantity: formData.quantity,
            waiterName: formData.waiterName,
            price: calculatePrice(formData.menuItem, formData.quantity),
            orderTime: new Date(),
            status: "Pending",
            notes: formData.notes,
        }

        setOrders([...orders, newOrder])
        setIsCreateModalOpen(false)
        resetForm()
        toast.success("Order placed successfully!")
    }

    // Handle edit order
    const handleEditOrder = () => {
        if (!selectedOrder || !formData.menuItem) {
            toast.error("Please select a menu item")
            return
        }

        const updatedOrders = orders.map((order) =>
            order.id === selectedOrder.id
                ? {
                    ...order,
                    orderName: formData.menuItem,
                    menuItems: [formData.menuItem],
                    quantity: formData.quantity,
                    waiterName: formData.waiterName,
                    price: calculatePrice(formData.menuItem, formData.quantity),
                    notes: formData.notes,
                }
                : order,
        )

        setOrders(updatedOrders)
        setIsEditModalOpen(false)
        setSelectedOrder(null)
        resetForm()
        toast.success("Order updated successfully!")
    }

    // Handle delete order
    const handleDeleteOrder = () => {
        if (deleteOrderId) {
            setOrders(orders.filter((order) => order.id !== deleteOrderId))
            setDeleteOrderId(null)
            toast.success("Order deleted successfully!")
        }
    }

    // Reset form
    const resetForm = () => {
        setFormData({
            menuItem: "",
            quantity: 1,
            waiterName: "Self",
            notes: "",
        })
    }

    // Open edit modal
    const openEditModal = (order: Order) => {
        setSelectedOrder(order)
        setFormData({
            menuItem: order.menuItems[0] || "",
            quantity: order.quantity,
            waiterName: order.waiterName,
            notes: order.notes || "",
        })
        setIsEditModalOpen(true)
    }

    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Completed":
                return <Badge className="bg-green-100 text-green-800">Completed</Badge>
            case "Preparing":
                return <Badge className="bg-blue-100 text-blue-800">Preparing</Badge>
            case "Pending":
                return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            case "Cancelled":
                return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    // Filter orders
    const filteredOrders = orders.filter(
        (order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.waiterName.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Calculate statistics
    const totalOrders = orders.length
    const pendingOrders = orders.filter((o) => o.status === "Pending").length
    const completedOrders = orders.filter((o) => o.status === "Completed").length
    const totalRevenue = orders
        .filter((o) => o.status === "Completed")
        .reduce((sum, order) => sum + order.price, 0)

    // Format time
    const formatTime = (date: Date) => {
        return new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="flex-1 space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Customer Orders Management</h1>
                    <p className="text-gray-600">Manage restaurant orders and track order status</p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                        resetForm()
                        setIsCreateModalOpen(true)
                    }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Order
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold">{totalOrders}</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <ShoppingCart className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                                <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
                            </div>
                            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                                <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                            </div>
                            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search orders by ID, name, or waiter..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </div>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Orders List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Order Name</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Waiter</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Order Time</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                                            No orders found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.orderName}</TableCell>
                                            <TableCell>{order.quantity}</TableCell>
                                            <TableCell>{order.waiterName}</TableCell>
                                            <TableCell>${order.price.toFixed(2)}</TableCell>
                                            <TableCell>{formatTime(order.orderTime)}</TableCell>
                                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            Actions
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem onClick={() => openEditModal(order)}>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => setDeleteOrderId(order.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Create Order Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Create New Order</DialogTitle>
                        <DialogDescription>Fill in the order details and click place order.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="order-id">Order ID</Label>
                            <Input id="order-id" value={generateOrderId()} disabled className="bg-gray-50" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="menu-item">Menu Item *</Label>
                            <Select value={formData.menuItem} onValueChange={(value) => setFormData({ ...formData, menuItem: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a menu item" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MENU_ITEMS.map((item) => (
                                        <SelectItem key={item.name} value={item.name}>
                                            {item.name} - ${item.price.toFixed(2)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="waiter">Waiter Name *</Label>
                            <Select value={formData.waiterName} onValueChange={(value) => setFormData({ ...formData, waiterName: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {WAITERS.map((waiter) => (
                                        <SelectItem key={waiter} value={waiter}>
                                            {waiter}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Order Price</Label>
                            <Input
                                id="price"
                                value={`$${calculatePrice(formData.menuItem, formData.quantity).toFixed(2)}`}
                                disabled
                                className="bg-gray-50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                placeholder="Add any special instructions..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateOrder} className="bg-blue-600 hover:bg-blue-700">
                            Place Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Order Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Order</DialogTitle>
                        <DialogDescription>Update the order details and click save changes.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-order-id">Order ID</Label>
                            <Input id="edit-order-id" value={selectedOrder?.id || ""} disabled className="bg-gray-50" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-menu-item">Menu Item *</Label>
                            <Select value={formData.menuItem} onValueChange={(value) => setFormData({ ...formData, menuItem: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a menu item" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MENU_ITEMS.map((item) => (
                                        <SelectItem key={item.name} value={item.name}>
                                            {item.name} - ${item.price.toFixed(2)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-quantity">Quantity *</Label>
                            <Input
                                id="edit-quantity"
                                type="number"
                                min="1"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-waiter">Waiter Name *</Label>
                            <Select value={formData.waiterName} onValueChange={(value) => setFormData({ ...formData, waiterName: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {WAITERS.map((waiter) => (
                                        <SelectItem key={waiter} value={waiter}>
                                            {waiter}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-price">Order Price</Label>
                            <Input
                                id="edit-price"
                                value={`$${calculatePrice(formData.menuItem, formData.quantity).toFixed(2)}`}
                                disabled
                                className="bg-gray-50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-notes">Notes (Optional)</Label>
                            <Textarea
                                id="edit-notes"
                                placeholder="Add any special instructions..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditOrder} className="bg-blue-600 hover:bg-blue-700">
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteOrderId !== null} onOpenChange={() => setDeleteOrderId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the order.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteOrder} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}