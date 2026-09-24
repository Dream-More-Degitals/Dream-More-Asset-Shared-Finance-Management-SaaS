const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function testLogin() {
  const email = 'admin@dassetpro.com'
  const password = '123456'
  
  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  })
  
  if (!user) {
    console.log('❌ User not found')
    return
  }
  
  console.log('✅ User found:', user.name)
  console.log('📧 Email:', user.email)
  console.log('🔑 Role:', user.role)
  
  // Verify password
  const isValid = await bcrypt.compare(password, user.password)
  console.log('🔐 Password valid:', isValid)
}

testLogin()
  .catch(console.error)
  .finally(() => prisma.$disconnect())