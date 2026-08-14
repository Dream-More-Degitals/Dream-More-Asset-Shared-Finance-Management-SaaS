export default function InvestmentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investments</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Track and manage your investment portfolio.
      </p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-sm font-medium text-gray-500">Total Investments</h3>
          <p className="mt-2 text-2xl font-bold">$3,456,789</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-sm font-medium text-gray-500">Active Investments</h3>
          <p className="mt-2 text-2xl font-bold text-green-600">45</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-sm font-medium text-gray-500">ROI</h3>
          <p className="mt-2 text-2xl font-bold text-blue-600">18.4%</p>
        </div>
      </div>
    </div>
  )
}