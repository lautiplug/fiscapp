//  {/* Paginación */}
//  <div className="flex justify-between items-center mt-4 px-5">
//  <div className="flex items-center justify-between gap-2 w-full">
//    <span className="text-sm text-gray-600">
//      Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
//    </span>
//    <div>
//      <button
//        onClick={() => table.previousPage()}
//        disabled={!table.getCanPreviousPage()}
//        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//      >
//        Anterior
//      </button>
//      <button
//        onClick={() => table.nextPage()}
//        disabled={!table.getCanNextPage()}
//        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
//      >
//        Siguiente
//      </button>
//    </div>
//  </div>
// </div>