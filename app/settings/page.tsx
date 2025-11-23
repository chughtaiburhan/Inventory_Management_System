"use client"

import React, { useState } from "react"
import { User, Bell, Shield, Database, Palette, Save, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Paragraph } from "@/components/ui/paragraph"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Heading } from "@/components/ui/heading"

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false)
  const [profile, setProfile] = useState({
    name: "Rio Admin",
    email: "rio@inventory.com",
    phone: "+92 123 4567890",
    role: "Administrator",
    avatar: "/placeholder.svg?height=80&width=80",
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    lowStockAlerts: true,
    orderAlerts: true,
    systemAlerts: true,
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  })

  const [showConfirm, setShowConfirm] = useState<{ open: boolean; action: string | null }>({ open: false, action: null })
  const [showPhotoDialog, setShowPhotoDialog] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [passwords, setPasswords] = useState({ current: "", new: "" })

  // Save all changes
  const handleSaveAll = () => {
    toast.success("All changes saved!")
  }

  // Change photo
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0])
      toast.success("Photo selected: " + e.target.files[0].name)
      setShowPhotoDialog(false)
    }
  }

  // Password change
  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new) {
      toast.error("Please fill in both password fields.")
      return
    }
    setShowConfirm({ open: true, action: "Change Password" })
  }

  // Confirm sensitive actions
  const handleConfirm = () => {
    if (showConfirm.action === "Change Password") {
      toast.success("Password changed successfully!")
      setPasswords({ current: "", new: "" })
    } else if (showConfirm.action === "Enable 2FA") {
      toast.success("Two-Factor Authentication enabled!")
    } else if (showConfirm.action === "Disable 2FA") {
      toast.success("Two-Factor Authentication disabled!")
    }
    setShowConfirm({ open: false, action: null })
  }

  // Maintenance actions
  const handleMaintenance = (action: string) => {
    toast.success(`${action} completed!`)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading variant="h2" className="font-bold">Settings</Heading>
          <Paragraph variant="muted">Manage your account and system preferences</Paragraph>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveAll}>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>

        </TabsList>

        {/* Profile Settings */}
        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" onClick={() => setShowPhotoDialog(true)}>
                    Change Photo
                  </Button>
                  <Paragraph variant="muted" size="sm" className="mt-1">JPG, PNG or GIF. Max size 2MB.</Paragraph>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Numbers</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={profile.role} onValueChange={(value) => setProfile({ ...profile, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Heading variant="h4" className="font-medium">Change Password</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={passwords.current}
                        onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={passwords.new}
                      onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                    />
                  </div>
                </div>
                <Button variant="outline" onClick={handlePasswordChange}>Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        < TabsContent value="notifications" >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Heading variant="h4" className="font-medium">Alert Types</Heading>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Alerts</Label>
                      <Paragraph variant="muted" size="sm">Receive notifications via email</Paragraph>
                    </div>
                    <Switch
                      checked={notifications.emailAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Alerts</Label>
                      <Paragraph variant="muted" size="sm">Receive notifications via SMS</Paragraph>
                    </div>
                    <Switch
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <Paragraph variant="muted" size="sm">Browser push notifications</Paragraph>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Heading variant="h4" className="font-medium">System Alerts</Heading>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Low Stock Alerts</Label>
                      <Paragraph variant="muted" size="sm">Get notified when inventory is low</Paragraph>
                    </div>
                    <Switch
                      checked={notifications.lowStockAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, lowStockAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Order Alerts</Label>
                      <Paragraph variant="muted" size="sm">Notifications for new orders</Paragraph>
                    </div>
                    <Switch
                      checked={notifications.orderAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, orderAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Alerts</Label>
                      <Paragraph variant="muted" size="sm">Important system notifications</Paragraph>
                    </div>
                    <Switch
                      checked={notifications.systemAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent >

        {/* Security Settings */}
        < TabsContent value="security" >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <Paragraph variant="muted" size="sm">Add an extra layer of security to your account</Paragraph>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => {
                      setSecurity({ ...security, twoFactorAuth: checked })
                      setShowConfirm({ open: true, action: checked ? "Enable 2FA" : "Disable 2FA" })
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Select
                    value={security.passwordExpiry}
                    onValueChange={(value) => setSecurity({ ...security, passwordExpiry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent >


      </Tabs>

      {/* Confirm Dialog for sensitive actions */}
      <Dialog open={showConfirm.open} onOpenChange={(open) => setShowConfirm({ open, action: showConfirm.action })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <Paragraph>This action cannot be undone. Proceed with {showConfirm.action}?</Paragraph>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm({ open: false, action: null })}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirm}>Yes, Proceed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Change Photo */}
      <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Profile Photo</DialogTitle>
          </DialogHeader>
          <Input type="file" accept="image/*" onChange={handlePhotoChange} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPhotoDialog(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="space-y-6 mt-10 border-t pt-6">
        <div>
          <Heading variant="h4" className="font-medium">Dynamic Components Demo</Heading>
          <Paragraph variant="muted" size="sm">
            Testing the new dynamic components.
          </Paragraph>
        </div>
        <div className="grid gap-4 border p-4 rounded-lg">
          <div className="space-y-2">
            <Heading variant="h5" className="font-medium">Paragraphs</Heading>
            <Paragraph>Default Paragraph</Paragraph>
            <Paragraph variant="muted">Muted Paragraph</Paragraph>
            <Paragraph variant="lead">Lead Paragraph</Paragraph>
            <Paragraph variant="error">Error Paragraph</Paragraph>
            <Paragraph size="sm">Small Paragraph</Paragraph>
            <Paragraph weight="bold">Bold Paragraph</Paragraph>
          </div>
          <div className="space-y-2">
            <Heading variant="h5" className="font-medium">Labels</Heading>
            <Label>Default Label</Label>
            <Label variant="error">Error Label</Label>
            <Label size="lg">Large Label</Label>
          </div>
          <div className="space-y-2">
            <Heading variant="h5" className="font-medium">Inputs</Heading>
            <div className="grid gap-2">
              <Label>Default Input</Label>
              <Input placeholder="Default" />
            </div>
            <div className="grid gap-2">
              <Label variant="error">Error Input</Label>
              <Input variant="error" placeholder="Error" />
            </div>
            <div className="grid gap-2">
              <Label>Success Input</Label>
              <Input variant="success" placeholder="Success" />
            </div>
            <div className="grid gap-2">
              <Label>Small Input</Label>
              <Input size="sm" placeholder="Small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
