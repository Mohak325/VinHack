import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, regNo, year, phone, accommodation, hostelType, block, room } = req.body

    // Validate required fields
    if (!name || !regNo || !year || !phone || !accommodation) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, regNo, year, phone, accommodation' 
      })
    }

    // Validate year
    if (year < 1 || year > 6) {
      return res.status(400).json({ 
        error: 'Year must be between 1 and 6' 
      })
    }

    // Validate accommodation type
    if (!['dayscholar', 'hostel'].includes(accommodation)) {
      return res.status(400).json({ 
        error: 'Accommodation must be either "dayscholar" or "hostel"' 
      })
    }

    // If hostel, validate hostel-specific fields
    if (accommodation === 'hostel') {
      if (!hostelType || !['lh', 'mh'].includes(hostelType)) {
        return res.status(400).json({ 
          error: 'Hostel type must be either "lh" or "mh"' 
        })
      }
    }

    // Create the student record
    const student = await prisma.vITStudent.create({
      data: {
        name,
        regNo,
        year: parseInt(year),
        phone,
        accommodation,
        hostelType: accommodation === 'hostel' ? hostelType : null,
        block: accommodation === 'hostel' ? block : null,
        room: accommodation === 'hostel' ? room : null,
      },
    })

    res.status(201).json({ 
      success: true, 
      message: 'Student registered successfully',
      data: student 
    })

  } catch (error) {
    console.error('Registration error:', error)
    
    // Handle unique constraint violation (duplicate registration number)
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: 'Registration number already exists' 
      })
    }

    res.status(500).json({ 
      error: 'Internal server error. Please try again.' 
    })
  }
}

// For App Router (app/api/vit-students/route.js)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { name, regNo, year, phone, accommodation, hostelType, block, room } = await request.json()

    // Validate required fields
    if (!name || !regNo || !year || !phone || !accommodation) {
      return Response.json({ 
        error: 'Missing required fields: name, regNo, year, phone, accommodation' 
      }, { status: 400 })
    }

    // Validate year
    if (year < 1 || year > 6) {
      return Response.json({ 
        error: 'Year must be between 1 and 6' 
      }, { status: 400 })
    }

    // Validate accommodation type
    if (!['dayscholar', 'hostel'].includes(accommodation)) {
      return Response.json({ 
        error: 'Accommodation must be either "dayscholar" or "hostel"' 
      }, { status: 400 })
    }

    // If hostel, validate hostel-specific fields
    if (accommodation === 'hostel') {
      if (!hostelType || !['lh', 'mh'].includes(hostelType)) {
        return Response.json({ 
          error: 'Hostel type must be either "lh" or "mh"' 
        }, { status: 400 })
      }
    }

    // Bind to current authenticated user
    const currentUser = await prisma.user.findUnique({ where: { email: session.user.email } })
    const userId = currentUser?.id || null

    // Create the student record
    const student = await prisma.vITStudent.create({
      data: {
        name,
        regNo,
        year: parseInt(year),
        phone,
        accommodation,
        hostelType: accommodation === 'hostel' ? hostelType : null,
        block: accommodation === 'hostel' ? block : null,
        room: accommodation === 'hostel' ? room : null,
        userId: userId,
      },
    })

    return Response.json({ 
      success: true, 
      message: 'Student registered successfully',
      data: student 
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    
    // Handle unique constraint violation (duplicate registration number)
    if (error.code === 'P2002') {
      return Response.json({ 
        error: 'Registration number already exists' 
      }, { status: 400 })
    }

    return Response.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 })
  }
}