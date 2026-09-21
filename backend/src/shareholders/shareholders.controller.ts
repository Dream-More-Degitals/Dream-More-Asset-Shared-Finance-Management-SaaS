// import { Request, Response } from 'express'
// import {
//   getAllShareholders,
//   getShareholderById,
//   createShareholder,
//   updateShareholder,
//   deleteShareholder,
//   getShareholderStats,
// } from './shareholders.service'

// // GET /api/shareholders
// export async function getShareholders(req: Request, res: Response) {
//   try {
//     const shareholders = await getAllShareholders()

//     res.status(200).json({
//       success: true,
//       data: shareholders,
//     })
//   } catch (error) {
//     console.error('Get shareholders error:', error)

//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve shareholders',
//     })
//   }
// }

// // GET /api/shareholders/:id
// export async function getShareholder(req: Request, res: Response) {
//   try {
//     const { id } = req.params

//     const shareholder = await getShareholderById(id)

//     if (!shareholder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Shareholder not found',
//       })
//     }

//     res.status(200).json({
//       success: true,
//       data: shareholder,
//     })
//   } catch (error) {
//     console.error('Get shareholder error:', error)

//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve shareholder',
//     })
//   }
// }

// // POST /api/shareholders
// export async function createNewShareholder(
//   req: Request,
//   res: Response
// ) {
//   try {
//     const {
//       name,
//       company,
//       shares,
//       ownership,
//       investment,
//       dividend,
//       status,
//       email,
//       phone,
//     } = req.body

//     // Basic validation
//     if (
//       !name ||
//       !company ||
//       shares === undefined ||
//       ownership === undefined ||
//       investment === undefined
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           'name, company, shares, ownership, and investment are required',
//       })
//     }

//     const shareholder = await createShareholder({
//       name,
//       company,
//       shares: Number(shares),
//       ownership: Number(ownership),
//       investment: Number(investment),
//       dividend:
//         dividend !== undefined ? Number(dividend) : undefined,
//       status,
//       email,
//       phone,
//     })

//     res.status(201).json({
//       success: true,
//       message: 'Shareholder created successfully',
//       data: shareholder,
//     })
//   } catch (error) {
//     console.error('Create shareholder error:', error)

//     res.status(500).json({
//       success: false,
//       message: 'Failed to create shareholder',
//     })
//   }
// }

// // PUT /api/shareholders/:id
// export async function updateExistingShareholder(
//   req: Request,
//   res: Response
// ) {
//   try {
//     const { id } = req.params

//     const existingShareholder = await getShareholderById(id)

//     if (!existingShareholder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Shareholder not found',
//       })
//     }

//     const {
//       name,
//       company,
//       shares,
//       ownership,
//       investment,
//       dividend,
//       status,
//       email,
//       phone,
//     } = req.body

//     const shareholder = await updateShareholder(id, {
//       name,
//       company,
//       shares:
//         shares !== undefined ? Number(shares) : undefined,
//       ownership:
//         ownership !== undefined
//           ? Number(ownership)
//           : undefined,
//       investment:
//         investment !== undefined
//           ? Number(investment)
//           : undefined,
//       dividend:
//         dividend !== undefined ? Number(dividend) : undefined,
//       status,
//       email,
//       phone,
//     })

//     res.status(200).json({
//       success: true,
//       message: 'Shareholder updated successfully',
//       data: shareholder,
//     })
//   } catch (error) {
//     console.error('Update shareholder error:', error)

//     res.status(500).json({
//       success: false,
//       message: 'Failed to update shareholder',
//     })
//   }
// }

// // DELETE /api/shareholders/:id
// export async function removeShareholder(
//   req: Request,
//   res: Response
// ) {
//   try {
//     const { id } = req.params

//     const existingShareholder = await getShareholderById(id)

//     if (!existingShareholder) {
//       return res.status(404).json({
//         success: false,
//         message: 'Shareholder not found',
//       })
//     }

//     await deleteShareholder(id)

//     res.status(200).json({
//       success: true,
//       message: 'Shareholder deleted successfully',
//     })
//   } catch (error) {
//     console.error('Delete shareholder error:', error)

//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete shareholder',
//     })
//   }
// }

