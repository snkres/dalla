import { Button } from '@dalla/design-system'
import { GetProjectRes } from '@lib/api/company/projects'
import { Download, Eye, FileText } from 'lucide-react'

export function CompanyProjectFiles({
  media,
}: {
  media: GetProjectRes['data']['media']
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F2] shadow-sm">
            <FileText className="h-4 w-4 text-[#1D8489]" />
          </div>
          <h2 className="font-medium text-gray-900">Project Files</h2>
        </div>
      </div>

      <div className="p-6">
        {media.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-gray-500">
            No files available
          </div>
        ) : (
          // TODO: Pagination
          <div className="grid grid-cols-1 gap-4">
            {media.map((file) => (
              <div
                key={file}
                className="w-full rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
              >
                <div className="mb-3 flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E0F2F2] shadow-sm">
                    <FileText className="h-5 w-5 text-[#1D8489]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-gray-900">
                      {file}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-between border-t border-gray-200 pt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 text-xs text-[#1D8489] hover:bg-[#E0F2F2]"
                    onClick={() => window.open(file, '_blank')}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 text-xs text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = file
                      link.download = file.split('/').pop() || 'download'
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
