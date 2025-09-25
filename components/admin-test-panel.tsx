"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Play } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

interface TestResult {
  name: string
  status: "pending" | "success" | "error" | "warning"
  message: string
  details?: any
}

export default function AdminTestPanel() {
  const [tests, setTests] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    const testResults: TestResult[] = []

    // Test 1: Database Connection
    try {
      const { data, error } = await supabase.from("admin_users").select("count").single()
      testResults.push({
        name: "Database Connection",
        status: error ? "error" : "success",
        message: error ? `Connection failed: ${error.message}` : "Successfully connected to Supabase",
        details: data,
      })
    } catch (error) {
      testResults.push({
        name: "Database Connection",
        status: "error",
        message: `Connection error: ${error}`,
      })
    }

    // Test 2: Admin User Authentication
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", "info.mannadomeestate@gmail.com")
        .single()

      testResults.push({
        name: "Admin User Authentication",
        status: error ? "error" : data?.is_active ? "success" : "warning",
        message: error
          ? `Admin user check failed: ${error.message}`
          : data?.is_active
            ? "Admin user exists and is active"
            : "Admin user exists but is inactive",
        details: data,
      })
    } catch (error) {
      testResults.push({
        name: "Admin User Authentication",
        status: "error",
        message: `Admin user test error: ${error}`,
      })
    }

    // Test 3: Properties CRUD
    try {
      // Test SELECT
      const { data: selectData, error: selectError } = await supabase.from("properties").select("*").limit(1)

      if (selectError) throw selectError

      // Test INSERT
      const { data: insertData, error: insertError } = await supabase
        .from("properties")
        .insert({
          title: "Test Property - CRUD Test",
          description: "Test property for CRUD operations",
          price: 100000,
          location: "Test Location",
          property_type: "House",
          bedrooms: 2,
          bathrooms: 1,
          square_feet: 1000,
          status: "available",
          featured: false,
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Test UPDATE
      const { error: updateError } = await supabase
        .from("properties")
        .update({ title: "Updated Test Property" })
        .eq("id", insertData.id)

      if (updateError) throw updateError

      // Test DELETE
      const { error: deleteError } = await supabase.from("properties").delete().eq("id", insertData.id)

      if (deleteError) throw deleteError

      testResults.push({
        name: "Properties CRUD Operations",
        status: "success",
        message: "All CRUD operations (Create, Read, Update, Delete) successful",
        details: { selectCount: selectData?.length, testId: insertData.id },
      })
    } catch (error: any) {
      testResults.push({
        name: "Properties CRUD Operations",
        status: "error",
        message: `CRUD test failed: ${error.message}`,
      })
    }

    // Test 4: Testimonials CRUD
    try {
      // Test SELECT
      const { data: selectData, error: selectError } = await supabase.from("testimonials").select("*").limit(1)

      if (selectError) throw selectError

      // Test INSERT
      const { data: insertData, error: insertError } = await supabase
        .from("testimonials")
        .insert({
          client_name: "Test Client - CRUD Test",
          client_title: "Test Title",
          content: "Test testimonial for CRUD operations",
          rating: 5,
          featured: false,
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Test UPDATE
      const { error: updateError } = await supabase
        .from("testimonials")
        .update({ client_name: "Updated Test Client" })
        .eq("id", insertData.id)

      if (updateError) throw updateError

      // Test DELETE
      const { error: deleteError } = await supabase.from("testimonials").delete().eq("id", insertData.id)

      if (deleteError) throw deleteError

      testResults.push({
        name: "Testimonials CRUD Operations",
        status: "success",
        message: "All CRUD operations (Create, Read, Update, Delete) successful",
        details: { selectCount: selectData?.length, testId: insertData.id },
      })
    } catch (error: any) {
      testResults.push({
        name: "Testimonials CRUD Operations",
        status: "error",
        message: `CRUD test failed: ${error.message}`,
      })
    }

    // Test 5: Inquiries CRUD
    try {
      // Test SELECT
      const { data: selectData, error: selectError } = await supabase.from("inquiries").select("*").limit(1)

      if (selectError) throw selectError

      // Test INSERT
      const { data: insertData, error: insertError } = await supabase
        .from("inquiries")
        .insert({
          full_name: "Test Inquirer - CRUD Test",
          email: "test@example.com",
          phone: "+233 24 000 0000",
          message: "Test inquiry for CRUD operations",
          inquiry_type: "information",
          status: "new",
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Test UPDATE
      const { error: updateError } = await supabase
        .from("inquiries")
        .update({ status: "contacted" })
        .eq("id", insertData.id)

      if (updateError) throw updateError

      // Test DELETE
      const { error: deleteError } = await supabase.from("inquiries").delete().eq("id", insertData.id)

      if (deleteError) throw deleteError

      testResults.push({
        name: "Inquiries CRUD Operations",
        status: "success",
        message: "All CRUD operations (Create, Read, Update, Delete) successful",
        details: { selectCount: selectData?.length, testId: insertData.id },
      })
    } catch (error: any) {
      testResults.push({
        name: "Inquiries CRUD Operations",
        status: "error",
        message: `CRUD test failed: ${error.message}`,
      })
    }

    setTests(testResults)
    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Admin System Test Panel
        </CardTitle>
        <CardDescription>
          Run comprehensive tests to verify all admin CRUD operations are working correctly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={runTests} disabled={isRunning} className="w-full">
            {isRunning ? "Running Tests..." : "Run All Tests"}
          </Button>

          {tests.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Test Results</h3>
              {tests.map((test, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <h4 className="font-medium">{test.name}</h4>
                      <p className="text-sm text-gray-600">{test.message}</p>
                      {test.details && (
                        <pre className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                          {JSON.stringify(test.details, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(test.status)}
                </div>
              ))}
            </div>
          )}

          {tests.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Test Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {tests.filter((t) => t.status === "success").length}
                  </div>
                  <div className="text-sm text-gray-600">Passed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {tests.filter((t) => t.status === "error").length}
                  </div>
                  <div className="text-sm text-gray-600">Failed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {tests.filter((t) => t.status === "warning").length}
                  </div>
                  <div className="text-sm text-gray-600">Warnings</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
