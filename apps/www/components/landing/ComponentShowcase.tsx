import Section from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Calendar } from "lucide-react";

export default function ComponentShowcase() {
    return (
        <Section className="py-16 md:py-24 bg-gray-2 border-y border-gray-6">
            <div className="space-y-12">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="h2 font-bold text-gray-12">Built to Last: Accessible, Composable, and Robust.</h2>
                    <p className="p text-gray-11 text-lg">
                        Every component shares a common, predictable interface. This makes integrating new components feel intuitive, so you spend less time reading docs and more time shipping features.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Data Table Showcase */}
                    <Card className="lg:col-span-2 bg-gray-1 border-gray-6">
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>A complex data table with status badges.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Payment to Stripe</TableCell>
                                        <TableCell><Badge status="success">Completed</Badge></TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Refund Request</TableCell>
                                        <TableCell><Badge status="warning">Pending</Badge></TableCell>
                                        <TableCell className="text-right">-$45.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Failed Charge</TableCell>
                                        <TableCell><Badge status="danger">Failed</Badge></TableCell>
                                        <TableCell className="text-right">$120.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Calendar/Date Picker Showcase (Visual Mock) */}
                    <Card className="bg-gray-1 border-gray-6">
                        <CardHeader>
                            <CardTitle>Schedule</CardTitle>
                            <CardDescription>Complex state management.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 border border-gray-6 rounded-md bg-gray-2 flex flex-col items-center justify-center gap-4 min-h-[200px]">
                                <Calendar className="size-12 text-gray-8" />
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-12">Select a Date</p>
                                    <p className="text-xs text-gray-11">Interactive calendar component</p>
                                </div>
                                <Button variant="outline" className="w-full">Pick Date</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Section>
    );
}