// // GET /api/shareholders/stats
// export async function getStats(req: Request, res: Response) {
//   try {
//     const stats = await getShareholderStats()

//     res.status(200).json({
//       success: true,
//       data: stats,
//     })
// //   } catch (error) {
// //     console.error('Get shareholder stats error:', error)

// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to retrieve shareholder statistics',
// //     })
// //   }
// } catch (error) {
//   console.error('Get shareholders error:', error)

//   res.status(500).json({
//     success: false,
//     message: 'Failed to retrieve shareholders',
//     error: error instanceof Error ? error.message : String(error),
//   })
// }
// }


import { Request, Response } from 'express'
import {
  getAllShareholders,
  getShareholderById,
  createShareholder,
  updateShareholder,
  deleteShareholder,
  getShareholderStats,
} from './shareholders.service'

// GET /api/shareholders
export async function getShareholders(req: Request, res: Response) {
  try {
    const shareholders = await getAllShareholders()

    res.status(200).json({
      success: true,
      data: shareholders,
    })
  } catch (error) {
    console.error('Get shareholders error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve shareholders',
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

// GET /api/shareholders/:id
export async function getShareholder(req: Request, res: Response) {
  try {
    const { id } = req.params

    const shareholder = await getShareholderById(id)

    if (!shareholder) {
      return res.status(404).json({
        success: false,
        message: 'Shareholder not found',
      })
    }

    res.status(200).json({
      success: true,
      data: shareholder,
    })
  } catch (error) {
    console.error('Get shareholder error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve shareholder',
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

// POST /api/shareholders
export async function createNewShareholder(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      company,
      shares,
      ownership,
      investment,
      dividend,
      status,
      email,
      phone,
    } = req.body

    if (
      !name ||
      !company ||
      shares === undefined ||
      ownership === undefined ||
      investment === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          'name, company, shares, ownership, and investment are required',
      })
    }

    const shareholder = await createShareholder({
      name,
      company,
      shares: Number(shares),
      ownership: Number(ownership),
      investment: Number(investment),
      dividend:
        dividend !== undefined ? Number(dividend) : undefined,
      status,
      email,
      phone,
    })

    res.status(201).json({
      success: true,
      message: 'Shareholder created successfully',
      data: shareholder,
    })
  } catch (error) {
    console.error('Create shareholder error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to create shareholder',
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

// PUT /api/shareholders/:id
export async function updateExistingShareholder(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params

    const existingShareholder = await getShareholderById(id)

    if (!existingShareholder) {
      return res.status(404).json({
        success: false,
        message: 'Shareholder not found',
      })
    }

    const {
      name,
      company,
      shares,
      ownership,
      investment,
      dividend,
      status,
      email,
      phone,
    } = req.body

    const shareholder = await updateShareholder(id, {
      name,
      company,
      shares:
        shares !== undefined ? Number(shares) : undefined,
      ownership:
        ownership !== undefined
          ? Number(ownership)
          : undefined,
      investment:
        investment !== undefined
          ? Number(investment)
          : undefined,
      dividend:
        dividend !== undefined ? Number(dividend) : undefined,
      status,
      email,
      phone,
    })

    res.status(200).json({
      success: true,
      message: 'Shareholder updated successfully',
      data: shareholder,
    })
  } catch (error) {
    console.error('Update shareholder error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update shareholder',
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

// DELETE /api/shareholders/:id
export async function removeShareholder(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params

    const existingShareholder = await getShareholderById(id)

    if (!existingShareholder) {
      return res.status(404).json({
        success: false,
        message: 'Shareholder not found',
      })
    }

    await deleteShareholder(id)

    res.status(200).json({
      success: true,
      message: 'Shareholder deleted successfully',
    })
  } catch (error) {
    console.error('Delete shareholder error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete shareholder',
      error: error instanceof Error ? error.message : String(error),
    })
  }
}

// GET /api/shareholders/stats
export async function getStats(req: Request, res: Response) {
  try {
    const stats = await getShareholderStats()

    res.status(200).json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Get shareholder stats error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve shareholder statistics',
      error: error instanceof Error ? error.message : String(error),
    })
  }
}