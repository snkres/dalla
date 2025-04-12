'use client'

import {
  CreditCard,
  Plus,
  Download,
  ChevronRight,
  Gift,
  Clock,
} from 'lucide-react'
import { Button } from '@dalla/design-system'
import { Badge } from '@dalla/design-system'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@dalla/design-system'

export function BillingSettings() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Payment Methods
          </h3>
          <p className="text-sm text-gray-500">Manage your payment methods</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-l-4 border-[#63B7B7] bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#BEDDF1]/30 p-2 text-[#63B7B7]">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Visa ending in 4242</h4>
                <div className="mt-0.5 flex items-center gap-2">
                  <p className="text-xs text-gray-500">Expires 12/2025</p>
                  <Badge className="rounded-full !bg-[#BEDDF1]/20 py-0.5 text-xs text-[#63B7B7] hover:!bg-[#BEDDF1]/30">
                    Default
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
            >
              <span className="mr-1 text-xs">Edit</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-100 p-2 text-gray-500">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium">
                  Mastercard ending in 5678
                </h4>
                <p className="mt-0.5 text-xs text-gray-500">Expires 08/2024</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
            >
              <span className="mr-1 text-xs">Edit</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-dashed py-5 transition-colors hover:border-[#63B7B7]/30 hover:bg-[#BEDDF1]/5"
          >
            <Plus className="h-4 w-4 text-[#63B7B7]" />
            <span className="text-sm">Add Payment Method</span>
          </Button>
        </div>
      </div>

      <div className="my-8 h-[1px] bg-gray-200" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Billing History
            </h3>
            <p className="text-sm text-gray-500">
              View and download your invoices
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 text-xs hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
          >
            <Download className="mr-1 h-3.5 w-3.5" />
            Export All
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-xs font-medium">Invoice</TableHead>
                <TableHead className="text-xs font-medium">Date</TableHead>
                <TableHead className="text-xs font-medium">Amount</TableHead>
                <TableHead className="text-xs font-medium">Status</TableHead>
                <TableHead className="text-right text-xs font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-[#BEDDF1]/5">
                <TableCell className="text-sm font-medium">#INV-001</TableCell>
                <TableCell className="text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Mar 01, 2025</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">﷼29.00</TableCell>
                <TableCell>
                  <Badge className="rounded-full !bg-green-100 text-green-800 hover:!bg-green-200">
                    Paid
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0 hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-[#BEDDF1]/5">
                <TableCell className="text-sm font-medium">#INV-002</TableCell>
                <TableCell className="text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Feb 01, 2025</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">﷼29.00</TableCell>
                <TableCell>
                  <Badge className="rounded-full !bg-green-100 text-green-800 hover:!bg-green-200">
                    Paid
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0 hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-[#BEDDF1]/5">
                <TableCell className="text-sm font-medium">#INV-003</TableCell>
                <TableCell className="text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Jan 01, 2025</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">﷼29.00</TableCell>
                <TableCell>
                  <Badge className="rounded-full !bg-green-100 text-green-800 hover:!bg-green-200">
                    Paid
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0 hover:bg-[#BEDDF1]/20 hover:text-[#63B7B7]"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg border border-[#BEDDF1]/30 bg-[#BEDDF1]/10 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-white p-2 text-[#63B7B7]">
              <Gift className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Need more than what our plans offer?
              </h4>
              <p className="mt-1 text-xs text-gray-600">
                Contact our sales team for custom enterprise solutions tailored
                to your specific needs.
              </p>
              <Button
                variant="link"
                className="mt-1 h-auto py-0 pl-0 text-xs text-[#63B7B7]"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
